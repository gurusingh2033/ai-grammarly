import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
    try {
        const { text } = await req.json();
        if (!text?.trim()) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        // OpenAI API Call for Grammar Correction
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                {
                    role: "user",
                    content: `
                    Please check the text for incorrect , grammatical and misspelled words in given text.
        
                    Important notes:
                    1. If the text is gibberish (e.g., "qwidjoiqjoiejo21332##"), return " ".
                    2. Highlight only incorrect and misspelled words using <strong> tags but do not correct them.
                    3. Do not add any extra text.
                    4. Do not include labels such as "Original text:" or "Corrected text:" in the output.

                    Original text: "${text}"`,

                },
            ],
            max_tokens: 80,
            temperature: 0.3,
        });

        const correctedText = response?.choices?.[0]?.message?.content?.trim() || "";

        if (!correctedText) {
            return NextResponse.json({ error: "Failed to generate correction" }, { status: 500 });
        }



        return NextResponse.json({
            correctedText,
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}