import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Xin chào! Tôi có thể giúp bạn tìm phim, gợi ý phim, hoặc trả lời câu hỏi 🎬" }
    ]);
    const [input, setInput] = useState("");

    const bodyRef = useRef(null);

    // Auto scroll
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

            const botMsg = {
                sender: "bot",
                text: res.data.text,
                movies: res.data.movies
            };

            setMessages(prev => [...prev, botMsg]);

        } catch (err) {
            setMessages(prev => [
                ...prev,
                { sender: "bot", text: "❌ Lỗi kết nối chatbot!" }
            ]);
        }
    };

    return (
        <>
            {/* NÚT FLOATING CHAT */}
            <div className="chat-button" onClick={() => setOpen(!open)}>
                💬
            </div>

            {open && (
                <div className="chat-box">
                    <div className="chat-header">
                        🎬 Chatbot Phim
                        <span className="close-btn" onClick={() => setOpen(false)}>✖</span>
                    </div>

                    <div className="chat-body" ref={bodyRef}>
                        {messages.map((msg, i) => (
                            <div key={i} className={`msg ${msg.sender}`}>
                                <p>{msg.text}</p>

                                {/* Nếu AI trả về danh sách phim */}
                                {msg.movies && msg.movies.length > 0 && (
                                    <div className="movie-list">
                                        {msg.movies.map((m) => (
                                            <div className="movie" key={m._id}>
                                                <b>{m.title}</b>
                                                <span>{m.genre}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            placeholder="Nhập câu hỏi..."
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button onClick={sendMessage}>Gửi</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
