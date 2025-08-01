import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input) return;
    setLoading(true);
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a helpful tutor for programming quizzes." },
          { role: "user", content: input }
        ]
      }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="border rounded p-4 bg-white shadow mt-8 max-w-xl mx-auto">
      <div className="mb-2 font-bold">Ask AI for help:</div>
      {/* Only show chat history if there are messages */}
      {messages.length > 0 && (
        <div className="mb-2 h-32 overflow-y-auto bg-gray-50 p-2 rounded">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "text-blue-700" : "text-green-700"}>
              <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2 items-end">
        <textarea
          className="border rounded px-2 py-1 flex-1 resize-y min-h-[40px] max-h-40"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your question..."
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey && !loading) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded self-end"
          onClick={sendMessage}
          disabled={loading}
          style={{ height: "40px" }} // optional: ensures consistent button height
        >
          Send
        </button>
      </div>
    </div>
  );
}