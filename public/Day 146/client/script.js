const chatBox = document.getElementById("chat-box");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const toggleBtn = document.getElementById("theme-toggle");

// ---------------- THEME ----------------
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  toggleBtn.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// ---------------- CHAT ----------------
function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = `message ${type}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  msg.appendChild(bubble);
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  return msg;
}

// ✅ Initial bot message
window.addEventListener("load", () => {
  addMessage("Hi 👋 How can I help you today?", "bot");
  input.focus();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";
  input.focus();

  const typingMsg = addMessage("Typing...", "bot");

  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    typingMsg.remove();
    addMessage(data.reply, "bot");
  } catch {
    typingMsg.remove();
    addMessage("Sorry, something went wrong.", "bot");
  }
});
