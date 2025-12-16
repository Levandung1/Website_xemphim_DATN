import fetch from "node-fetch";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-1.5-flash";

export async function askGemini(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const body = {
        contents: [
            {
                role: "user",
                parts: [{ text: prompt }]
            }
        ]
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    // Debug (quan trọng để xem API trả gì)
    if (!data.candidates) {
        console.error("FULL API RESPONSE:", JSON.stringify(data, null, 2));
        return "Xin lỗi, tôi không thể xử lý yêu cầu!";
    }

    return data.candidates[0].content.parts[0].text;
}
