import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Xin chào! Tôi có thể giúp bạn tìm phim, gợi ý phim hoặc trả lời câu hỏi 🎬"
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
                { sender: "bot", text: "❌ Không thể kết nối máy chủ!" }
            ]);
        }
    };

    return (
        <>
            {/* NÚT FLOATING */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.3-3.9A7.66 7.66 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </button>

            {/* HỘP CHAT */}
            {open && (
                <div className="
          fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden
          backdrop-blur-xl border border-white/20 animate-fadeIn
        ">
                    {/* HEADER */}
                    <div className="bg-red-600 text-white px-4 py-3 flex justify-between items-center">
                        <h2 className="font-semibold text-lg">🎬 Chatbot Phim</h2>
                        <button onClick={() => setOpen(false)} className="text-white text-xl">×</button>
                    </div>

                    {/* BODY */}
                    <div
                        className="flex-1 p-3 space-y-3 overflow-y-auto bg-gray-50"
                        ref={bodyRef}
                    >
                        {messages.map((msg, idx) => (
                            <div key={idx}
                                className={`p-3 max-w-[80%] rounded-xl shadow 
                ${msg.sender === "user"
                                        ? "bg-green-200 text-black ml-auto"
                                        : "bg-white border text-black"
                                    }`}>
                                <p>{msg.text}</p>

                                {/* Danh sách phim */}
                                {msg.movies && msg.movies.length > 0 && (
                                    <div className="mt-2 space-y-1">
                                        {msg.movies.map(m => (
                                            <div key={m._id} className="p-2 bg-gray-100 rounded-lg shadow-sm border-l-4 border-red-500">
                                                <p className="font-semibold">{m.title}</p>
                                                <p className="text-xs text-gray-600">{m.genre}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* INPUT */}
                    <div className="p-3 border-t flex bg-white">
                        <input
                            type="text"
                            value={input}
                            placeholder="Nhập câu hỏi..."
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            className="flex-1 px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <button
                            onClick={sendMessage}
                            className="ml-2 bg-red-600 text-white px-4 rounded-xl hover:bg-red-700"
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
