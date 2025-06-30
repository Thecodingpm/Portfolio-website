import React, { useState } from "react";

const BasicAiChatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m your AI assistant. Ask me math questions, the date, or say hello!" },
  ]);
  const [input, setInput] = useState("");

  const getBotResponse = (input) => {
    const text = input.toLowerCase().trim();

    // Greetings
    if (/(hi|hello|hey)/.test(text)) {
      return "Hello! How can I assist you today?";
    }

    // Date and time
    if (text.includes("date") || text.includes("time")) {
      return `Current date and time is: ${new Date().toLocaleString()}`;
    }

    // Simple math expressions
    if (/^[0-9+\-*/ ().]+$/.test(text)) {
      try {
        // eslint-disable-next-line no-eval
        const result = eval(text);
        return `Result is: ${result}`;
      } catch {
        return "Sorry, I couldn’t calculate that.";
      }
    }

    // Weather - placeholder
    if (text.includes("weather")) {
      return "Currently, I can't fetch real weather data. Try asking me math or date/time instead!";
    }

    return "Sorry, I don’t understand that. Try asking me math, date/time, or greetings.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: getBotResponse(input) };

    setMessages((msgs) => [...msgs, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div style={{ maxWidth: 400, margin: "30px auto", fontFamily: "monospace" }}>
      <div
        style={{
          height: 240,
          overflowY: "auto",
          border: "1px solid #333",
          padding: 10,
          backgroundColor: "#111",
          color: "#0f0",
          marginBottom: 10,
          borderRadius: 6,
          whiteSpace: "pre-wrap",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.from === "user" ? "right" : "left",
              margin: "4px 0",
              fontWeight: msg.from === "bot" ? "bold" : "normal",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a question..."
        style={{
          width: "100%",
          padding: "8px",
          fontFamily: "monospace",
          fontSize: 14,
          borderRadius: 6,
          border: "1px solid #333",
          backgroundColor: "#222",
          color: "#0f0",
        }}
      />
      <button
        onClick={handleSend}
        style={{
          marginTop: 8,
          width: "100%",
          padding: "10px",
          fontFamily: "monospace",
          fontSize: 16,
          backgroundColor: "#0f0",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: "bold",
          color: "#111",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default BasicAiChatbot;