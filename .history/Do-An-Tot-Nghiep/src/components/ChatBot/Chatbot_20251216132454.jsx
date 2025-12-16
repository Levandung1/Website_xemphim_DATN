import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "🎬 Xin chào! Tôi có thể gợi ý phim, tìm theo thể loại hoặc trả lời câu hỏi của bạn."
        }
    ]);
    const [input, setInput] = useState("");
    const bodyRef = useRef(null);

    /* Auto scroll */
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
                    movies: res.data.movies || []
                }
            ]);
        } catch {
            setMessages(prev => [
                ...prev,
                { sender: "bot", text: "❌ Không thể kết nối máy chủ." }
            ]);
        }
    };

    return (
        <>
            {/* FLOAT BUTTON */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-[9999]
                   w-14 h-14 rounded-full
                   bg-gradient-to-br from-red-600 to-red-800
                   flex items-center justify-center
                   shadow-[0_10px_30px_rgba(229,9,20,0.6)]
                   hover:scale-105 transition"
            >
                <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7 text-white" />
            </button>

            {/* CHATBOX */}
            {open && (
                <div
                    className="fixed bottom-24 right-6 z-[9999]
                     w-[360px] h-[520px]
                     bg-[#0f0f0f] rounded-2xl
                     shadow-[0_20px_50px_rgba(0,0,0,0.8)]
                     flex flex-col overflow-hidden"
                >
                    {/* HEADER */}
                    <div className="flex items-center justify-between
                          px-4 py-3
                          bg-gradient-to-r from-red-600 to-red-800
                          text-white font-bold">
                        <span>🎬 Trợ lý phim</span>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-xl hover:opacity-80"
                        >
                            ×
                        </button>
                    </div>

                    {/* BODY */}
                    <div
                        ref={bodyRef}
                        className="flex-1 p-4 space-y-3
                       overflow-y-auto scroll-smooth"
                    >
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed
                    ${msg.sender === "user"
                                            ? "bg-red-600 text-white rounded-br-md"
                                            : "bg-[#1f1f1f] text-gray-200 rounded-bl-md"
                                        }`}
                                >
                                    <p>{msg.text}</p>

                                    {/* MOVIE SUGGESTIONS */}
                                    {msg.movies?.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {msg.movies.map(m => (
                                                <div
                                                    key={m._id}
                                                    className="flex gap-3 items-center
                                     bg-black/40 rounded-lg p-2"
                                                >
                                                    <img
                                                        src={m.posterUrl}
                                                        alt={m.title}
                                                        className="w-10 h-14 object-cover rounded"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-bold text-white">
                                                            {m.title}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {m.genre}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* INPUT */}
                    <div className="p-3 border-t border-white/10 bg-[#0b0b0b] flex gap-2">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && sendMessage()}
                            placeholder="Hỏi phim, thể loại, gợi ý..."
                            className="flex-1 bg-[#1a1a1a]
                         rounded-full px-4 py-2
                         text-sm text-white
                         placeholder-gray-500
                         focus:outline-none"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-red-600 hover:bg-red-700
                         text-white px-4
                         rounded-full font-bold text-sm"
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
