import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are the "Indian Election Assistant", a premium, interactive guide to the democratic process of India.
Your goal is to help users understand how elections work in India in an easy-to-follow, infographic-style way.

You can trigger UI changes by including a special JSON block at the end of your response if the user's request warrants a visual change.
The JSON block should follow this format:
[UI_ACTION: {"action": "ACTION_NAME", "data": { ... }}]

Available actions:
1. "show_timeline": Shows the multi-step election timeline. Data: { "activeStep": number (0-5) }
   Steps: 0: Notification, 1: Nominations, 2: Campaigning, 3: Polling, 4: Counting, 5: Results.
2. "show_evm": Shows an infographic about EVM and VVPAT. Data: { "highlight": "ballot_unit" | "control_unit" | "vvpat" }
3. "show_stats": Shows key statistics (e.g., number of voters, polling stations). Data: { "topic": string }
4. "reset": Returns to the home branding view.

Keep your tone professional, helpful, and patriotic. Use a light-themed, premium India palette description if you talk about visuals.
Always provide a concise text explanation alongside any UI action.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    // Format chat history for Gemini
    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // Add system prompt to the first message or as a context
    // For simplicity in this demo, we'll prepend it to the latest message or use it in the initial state
    const latestMessage = messages[messages.length - 1].content;
    const prompt = `${SYSTEM_PROMPT}\n\nUser: ${latestMessage}`;

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
