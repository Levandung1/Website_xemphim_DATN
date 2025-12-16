import { askGemini } from "../utils/gemini.js";
import Movie from "../models/Movie.js";

export const chatbotReply = async (req, res) => {
    try {
        // nhận tin nhắn của người dùng
        const { message } = req.body;
        // Phân loại câu hỏi của người dùng
        const intentPrompt = `
Người dùng hỏi: "${message}"
Trả về duy nhất một từ: SEARCH, RECOMMEND hoặc CHAT.
        `;

        let intent = (await askGemini(intentPrompt)).trim().toUpperCase();
        intent = intent.replace(/\W/g, "");
        //Chuẩn bị danh sách phim
        let movies = [];
        //phân tích câu hỏi
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
            // Chatbot trích xuất được bộ lọc từ câu hỏi và trả về danh sách phim phù hợp
            let filters = {};
            try {
                filters = JSON.parse(extracted.replace(/```json/g, "").replace(/```/g, ""));
            } catch { }

            let query = {};

            if (filters.title) query.title = new RegExp(filters.title, "i");
            if (filters.genre) query.genre = new RegExp(filters.genre, "i");
            if (filters.actor) query.actors = new RegExp(filters.actor, "i");
            if (filters.year) query.year = Number(filters.year);
            // Truy vấn cơ sở dữ liệu để tìm phim phù hợp
            movies = await Movie.find(query).limit(10);
        }
        /// Dạy cho chatbot cách trả lời
        const replyPrompt = `
Bạn là một chatbot hỗ trợ tìm phim cực dễ thương và thân thiện. 
- Luôn dùng giọng điệu vui vẻ, gần gũi.
- Có thể chèn emoji phù hợp 🎬😄
- Giải thích ngắn gọn, dễ hiểu.
- Nếu không tìm thấy phim, hãy an ủi người dùng nhẹ nhàng.
- Nếu có phim, liệt kê theo kiểu vui nhộn: "🎬 Tiêu đề (năm) – thể loại"
- Giữ câu trả lời ấm áp và thân thiện.

Danh sách phim (nếu có):
${movies.length
                ? movies.map(m => `🎬 ${m.title} (${m.year}) – ${m.genre}`).join("\n")
                : "Không tìm thấy phim nào."}

Câu hỏi của người dùng: "${message}"
Hãy trả lời thật dễ thương, vui vẻ và thân thiện.
`;  
        //Gửi prompt cho Gemini để nhận câu trả lời
        const answer = await askGemini(replyPrompt);
        // Trả về cho người dùng
        res.json({ text: answer, movies });

    } catch (e) {
        console.error("Gemini error:", e);
        res.json({ text: "Chatbot gặp lỗi, thử lại nhé!", movies: [] });
    }
};
