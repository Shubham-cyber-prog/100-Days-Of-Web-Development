// website/scripts/chatbot.js

document.addEventListener("DOMContentLoaded", () => {
  // Inject chatbot HTML
  const chatbotHTML = `
  <div id="chatbot-container">
    <button id="chatbot-toggle" aria-label="Open chat">💬</button>

    <div id="chatbot-box" class="hidden">
      <div class="chatbot-header">
        <span>100 Days Assistant</span>
        <button id="chatbot-close" aria-label="Close chat">×</button>
      </div>

      <div id="chatbot-messages"></div>

      <div class="chatbot-input">
        <input
          type="text"
          id="chatbot-input"
          placeholder="Ask me something..."
        />
        <button id="chatbot-send">➤</button>
      </div>
    </div>
  </div>
`;

  document.body.insertAdjacentHTML("beforeend", chatbotHTML);

  // Elements
  const toggleBtn = document.getElementById("chatbot-toggle");
  const chatbotBox = document.getElementById("chatbot-box");
  const closeBtn = document.getElementById("chatbot-close");
  const sendBtn = document.getElementById("chatbot-send");
  const input = document.getElementById("chatbot-input");
  const messages = document.getElementById("chatbot-messages");

  // Predefined answers
  const intents = [
    {
      keywords: ["100 days", "challenge", "protocol"],
      answer:
        "The 100 Days of Web Development challenge helps you build and deploy projects daily to master modern web development.",
    },
    {
      keywords: ["projects", "build"],
      answer:
        "You’ll work on real-world projects ranging from basic UI components to full-stack applications.",
    },
    {
      keywords: ["login", "account"],
      answer:
        "You can log in using the login page. If you’re new, create an account to track your progress.",
    },
    {
      keywords: ["archive"],
      answer:
        "The archive contains completed projects and previous challenges you can explore anytime.",
    },
    {
      keywords: ["help", "support"],
      answer:
        "I’m here to help! Ask me about the challenge, projects, or how to get started.",
    },
  ];

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = `chatbot-message ${type}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function getBotReply(userText) {
    const text = userText.toLowerCase();
    for (const intent of intents) {
      if (intent.keywords.some((k) => text.includes(k))) {
        return intent.answer;
      }
    }
    return "I’m still learning 🙂 Try asking about the 100-day challenge, projects, or the platform.";
  }

  // Events
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    chatbotBox.classList.toggle("hidden");

    if (
      !chatbotBox.classList.contains("hidden") &&
      messages.children.length === 0
    ) {
      addMessage(
        "Hi 👋 I’m the 100 Days Assistant. How can I help you?",
        "bot",
      );
    }
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    chatbotBox.classList.add("hidden");
  });

  sendBtn.onclick = sendMessage;
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    setTimeout(() => {
      addMessage(getBotReply(text), "bot");
    }, 500);
  }
});
// Safety: ensure chatbot starts closed
chatbotBox.classList.add("hidden");
