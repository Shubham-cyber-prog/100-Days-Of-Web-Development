import { getStore } from "../../data/store.js";

let chatMounted = false;

export async function loadChat() {
  if (!chatMounted) {
    const res = await fetch("./components/chat/chat.html");
    document.getElementById("chat").innerHTML = await res.text();
    chatMounted = true;
  }
  renderMessages();
}

function renderMessages() {
  const store = getStore();
  const chat = store.chats.find(c => c.id === store.currentChatId);
  if (!chat) return;

  const wrapper = document.getElementById("chatWrapper");
  const container = document.getElementById("chatContainer");

  wrapper.innerHTML = "";

  chat.messages.forEach(msg => {
    const box = document.createElement("div");
    box.className = `${msg.role}-chat-box chat-enter`;

    const avatar = document.createElement("img");
    avatar.src = msg.role === "user" ? "user.png" : "ai.png";
    avatar.className = "chat-avatar";

    const content = document.createElement("div");
    content.className = `${msg.role}-chat-area`;

    if (msg.image) {
      const img = document.createElement("img");
      img.src = msg.image;
      img.className = "chat-image";
      content.appendChild(img);
    }

    if (msg.text) {
      const p = document.createElement("p");
      p.textContent = msg.text;
      content.appendChild(p);
    }

    msg.role === "user"
      ? (box.appendChild(content), box.appendChild(avatar))
      : (box.appendChild(avatar), box.appendChild(content));

    wrapper.appendChild(box);
  });

  // ✅ REAL auto-scroll (this now works)
  container.scrollTop = container.scrollHeight;
}
