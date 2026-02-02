import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat/stream", async (req, res) => {
  const { message, model } = req.body;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  const ollamaRes = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: model || "qwen3:8b",
      stream: true,
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant. Be concise.",
        },
        { role: "user", content: message },
      ],
    }),
  });

  const reader = ollamaRes.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n").filter(Boolean);

    for (const line of lines) {
      const json = JSON.parse(line);
      if (json.message?.content) {
        res.write(json.message.content);
      }
    }
  }

  res.end();
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
