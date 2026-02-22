document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("chatToggle");
  const chatbot = document.getElementById("chatbot");
  const input = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");
  const chatBody = document.getElementById("chatBody");

  if (!toggle || !chatbot) {
    console.error("Chatbot toggle or container missing");
    return;
  }

  toggle.addEventListener("click", () => {
    chatbot.style.display =
      chatbot.style.display === "flex" ? "none" : "flex";
  });

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = `chat-message ${type}`;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function botReply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi"))
      return "Hello 👋 I can help you with ML roadmap, courses, and progress.";

    if (msg.includes("roadmap"))
      return "Visit the Roadmap page to explore the full ML learning path.";

    if (msg.includes("course"))
      return "We offer Python, Supervised, Unsupervised, Deep Learning, and NLP courses.";

    if (msg.includes("progress"))
      return "Your learning progress is tracked on the Progress page.";

    return "I'm still learning 🤖. Try asking about roadmap, courses, or progress.";
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    setTimeout(() => {
      addMessage(botReply(text), "bot");
    }, 400);
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });
});
