import { getStore } from "../../data/store.js";

let chatMounted = false;

export async function loadChat() {
  if (!chatMounted) {
    try {
      const res = await fetch("./components/chat/chat.html");
      
      if (!res.ok) {
        throw new Error(`Failed to load chat component: ${res.status}`);
      }
      
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('text/html')) {
        throw new Error('Invalid response format for chat component');
      }
      
      const html = await res.text();
      const chatEl = document.getElementById("chat");
      
      if (!chatEl) {
        console.error('Chat element not found in DOM');
        return;
      }
      
      chatEl.innerHTML = html;
      chatMounted = true;
    } catch (error) {
      console.error('Error loading chat:', error);
      const chatEl = document.getElementById("chat");
      if (chatEl) {
        chatEl.innerHTML = '<p style="color: #e74c3c; padding: 10px;">Failed to load chat interface. Please refresh the page.</p>';
      }
      return;
    }
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
