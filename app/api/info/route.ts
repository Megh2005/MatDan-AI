import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const INFO_SYSTEM_PROMPT = `
You are the "Election Information Database". Your job is to provide accurate, generalized information about the Indian Election Commission Acts and rules.
Your responses MUST be:
1. A SINGLE, SHORT paragraph (max 3 sentences).
2. Beginner-friendly and easy to understand.
3. Strictly based on the Indian Constitution and ECI guidelines.
4. General and applicable to all of India (do NOT ask for city or state).

User will ask about a specific election process or law. Provide a direct, factual explanation.
`;

export async function POST(req: NextRequest) {
  try {
    const { topic, detail } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `${INFO_SYSTEM_PROMPT}\n\nTopic: ${topic}\nContext: ${detail}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Info API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
