import Movie from "../models/Movie.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini API (NEW VERSION)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // Model mới hợp lệ
});

// AUTO FIX JSON
function cleanJSON(text) {
    try {
        return JSON.parse(
            text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .replace(/[\n\r]/g, "")
                .trim()
        );
    } catch {
        return {};
    }
}


// ============================
//      MAIN CHATBOT LOGIC
// ============================
export const chatbotReply = async (req, res) => {
    try {
        const { message } = req.body;

        // 1. Xác định ý định người dùng
        const intentPrompt = `
Người dùng hỏi: "${message}".

Hãy phân loại câu hỏi duy nhất thành 1 từ:
SEARCH — nếu người dùng muốn tìm phim
RECOMMEND — nếu người dùng muốn gợi ý phim
CHAT — nếu chỉ trò chuyện thông thường

Trả về TỪ DUY NHẤT.
        `;

        let intent = (await askGemini(intentPrompt)).trim().toUpperCase();
        intent = intent.replace(/\W/g, "");

        let movies = [];

        // 2. Nếu là SEARCH → phân tích câu hỏi
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
Chỉ trả JSON.
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

        // 3. Trả lời dựa trên kết quả
        const aiPrompt = `
Bạn là chatbot hỗ trợ tìm phim cho website xem phim.

Kết quả tìm kiếm:
${movies.length
                ? movies.map(m => `- ${m.title} (${m.year}) – ${m.genre}`).join("\n")
                : "Không tìm thấy phim phù hợp trong cơ sở dữ liệu."
            }

Hãy trả lời người dùng bằng giọng thân thiện, ngắn gọn, tự nhiên.

Người dùng hỏi: "${message}"
        `;

        const answer = await askGemini(aiPrompt);

        res.json({
            text: answer,
            movies
        });

    } catch (err) {
        console.error("Gemini Chatbot Error:", err);
        res.status(500).json({ message: "Chatbot gặp lỗi, thử lại nhé!" });
    }
};


// Function gọi Gemini
async function askGemini(prompt) {
    const result = await model.generateContent(prompt);
    return result.response.text();
}
