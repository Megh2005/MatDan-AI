import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are "Matdata AI", an Indian Election Assistant.

CONVERSATION RULES:
1. GREETING: Only introduce yourself in the VERY FIRST response. For subsequent messages, provide direct answers.
2. AUTOMATIC LOCATION: You will receive location context in the format [Location: Lat X, Lng Y]. 
   - Use these coordinates to determine the user's State and City automatically.
   - Do NOT ask the user for their location if coordinates are provided.
3. CONSOLIDATED KNOWLEDGE: You are a multi-tier election hub. Consider: Lok Sabha, Vidhan Sabha, Municipality, and Panchayat.
4. REAL-TIME DATA: You will be provided with live search results from SerpApi. Use these to give EXACT dates and names of upcoming elections or recent results.
5. UI ACTIONS: Use [UI_ACTION: {"action": "ACTION_NAME", "data": { ... }}] only when relevant.

Tone: Direct, helpful, beginner-friendly. Follow the Indian Constitution and ECI rules strictly.
`;

async function getSerpData(query: string) {
  if (!process.env.SERP_API_KEY) return null;
  try {
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=google&google_domain=google.co.in&gl=in&hl=en&api_key=${process.env.SERP_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    
    // Extract snippets for context
    const snippets = data.organic_results?.slice(0, 3).map((r: any) => r.snippet).join("\n") || "";
    const answerBox = data.answer_box?.answer || data.answer_box?.snippet || "";
    return `Search Context: ${answerBox}\n${snippets}`;
  } catch (err) {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const latestMsg = messages[messages.length - 1].content;
    
    // Detect if we have location to do a better search
    const locMatch = latestMsg.match(/\[Location: Lat (.*?), Lng (.*?)\]/);
    let searchContext = "";
    
    if (locMatch) {
      const query = `upcoming elections in India ${locMatch[1]} ${locMatch[2]} Lok Sabha Vidhan Sabha Municipality 2026 2027`;
      searchContext = await getSerpData(query) || "";
    } else {
      searchContext = await getSerpData("upcoming elections in India 2026 2027") || "";
    }

    const firstUserIndex = messages.findIndex((m: any) => m.role === "user");
    const historyMessages = firstUserIndex !== -1 ? messages.slice(firstUserIndex, -1) : [];

    const chat = model.startChat({
      history: historyMessages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
      generationConfig: { maxOutputTokens: 1000 },
    });

    const prompt = `${SYSTEM_PROMPT}\n\n${searchContext ? `REAL-TIME SEARCH DATA:\n${searchContext}\n\n` : ''}User: ${latestMsg}`;

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
