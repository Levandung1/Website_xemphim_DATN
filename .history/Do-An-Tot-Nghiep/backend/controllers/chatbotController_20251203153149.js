import Movie from "../models/Movie.js";
import { askGemini } from "../utils/gemini.js";

// AUTO FIX JSON
function cleanJSON(text) {
    try {
        return JSON.parse(
            text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim()
        );
    } catch {
        return {};
    }
}

export const chatbotReply = async (req, res) => {
    try {
        const { message } = req.body;

        // 1. Ý định người dùng
        const intentPrompt = `
Người dùng hỏi: "${message}"
Hãy trả về duy nhất 1 từ:
SEARCH, RECOMMEND hoặc CHAT.
        `;

        let intent = (await askGemini(intentPrompt)).trim().toUpperCase();
        intent = intent.replace(/\W/g, "");

        let movies = [];

        // 2. Phân tích SEARCH
        if (intent === "SEARCH") {
            const extractPrompt = `
Trích xuất thông tin câu hỏi: "${message}"
Trả về JSON:
{
  "title": "",
  "genre": "",
  "actor": "",
  "year": ""
}
Chỉ trả đúng JSON.
            `;

            const extractText = await askGemini(extractPrompt);
            const filters = cleanJSON(extractText);

            let query = {};
            if (filters.title) query.title = new RegExp(filters.title, "i");
            if (filters.genre) query.genre = new RegExp(filters.genre, "i");
            if (filters.actor) query.actors = new RegExp(filters.actor, "i");
            if (filters.year) query.year = Number(filters.year);

            movies = await Movie.find(query).limit(10);
        }

        // 3. Trả lời
        const finalPrompt = `
Bạn là chatbot hỗ trợ tìm phim.
Kết quả:
${movies.length
                ? movies.map(m => `• ${m.title} (${m.year}) – ${m.genre}`).join("\n")
                : "Không có phim phù hợp."
            }
Hãy trả lời thân thiện theo câu hỏi: "${message}"
        `;

        const answer = await askGemini(finalPrompt);

        res.json({
            text: answer,
            movies
        });

    } catch (err) {
        console.error("Gemini Chatbot Error:", err);
        res.status(500).json({ message: "Chatbot gặp lỗi!" });
    }
};
