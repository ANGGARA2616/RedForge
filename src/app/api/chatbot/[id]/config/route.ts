import { db } from "@/db";
import { chatbot } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await db
      .select({
        name: chatbot.name,
        brandColor: chatbot.brandColor,
      })
      .from(chatbot)
      .where(eq(chatbot.id, id))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Chatbot not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(result[0], { headers: corsHeaders });
  } catch (error) {
    console.error("Config API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
