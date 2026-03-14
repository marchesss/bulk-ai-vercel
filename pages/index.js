import { useState, useRef } from "react";
import "../styles/globals.css";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [emotion, setEmotion] = useState("neutral");
  const chatBoxRef = useRef(null);

  const sendQuestion = async () => {
    if (!input.trim()) return;

    // Добавляем сообщение пользователя
    setMessages((prev) => [...prev, { text: input, user: true }]);
    setInput("");
    setEmotion("thinking");

    // Отправка на серверless API
    const res = await fetch("/api/ask", {
      method: "POST",
      body: JSON.stringify({ question: input }),
    });
    const data = await res.json();

    // Добавляем ответ ИИ
    setMessages((prev) => [...prev, { text: data.text, user: false }]);
    setEmotion(data.emotion);

    // Скроллим вниз
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;

    // Возвращаем нейтральное выражение через 1 сек
    setTimeout(() => setEmotion("neutral"), 1000);
  };

  return (
    <div className="container">
      <div className="header">
        <img src="/bulk-logo.png" alt="BULK Logo" className="logo" />
        <h1>BULK AI Assistant</h1>
      </div>

      <div className="character-container">
        <img
          id="character"
          src={`/sprites/${emotion}.png`}
          alt="Character"
        />
      </div>

      <div className="chat-container">
        <div ref={chatBoxRef} className="chat-box">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.user ? "user" : "bot"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Задайте вопрос..."
            onKeyDown={(e) => e.key === "Enter" && sendQuestion()}
          />
          <button onClick={sendQuestion}>Отправить</button>
        </div>
      </div>
    </div>
  );
}
