import express from "express";
import cors from "cors";
import { faqs } from "./faqs.js";

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_URL = "http://localhost:11434/api/generate";

/**
 * Simple FAQ matcher
 */
function findFAQAnswer(userMessage) {
  const message = userMessage.toLowerCase();

  for (const faq of faqs) {
    if (message.includes(faq.question.toLowerCase().split(" ")[0])) {
      return faq.answer;
    }
  }
  return null;
}

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  // 1️⃣ Check FAQ first
  const faqAnswer = findFAQAnswer(message);
  if (faqAnswer) {
    return res.json({ reply: faqAnswer });
  }

  // 2️⃣ Otherwise use AI
  try {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt: `
You are a professional customer support agent.
If you do not know something, politely say so.

User: ${message}
Support Agent:
`,
        stream: false,
      }),
    });

    const data = await response.json();
    res.json({ reply: data.response });
  } catch (err) {
    res.status(500).json({ reply: "AI service unavailable." });
  }
});

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
