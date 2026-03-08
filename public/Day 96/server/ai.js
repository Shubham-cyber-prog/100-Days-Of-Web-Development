// server/ai.js
const OLLAMA_URL = "http://localhost:11434/api/chat";

const messages = [
  {
    role: "system",
    content: "You are a helpful AI assistant. Answer clearly and concisely.",
  },
];

export async function chatWithAI(input) {
  messages.push({ role: "user", content: input });

  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "qwen3:8b",
      messages,
      stream: false,
    }),
  });

  const data = await response.json();
  const reply = data.message.content;

  messages.push({ role: "assistant", content: reply });
  return reply;
}
