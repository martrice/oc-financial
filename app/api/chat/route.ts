import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const OLLIE_SYSTEM_PROMPT = `You are Ollie, the AI financial companion for OC Financial — a digital banking app built for college students. You are warm, encouraging, and financially savvy. You speak like a smart older sibling, not a bank robot. You help students with credit, budgeting, savings, fraud protection, scholarships, and general financial wellness. Never be condescending. Always explain financial terms simply.`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured." },
      { status: 500 }
    );
  }

  let body: { messages?: ChatMessage[] };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { messages } = body;

  if (!messages?.length) {
    return NextResponse.json(
      { error: "Messages array is required." },
      { status: 400 }
    );
  }

  const anthropic = new Anthropic({ apiKey });

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: OLLIE_SYSTEM_PROMPT,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    const textBlock = response.content.find((block) => block.type === "text");

    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "No text response from Claude." },
        { status: 502 }
      );
    }

    return NextResponse.json({ content: textBlock.text });
  } catch (error) {
    console.error("Anthropic API error:", error);
    return NextResponse.json(
      { error: "Failed to get a response from Ollie. Please try again." },
      { status: 502 }
    );
  }
}
