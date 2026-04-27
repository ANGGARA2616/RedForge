"use server";

import { db } from "@/db";
import { chatbot, knowledgeChunk, scrapedPage, conversation, message } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq, inArray } from "drizzle-orm";
// BetterAuth uses standard string IDs, we can use crypto.randomUUID() natively.

export async function createChatbot(formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    const name = formData.get("name") as string;
    const websiteUrl = formData.get("websiteUrl") as string;
    const brandColor = formData.get("brandColor") as string || "#7C3AED";
    const aiPersona = formData.get("aiPersona") as string || "friendly";
    const aiLanguageStyle = formData.get("aiLanguageStyle") as string || "professional";
    
    if (!name || !websiteUrl) {
      return { error: "Nama dan URL website wajib diisi" };
    }

    const newChatbot = await db.insert(chatbot).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      name,
      websiteUrl,
      brandColor,
      aiPersona,
      aiLanguageStyle,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    revalidatePath("/dashboard");
    return { success: true, chatbot: newChatbot[0] };
  } catch (error) {
    console.error("Error creating chatbot:", error);
    return { error: "Terjadi kesalahan saat menyimpan chatbot" };
  }
}

export async function getUserChatbots() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { error: "Unauthorized", chatbots: [] };
    }

    const userChatbots = await db
      .select()
      .from(chatbot)
      .where(eq(chatbot.userId, session.user.id));

    return { success: true, chatbots: userChatbots };
  } catch (error) {
    console.error("Error fetching chatbots:", error);
    return { error: "Terjadi kesalahan saat mengambil data", chatbots: [] };
  }
}

export async function getChatbotById(id: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    const result = await db
      .select()
      .from(chatbot)
      .where(eq(chatbot.id, id));

    if (result.length === 0 || result[0].userId !== session.user.id) {
      return { error: "Chatbot tidak ditemukan" };
    }

    return { success: true, chatbot: result[0] };
  } catch (error) {
    console.error("Error fetching chatbot:", error);
    return { error: "Terjadi kesalahan saat mengambil data chatbot" };
  }
}

export async function updateChatbot(id: string, formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    const name = formData.get("name") as string;
    const websiteUrl = formData.get("websiteUrl") as string;
    const brandColor = formData.get("brandColor") as string;
    const aiPersona = formData.get("aiPersona") as string;
    const aiLanguageStyle = formData.get("aiLanguageStyle") as string;
    
    if (!name || !websiteUrl) {
      return { error: "Nama dan URL website wajib diisi" };
    }

    // Pastikan user adalah pemilik chatbot
    const existing = await db.select().from(chatbot).where(eq(chatbot.id, id));
    if (existing.length === 0 || existing[0].userId !== session.user.id) {
      return { error: "Unauthorized" };
    }

    const updatedChatbot = await db.update(chatbot)
      .set({
        name,
        websiteUrl,
        brandColor,
        aiPersona,
        aiLanguageStyle,
        updatedAt: new Date(),
      })
      .where(eq(chatbot.id, id))
      .returning();

    revalidatePath("/dashboard");
    return { success: true, chatbot: updatedChatbot[0] };
  } catch (error) {
    console.error("Error updating chatbot:", error);
    return { error: "Terjadi kesalahan saat menyimpan perubahan chatbot" };
  }
}

export async function deleteChatbot(id: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    // Pastikan user adalah pemilik chatbot
    const existing = await db.select().from(chatbot).where(eq(chatbot.id, id));
    if (existing.length === 0 || existing[0].userId !== session.user.id) {
      return { error: "Chatbot tidak ditemukan" };
    }

    // Hapus data terkait secara berurutan (cascade manual)
    // 1. Hapus knowledge chunks
    await db.delete(knowledgeChunk).where(eq(knowledgeChunk.chatbotId, id));
    
    // 2. Hapus scraped pages
    await db.delete(scrapedPage).where(eq(scrapedPage.chatbotId, id));

    // 3. Hapus messages dari semua conversation chatbot ini
    const botConversations = await db.select({ id: conversation.id }).from(conversation).where(eq(conversation.chatbotId, id));
    if (botConversations.length > 0) {
      const convIds = botConversations.map(c => c.id);
      await db.delete(message).where(inArray(message.conversationId, convIds));
    }

    // 4. Hapus conversations
    await db.delete(conversation).where(eq(conversation.chatbotId, id));

    // 5. Hapus chatbot
    await db.delete(chatbot).where(eq(chatbot.id, id));

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting chatbot:", error);
    return { error: "Terjadi kesalahan saat menghapus chatbot" };
  }
}
