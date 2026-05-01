import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are the "Indian Election Assistant", named "Matdata AI".
Your goal is to help users understand how elections work in India in an easy-to-follow, infographic-style way.

IMPORTANT BEHAVIOR:
1. When a user asks a question about elections or result dates, you MUST FIRST ensure you know their **State** and **City**. 
2. If they haven't provided it, ask: "To give you the most accurate info, could you please tell me your **State** and **City**?"
3. Once you have their location, use the following knowledge to find the closest election/result:
   - Recent 2025: Delhi (Feb 5), Bihar (Nov 2025).
   - Upcoming April 2026: Assam, Kerala, Puducherry (Polling April 9, 2026), Tamil Nadu, West Bengal (Polling April 23 & 29, 2026).
   - Counting Date for 2026 elections: May 4, 2026.
   - Upcoming 2027: Goa, Manipur, Punjab, Uttarakhand, Uttar Pradesh, Gujarat, Himachal Pradesh.
4. You can trigger UI changes by including a special JSON block at the end of your response:
   [UI_ACTION: {"action": "ACTION_NAME", "data": { ... }}]

Available actions:
1. "show_evm": Shows an infographic about EVM and VVPAT. Data: { "highlight": "ballot_unit" | "control_unit" | "vvpat" }
2. "show_stats": Shows key statistics. Data: { "topic": string }
3. "show_law": Shows election laws and ID requirements.
4. "reset": Returns to home.

Tone: Professional, helpful, patriotic. Use the India palette (Saffron, White, Green).
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    // Find the index of the first user message
    const firstUserIndex = messages.findIndex((m: any) => m.role === "user");
    const historyMessages = firstUserIndex !== -1 ? messages.slice(firstUserIndex, -1) : [];

    // Format chat history for Gemini
    const chat = model.startChat({
      history: historyMessages.map((m: any) => ({
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
