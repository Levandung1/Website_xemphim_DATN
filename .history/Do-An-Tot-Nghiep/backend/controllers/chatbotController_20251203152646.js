import Movie from "../models/Movie.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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
Trả về duy nhất một từ:
SEARCH, RECOMMEND hoặc CHAT.
        `;

        const intentRaw = await model.generateContent(intentPrompt);
        let intent = intentRaw.response.text().trim().toUpperCase();
        intent = intent.replace(/\W/g, "");

        let movies = [];

        // 2. Mode tìm kiếm
        if (intent === "SEARCH") {
            const extractPrompt = `
Trích xuất thông tin từ câu hỏi: "${message}"
Trả về đúng JSON:
{
  "title": "",
  "genre": "",
  "actor": "",
  "year": ""
}
            `;

            const extractRaw = await model.generateContent(extractPrompt);
            const filters = cleanJSON(extractRaw.response.text());

            let query = {};

            if (filters.title) query.title = new RegExp(filters.title, "i");
            if (filters.genre) query.genre = new RegExp(filters.genre, "i");
            if (filters.actor) query.actors = new RegExp(filters.actor, "i");
            if (filters.year) query.year = Number(filters.year);

            movies = await Movie.find(query).limit(10);
        }

        // 3. Phản hồi chatbot
        const finalPrompt = `
Bạn là chatbot hỗ trợ tìm phim trong website.
Kết quả tìm kiếm:

${
    movies.length
        ? movies.map(m => `• ${m.title} (${m.year}) – ${m.genre}`).join("\n")
        : "Không tìm thấy phim phù hợp."
}

Hãy trả lời người dùng một cách thân thiện và tự nhiên. 
Câu hỏi: "${message}"
        `;

        const ai = await model.generateContent(finalPrompt);

        res.json({
            text: ai.response.text(),
            movies
        });

    } catch (err) {
        console.error("Gemini Chatbot Error:", err);
        res.status(500).json({ message: "Chatbot gặp lỗi, thử lại nhé!" });
    }
};
