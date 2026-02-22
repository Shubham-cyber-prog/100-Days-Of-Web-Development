const API_URL ="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=Your_API_key_here";

export async function askGemini(text, imageBase64 = null) {
  const parts = [];

  if (text) {
    parts.push({ text });
  }

  if (imageBase64) {
    parts.push({
      inline_data: {
        mime_type: "image/png",
        data: imageBase64
      }
    });
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts
        }
      ]
    })
  });

  const data = await res.json();
  console.log("Gemini response:", data);

  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "⚠️ Empty response"
  );
}
