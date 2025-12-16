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
    const [isTyping, setIsTyping] = useState(false);
    const bodyRef = useRef(null);

    /* AUTO SCROLL CHAT */
    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userText = input;
        setMessages(prev => [...prev, { sender: "user", text: userText }]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await axios.post("http://localhost:5000/api/chatbot", {
                message: userText
            });

            setTimeout(() => {
                setMessages(prev => [
                    ...prev,
                    {
                        sender: "bot",
                        text: res.data.text,
                        movies: res.data.movies || []
                    }
                ]);
                setIsTyping(false);
            }, 600);
        } catch {
            setMessages(prev => [
                ...prev,
                { sender: "bot", text: "❌ Không thể kết nối máy chủ." }
            ]);
            setIsTyping(false);
        }
    };

    return (
        /* 🔥 WRAPPER STICKY */
        <div className="sticky bottom-6 flex justify-end pr-6 z-50">
            <div className="flex flex-col items-end gap-4">
                {/* BUTTON */}
                <button
                    onClick={() => setOpen(true)}
                    className="
            w-14 h-14 rounded-full
            bg-gradient-to-br from-red-600 to-red-800
            flex items-center justify-center
            shadow-[0_10px_30px_rgba(229,9,20,0.6)]
            hover:scale-110 transition
          "
                >
                    <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7 text-white" />
                </button>

                {/* CHATBOX */}
                {open && (
                    <div
                        className="
              w-[360px] h-[520px]
              bg-[#0f0f0f]
              rounded-2xl
              shadow-[0_20px_50px_rgba(0,0,0,0.8)]
              flex flex-col overflow-hidden
            "
                    >
                        {/* HEADER */}
                        <div className="flex items-center justify-between px-4 py-3
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
                            className="flex-1 p-4 space-y-3 overflow-y-auto"
                        >
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm
                      ${msg.sender === "user"
                                                ? "bg-red-600 text-white rounded-br-md"
                                                : "bg-[#1f1f1f] text-gray-200 rounded-bl-md"
                                            }`}
                                    >
                                        <p>{msg.text}</p>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-[#1f1f1f] text-gray-300 px-4 py-2 rounded-2xl text-sm animate-pulse">
                                        Đang soạn...
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* INPUT */}
                        <div className="p-3 border-t border-white/10 bg-[#0b0b0b] flex gap-2">
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && sendMessage()}
                                placeholder="Hỏi phim, thể loại, gợi ý..."
                                className="flex-1 bg-[#1a1a1a] rounded-full px-4 py-2 text-sm text-white"
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-full font-bold text-sm"
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chatbot;
