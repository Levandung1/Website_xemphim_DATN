import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatbot.css"; // dùng CSS thuần

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Xin chào! Tôi có thể giúp bạn tìm phim, gợi ý phim hoặc giải đáp câu hỏi 🎬"
        }
    ]);
    const [input, setInput] = useState("");

    const bodyRef = useRef(null);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { sender: "user", text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        try {
            const res = await axios.post("http://localhost:5000/api/chatbot", {
                message: input
            });

            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: res.data.text,
                    movies: res.data.movies
                }
            ]);
        } catch (err) {
            setMessages(prev => [
                ...prev,
                { sender: "bot", text: "❌ Lỗi kết nối máy chủ!" }
            ]);
        }
    };

    return (
        <>
            {/* NÚT CHAT */}
            <button className="chatbot-button" onClick={() => setOpen(!open)}>
                💬
            </button>

            {/* CHAT BOX */}
            {open && (
                <div className="chatbot-box">
                    <div className="chatbot-header">
                        <span>🎬 Chatbot Phim</span>
                        <button className="chatbot-close" onClick={() => setOpen(false)}>×</button>
                    </div>

                    <div className="chatbot-body" ref={bodyRef}>
                        {messages.map((msg, i) => (
                            <div key={i} className={`chat-msg ${msg.sender}`}>
                                <p>{msg.text}</p>

                                {msg.movies && msg.movies.length > 0 && (
                                    <div className="movie-list">
                                        {msg.movies.map(m => (
                                            <div className="movie-item" key={m._id}>
                                                <strong>{m.title}</strong>
                                                <span>{m.genre}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="chatbot-input">
                        <input
                            value={input}
                            placeholder="Nhập câu hỏi..."
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && sendMessage()}
                        />
                        <button onClick={sendMessage}>Gửi</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
