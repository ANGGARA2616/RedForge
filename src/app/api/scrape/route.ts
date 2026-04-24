import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { openai } from "@ai-sdk/openai";
import { embedMany } from "ai";
import { db } from "@/db";
import { knowledgeChunk, scrapedPage } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid"; // We will use crypto.randomUUID() natively

// Fungsi sederhana untuk memecah teks panjang menjadi potongan-potongan kecil (chunking)
function chunkText(text: string, chunkSize: number = 1000): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let currentChunk = "";

  for (const word of words) {
    if (currentChunk.length + word.length > chunkSize) {
      chunks.push(currentChunk.trim());
      currentChunk = "";
    }
    currentChunk += word + " ";
  }
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }
  return chunks;
}

export async function POST(req: NextRequest) {
  try {
    const { url, chatbotId } = await req.json();

    if (!url || !chatbotId) {
      return NextResponse.json({ error: "URL dan Chatbot ID wajib diisi" }, { status: 400 });
    }

    // 1. Fetch HTML dari URL Klien (SmartKos)
    const response = await fetch(url, { headers: { "User-Agent": "RedForge-Bot/1.0" } });
    if (!response.ok) throw new Error("Gagal mengakses URL");
    const html = await response.text();

    // 2. Ekstrak Teks menggunakan Cheerio (Buang script, style, nav)
    const $ = cheerio.load(html);
    $("script, style, noscript, nav, footer, header").remove();
    const title = $("title").text().trim() || url;
    const cleanText = $("body").text().replace(/\s+/g, " ").trim();

    if (!cleanText) {
      return NextResponse.json({ error: "Tidak ada teks yang bisa diekstrak dari halaman ini" }, { status: 400 });
    }

    // 3. Pecah teks menjadi potongan kecil (Chunking)
    const chunks = chunkText(cleanText);

    // 4. Ubah Teks menjadi Vector Embeddings menggunakan OpenAI
    const { embeddings } = await embedMany({
      model: openai.embedding("text-embedding-3-small"),
      values: chunks,
    });

    // 5. Simpan ke Supabase (Vector DB & Histori Scraping)
    // Hapus data lama untuk URL ini agar tidak duplikat
    await db.delete(knowledgeChunk).where(eq(knowledgeChunk.chatbotId, chatbotId));

    // Masukkan embeddings ke knowledge_chunk
    const recordsToInsert = chunks.map((chunk, i) => ({
      id: crypto.randomUUID(),
      chatbotId,
      content: chunk,
      embedding: embeddings[i],
      url,
    }));
    
    await db.insert(knowledgeChunk).values(recordsToInsert);

    // Simpan log scraping
    await db.insert(scrapedPage).values({
      id: crypto.randomUUID(),
      chatbotId,
      url,
      title,
      status: "success",
      scrapedAt: new Date(),
    });

    return NextResponse.json({ 
      success: true, 
      message: `Berhasil melatih AI dengan ${chunks.length} potongan informasi dari ${title}` 
    });

  } catch (error: any) {
    console.error("Scraping error:", error);
    return NextResponse.json({ error: error.message || "Terjadi kesalahan saat melakukan scraping" }, { status: 500 });
  }
}
