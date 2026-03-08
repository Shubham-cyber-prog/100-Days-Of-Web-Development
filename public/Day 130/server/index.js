import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text, from, to } = req.body;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        prompt: `Translate the following text from ${from} to ${to}:\n\n${text}`,
        stream: false,
      }),
    });

    const data = await response.json();
    res.json({ translated: data.response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
