import Movie from "../models/Movie.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Auto fix JSON Gemini trả về
function cleanJSON(text) {
    try {
        return JSON.parse(
            text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .replace(/Here is the JSON:/gi, "")
                .trim()
        );
    } catch {
        return {};
    }
}

export const chatbotReply = async (req, res) => {
    try {
        const { message } = req.body;

        // -----------------------------
        // 1. HIỂU Ý ĐỊNH NGƯỜI DÙNG
        // -----------------------------
        const intentPrompt = `
Người dùng hỏi: "${message}"

Phân loại câu hỏi thành 1 từ duy nhất:
- SEARCH
- RECOMMEND
- CHAT

Trả về duy nhất 1 từ.
    `;

        const intentRes = await model.generateContent(intentPrompt);
        let intent = intentRes.response.text().trim();

        intent = intent.replace(/\W/g, "").toUpperCase(); // fix Gemini quẩy

        let movies = [];

        // -----------------------------
        // 2. SEARCH MODE
        // -----------------------------
        if (intent === "SEARCH") {
            const extractPrompt = `
Trích thông tin từ câu hỏi người dùng: "${message}"

Trả về JSON đúng mẫu:
{
  "title": "",
  "genre": "",
  "actor": "",
  "year": ""
}
Chỉ trả JSON.
      `;

            const extractRes = await model.generateContent(extractPrompt);

            const filters = cleanJSON(extractRes.response.text());

            let query = {};

            if (filters.title) query.title = new RegExp(filters.title, "i");
            if (filters.genre) query.genre = new RegExp(filters.genre, "i");
            if (filters.actor) query.actors = new RegExp(filters.actor, "i"); // kiểm tra schema!
            if (filters.year) query.year = Number(filters.year);

            movies = await Movie.find(query).limit(10);
        }

        // -----------------------------
        // 3. TỐI ƯU CÂU TRẢ LỜI AI
        // -----------------------------
        const aiPrompt = `
Bạn là chatbot hỗ trợ tìm phim trong website.

Danh sách phim tìm được:
${movies.length > 0 ? movies.map(m => `- ${m.title} (${m.year}) – ${m.genre}`).join("\n") : "Không có phim phù hợp trong cơ sở dữ liệu."}

Trả lời người dùng bằng phong cách thân thiện, dễ hiểu.

Câu hỏi: "${message}"
    `;

        const aiRes = await model.generateContent(aiPrompt);
        const answer = aiRes.response.text();

        return res.json({
            text: answer,
            movies
        });

    } catch (err) {
        console.error("Gemini Chatbot Error:", err);
        return res.status(500).json({ message: "Chatbot gặp lỗi, thử lại nhé!" });
    }
};
