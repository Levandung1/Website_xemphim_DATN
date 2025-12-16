import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);

    const res = await axios.post("http://localhost:5000/api/chatbot", {
      message: input
    });

    setMessages(prev => [
      ...prev,
      { sender: "bot", text: res.data.text, movies: res.data.movies }
    ]);

    setInput("");
  };

  return (
    <>
      {/* Bubble button */}
      <div className="chat-button" onClick={() => setOpen(!open)}>
        💬
      </div>

      {open && (
        <div className="chat-box">
          <div className="chat-header">🎬 Chatbot Phim</div>
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                <p>{msg.text}</p>

                {/* Nếu AI trả về danh sách phim */}
                {msg.movies && msg.movies.length > 0 && (
                  <div className="movie-list">
                    {msg.movies.map(m => (
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
              onChange={e => setInput(e.target.value)}
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
