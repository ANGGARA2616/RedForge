import { openai } from "@ai-sdk/openai";
import { streamText, embed } from "ai";
import { db } from "@/db";
import { chatbot, knowledgeChunk } from "@/db/schema";
import { eq, sql, cosineDistance, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Konfigurasi Header CORS agar Widget bisa diakses dari domain manapun (seperti smartkos.com)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Menangani permintaan Preflight dari Browser (CORS)
export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { messages, chatbotId } = await req.json();

    if (!chatbotId) {
      return new Response("Missing chatbotId", { status: 400, headers: corsHeaders });
    }

    // Ambil pesan terakhir dari pengunjung
    const latestMessage = messages[messages.length - 1].content;

    // 1. Dapatkan data Chatbot dari database (untuk Persona & Nama)
    const botQuery = await db.select().from(chatbot).where(eq(chatbot.id, chatbotId)).limit(1);
    
    if (botQuery.length === 0) {
      return new Response("Chatbot not found", { status: 404, headers: corsHeaders });
    }
    const botData = botQuery[0];

    // 2. Ubah pertanyaan pengunjung menjadi Embedding menggunakan OpenAI
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: latestMessage,
    });

    // 3. Similarity Search di Vector DB (mencari konteks relevan)
    // Mencari 3 chunk informasi paling relevan yang memiliki jarak kosinus terdekat dengan embedding pertanyaan
    const similarChunks = await db
      .select({
        content: knowledgeChunk.content,
        similarity: sql<number>`1 - (${cosineDistance(knowledgeChunk.embedding, embedding)})`
      })
      .from(knowledgeChunk)
      .where(eq(knowledgeChunk.chatbotId, chatbotId))
      .orderBy(t => desc(t.similarity))
      .limit(3);

    // Gabungkan konteks dari database
    const contextData = similarChunks.map(chunk => chunk.content).join("\n\n");

    // 4. Ambil data real-time dari Custom API customer (jika tersedia)
    let liveData = "";
    if (botData.customApiUrl) {
      try {
        const apiUrl = new URL(botData.customApiUrl);
        apiUrl.searchParams.set("query", latestMessage);

        const apiHeaders: Record<string, string> = {
          "Accept": "application/json",
        };
        if (botData.customApiKey) {
          apiHeaders["x-api-key"] = botData.customApiKey;
        }

        const apiRes = await fetch(apiUrl.toString(), {
          method: "GET",
          headers: apiHeaders,
          signal: AbortSignal.timeout(5000), // Timeout 5 detik agar tidak menghambat
        });

        if (apiRes.ok) {
          const apiJson = await apiRes.json();
          // Mendukung berbagai format response: { results: "..." } atau { data: [...] } atau string langsung
          if (typeof apiJson.results === "string") {
            liveData = apiJson.results;
          } else if (typeof apiJson.data === "string") {
            liveData = apiJson.data;
          } else if (Array.isArray(apiJson.results)) {
            liveData = apiJson.results.map((item: any) => JSON.stringify(item)).join("\n");
          } else if (Array.isArray(apiJson.data)) {
            liveData = apiJson.data.map((item: any) => JSON.stringify(item)).join("\n");
          } else {
            liveData = JSON.stringify(apiJson);
          }
        }
      } catch (apiError) {
        console.warn("Custom API fetch failed (non-blocking):", apiError);
        // Tidak menghentikan proses — chatbot tetap menjawab dari knowledge base
      }
    }

    // 5. Susun System Prompt
    const systemPrompt = `Kamu adalah asisten customer service bernama ${botData.name}.
Gunakan gaya bahasa: ${botData.aiLanguageStyle} dan ${botData.aiPersona}.

PENTING: Jangan pernah menggunakan format Markdown (seperti **tebal**, *miring*, - bullet list, dsb). Balas dengan teks biasa (plain text) saja yang rapi dengan pemisah paragraf/baris baru jika diperlukan. Jangan pernah menampilkan simbol * (asterisk).

Jawab pertanyaan pelanggan berdasarkan informasi berikut ini:

--- KNOWLEDGE BASE ---
${contextData || "(Belum ada data knowledge base)"}

${liveData ? `--- DATA REAL-TIME DARI WEBSITE ---\n${liveData}` : ""}

Jika ada data real-time, prioritaskan data tersebut untuk informasi seperti stok, harga terkini, dan ketersediaan.
Jika jawaban tidak ada di dalam informasi di atas, katakan 'Maaf, saya tidak memiliki informasi tersebut, silakan hubungi admin manusia'.`;

    // 5. Kirim permintaan ke GPT-5.4-mini via Vercel AI SDK
    const result = await streamText({
      model: openai("gpt-5.4-mini"), // Sesuai instruksi untuk menggunakan model ini
      temperature: 0.2, // AI yang faktual dan tidak berhalusinasi
      system: systemPrompt,
      messages,
    });

    // 6. Kembalikan Stream secara real-time ke widget klien + Headers CORS
    const streamResponse = result.toTextStreamResponse();
    Object.entries(corsHeaders).forEach(([key, value]) => {
      streamResponse.headers.set(key, value);
    });
    return streamResponse;

  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500, headers: corsHeaders });
  }
}
