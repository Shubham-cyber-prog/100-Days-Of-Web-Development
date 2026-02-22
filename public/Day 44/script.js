const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const typing = document.getElementById("typing");

let chatHistory = JSON.parse(localStorage.getItem("chat")) || [];

// Load stored messages
chatHistory.forEach(msg => addMessage(msg.text, msg.type, msg.time));

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  const time = new Date().toLocaleTimeString();
  addMessage(text, "sent", time);
  saveMessage(text, "sent", time);
  input.value = "";

  simulateReply();
}

function addMessage(text, type, time) {
  const msg = document.createElement("div");
  msg.classList.add("message", type);
  msg.innerHTML = `
    ${text}
    <div class="time">${time}</div>
  `;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function simulateReply() {
  typing.style.display = "block";

  setTimeout(() => {
    typing.style.display = "none";
    const replies = [
      "That's interesting! 😊",
      "Tell me more!",
      "I understand 👍",
      "Sounds great!",
      "Can you explain further?"
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    const time = new Date().toLocaleTimeString();

    addMessage(reply, "received", time);
    saveMessage(reply, "received", time);
  }, 1500);
}

function saveMessage(text, type, time) {
  chatHistory.push({ text, type, time });
  localStorage.setItem("chat", JSON.stringify(chatHistory));
}
