import { askGemini } from "../utils/gemini.js";
import Movie from "../models/Movie.js";

export const chatbotReply = async (req, res) => {
    try {
        const { message } = req.body;

        const intentPrompt = `
Người dùng hỏi: "${message}"
Trả về duy nhất một từ: SEARCH, RECOMMEND hoặc CHAT.
        `;

        let intent = (await askGemini(intentPrompt)).trim().toUpperCase();
        intent = intent.replace(/\W/g, "");

        let movies = [];

        if (intent === "SEARCH") {
            const extractPrompt = `
Phân tích câu hỏi: "${message}"
Trả về JSON:
{
  "title": "",
  "genre": "",
  "actor": "",
  "year": ""
}
            `;

            const extracted = await askGemini(extractPrompt);

            let filters = {};
            try {
                filters = JSON.parse(extracted.replace(/```json/g, "").replace(/```/g, ""));
            } catch { }

            let query = {};

            if (filters.title) query.title = new RegExp(filters.title, "i");
            if (filters.genre) query.genre = new RegExp(filters.genre, "i");
            if (filters.actor) query.actors = new RegExp(filters.actor, "i");
            if (filters.year) query.year = Number(filters.year);

            movies = await Movie.find(query).limit(10);
        }

        const replyPrompt = `
Bạn là chatbot hỗ trợ tìm phim.
Kết quả:
${movies.length
                ? movies.map(m => `• ${m.title} (${m.year}) – ${m.genre}`).join("\n")
                : "Không tìm thấy phim nào."
            }

Hãy trả lời tự nhiên và thân thiện.
Câu hỏi: "${message}"
        `;

        const answer = await askGemini(replyPrompt);

        res.json({ text: answer, movies });

    } catch (e) {
        console.error("Gemini error:", e);
        res.json({ text: "Chatbot gặp lỗi, thử lại nhé!", movies: [] });
    }
};
