import { openai } from "@ai-sdk/openai";
import { streamText, embed } from "ai";
import { db } from "@/db";
import { chatbot, knowledgeChunk } from "@/db/schema";
import { eq, sql, cosineDistance, desc } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages, chatbotId } = await req.json();

    if (!chatbotId) {
      return new Response("Missing chatbotId", { status: 400 });
    }

    // Ambil pesan terakhir dari pengunjung
    const latestMessage = messages[messages.length - 1].content;

    // 1. Dapatkan data Chatbot dari database (untuk Persona & Nama)
    const botQuery = await db.select().from(chatbot).where(eq(chatbot.id, chatbotId)).limit(1);
    
    if (botQuery.length === 0) {
      return new Response("Chatbot not found", { status: 404 });
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

    // 4. Susun System Prompt persis seperti permintaan
    const systemPrompt = `Kamu adalah asisten customer service bernama ${botData.name}.
Gunakan gaya bahasa: ${botData.aiLanguageStyle} dan ${botData.aiPersona}.

Jawab pertanyaan pelanggan HANYA berdasarkan informasi berikut ini:
${contextData || "(Belum ada data knowledge base)"}

Jika jawaban tidak ada di dalam informasi di atas, katakan 'Maaf, saya tidak memiliki informasi tersebut, silakan hubungi admin manusia'.`;

    // 5. Kirim permintaan ke GPT-5.4-mini via Vercel AI SDK
    const result = await streamText({
      model: openai("gpt-5.4-mini"), // Sesuai instruksi untuk menggunakan model ini
      temperature: 0.2, // AI yang faktual dan tidak berhalusinasi
      maxTokens: 300, // Batasan output agar ringkas dan hemat biaya
      system: systemPrompt,
      messages,
    });

    // 6. Kembalikan Stream secara real-time ke widget klien
    return result.toDataStreamResponse();

  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
