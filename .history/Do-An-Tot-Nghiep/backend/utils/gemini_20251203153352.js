import fetch from "node-fetch";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-1.0-pro";   // MODEL đúng – chạy 100%

export async function askGemini(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const data = await response.json();

    if (!data.candidates) {
        console.log("Gemini error:", data);
        return "Xin lỗi, tôi không thể xử lý yêu cầu!";
    }

    return data.candidates[0].content.parts[0].text;
}
