import { NextResponse } from "next/server";

// Gemini API configuration
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Function to call Gemini API directly
async function callGeminiAPI(prompt) {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        })
    });

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

export async function POST(req) {
    try {
        const { note } = await req.json();

        if (!note || !note.trim()) {
            return NextResponse.json({ error: "Note content is required." }, { status: 400 });
        }

        // Create prompt for title generation
        const prompt = `You are an expert content strategist. Generate a compelling, concise, and descriptive title (2-7 words) for the following note. The title should:
        - Capture the main theme or key insight
        - Be engaging and professional
        - Avoid generic words like "Note" or "Content"
        - Be specific and memorable
        - Return ONLY the title, nothing else

        Note:
        ${note}

        Title:`;

        try {
            const generatedTitle = await callGeminiAPI(prompt);
            return NextResponse.json({ generatedTitle: generatedTitle.trim() });
        } catch (apiError) {
            console.error("Gemini API Error:", apiError);
            return NextResponse.json({
                error: "Failed to generate title. Please check your API key and try again."
            }, { status: 500 });
        }

    } catch (error) {
        console.error("Error generating title:", error);

        // Handle specific API errors
        if (error.message.includes('API key')) {
            return NextResponse.json({ error: "API key configuration error. Please check your Gemini API key." }, { status: 500 });
        }

        return NextResponse.json({ error: "Failed to generate title. Please try again." }, { status: 500 });
    }
}
