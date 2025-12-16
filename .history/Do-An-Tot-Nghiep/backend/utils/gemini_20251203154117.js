import fetch from "node-fetch";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ⚠️ Model mới
const MODEL = "gemini-1.5-flash";

export async function askGemini(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [{ text: prompt }]
                }
            ]
        })
    });

    const data = await response.json();

    if (!data.candidates) {
        console.error("Gemini error:", data);
        return "Xin lỗi, tôi không thể xử lý yêu cầu!";
    }

    return data.candidates[0].content.parts[0].text;
}
