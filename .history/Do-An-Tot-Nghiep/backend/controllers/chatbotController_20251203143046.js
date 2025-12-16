import Movie from "../models/Movie.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const chatbotReply = async (req, res) => {
    try {
        const { message } = req.body;

        // 1. PHÂN LOẠI Ý ĐỊNH
        const intentPrompt = `
Người dùng hỏi: "${message}"

Hãy phân loại câu hỏi thành 1 trong 3 loại sau:
- "SEARCH": tìm phim theo tiêu đề, diễn viên, năm, thể loại, phim tương tự.
- "RECOMMEND": gợi ý phim hay.
- "CHAT": trò chuyện bình thường.

Chỉ trả về 1 từ: SEARCH hoặc RECOMMEND hoặc CHAT.
    `;

        const intentRes = await model.generateContent(intentPrompt);
        const intent = intentRes.response.text().trim();
        let movies = [];

        // 2. NẾU LÀ SEARCH → Trích xuất dữ liệu bằng Gemini
        if (intent === "SEARCH") {
            const extractPrompt = `
Trích thông tin từ câu hỏi: "${message}"

Trả về JSON:
{
  "title": "",
  "genre": "",
  "actor": "",
  "year": ""
}
      `;

            const extractRes = await model.generateContent(extractPrompt);

            let filters = {};
            try {
                filters = JSON.parse(extractRes.response.text());
            } catch {
                filters = {};
            }

            let query = {};
            if (filters.title) query.title = new RegExp(filters.title, "i");
            if (filters.genre) query.genre = new RegExp(filters.genre, "i");
            if (filters.actor) query.actors = new RegExp(filters.actor, "i");
            if (filters.year) query.year = Number(filters.year);

            movies = await Movie.find(query).limit(10);
        }

        // 3. TẠO PHẢN HỒI CỦA CHATBOT
        const aiPrompt = `
Bạn là chatbot hỗ trợ tìm phim.

Dưới đây là danh sách phim tìm được:
${movies.map(m => `- ${m.title} (${m.year}) – ${m.genre}`).join("\n")}

Trả lời người dùng bằng phong cách thân thiện.

Tin nhắn người dùng: "${message}"
    `;

        const aiRes = await model.generateContent(aiPrompt);
        const answer = aiRes.response.text();

        res.json({
            text: answer,
            movies
        });

    } catch (err) {
        console.error("Gemini Chatbot Error:", err);
        res.status(500).json({ message: "Chatbot gặp lỗi, thử lại nhé!" });
    }
};
