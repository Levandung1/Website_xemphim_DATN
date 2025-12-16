import OpenAI from "openai";
import Movie from "../models/Movie.js";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const chatbotReply = async (req, res) => {
    try {
        const { message } = req.body;

        // =============================
        // 1. PHÂN LOẠI Ý ĐỊNH (intent)
        // =============================
        const intentPrompt = `
Người dùng hỏi: "${message}"

Phân loại ý định thành 1 trong 3 loại:
- "SEARCH" nếu muốn tìm phim theo: thể loại, năm, diễn viên, giống phim khác.
- "RECOMMEND" nếu muốn gợi ý phim hay.
- "CHAT" nếu chỉ trò chuyện bình thường.

Chỉ trả về đúng một từ: SEARCH hoặc RECOMMEND hoặc CHAT.
    `;

        const intentRes = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: intentPrompt }]
        });

        const intent = intentRes.choices[0].message.content.trim();

        let movies = [];

        // =============================
        // 2. HANDLE SEARCH
        // =============================
        if (intent === "SEARCH") {
            const searchPrompt = `
Trích xuất thông tin từ câu hỏi của người dùng:
"${message}"

Trả về JSON với dạng:
{
  "title": "...",
  "genre": "...",
  "actor": "...",
  "year": "..."
}

Chỉ trả JSON, không giải thích.
      `;

            const extract = await client.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "system", content: searchPrompt }]
            });

            const filters = JSON.parse(extract.choices[0].message.content);

            // Truy vấn MongoDB
            let query = {};

            if (filters.title) query.title = new RegExp(filters.title, "i");
            if (filters.genre) query.genre = new RegExp(filters.genre, "i");
            if (filters.actor) query.actors = new RegExp(filters.actor, "i");
            if (filters.year) query.year = Number(filters.year);

            movies = await Movie.find(query).limit(10);
        }

        // =============================
        // 3. TẠO PHẢN HỒI TỰ NHIÊN CỦA AI
        // =============================
        const aiPrompt = `
Bạn là chatbot hỗ trợ website phim. 
Dựa vào dữ liệu phim bên dưới (nếu có), trả lời văn phong thân thiện tự nhiên:

Danh sách phim:
${movies.map(m => `${m.title} (${m.year}) - ${m.genre}`).join("\n")}

Người dùng: ${message}
    `;

        const aiRes = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: aiPrompt }]
        });

        res.json({
            text: aiRes.choices[0].message.content,
            movies
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Chatbot bị lỗi!" });
    }
};
