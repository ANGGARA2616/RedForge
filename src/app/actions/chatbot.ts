"use server";

import { db } from "@/db";
import { chatbot } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
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
