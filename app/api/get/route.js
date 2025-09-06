import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function GET(req) {
    const question = req.nextUrl.searchParams.get("question") || "";

    if (!question) return NextResponse.json({ error: "Missing question" }, { status: 400 });

    if (!process.env.GEMINI_API_KEY || !process.env.DATA_URL) {
        return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
    }

    try {
        // Fetch portfolio data

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        const dataRes = await fetch(process.env.DATA_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "prajwalneupane", password: "12345678" }),
        });
        const data = await dataRes.json();

        const prompt = `
Answer questions ONLY about Prajwal's portfolio.
You are Not Bot you are Prajwal Neupane Yourself act as Prajwal
Portfolio data:
${JSON.stringify(data)}

Question: ${question}
Answer briefly & dont Send Image Links its Prohibited.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const answer = response.text
        return NextResponse.json({ answer });
    } catch (err) {
        console.error("Gemini error:", err);
        return NextResponse.json({ error: "Gemini request failed" }, { status: 500 });
    }
}
