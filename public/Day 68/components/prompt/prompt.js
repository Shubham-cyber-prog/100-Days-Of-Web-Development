import { getStore, setStore, createChat } from "../../data/store.js";
import { loadChat } from "../chat/chat.js";
import { askGemini } from "../../services/gemini.js";

export async function loadPrompt() {
  const res = await fetch("./components/prompt/prompt.html");
  document.getElementById("prompt").innerHTML = await res.text();
  attachEvents();
}

function attachEvents() {
  const input = document.getElementById("promptInput");
  const sendBtn = document.getElementById("sendBtn");
  const uploadBtn = document.getElementById("uploadBtn");
  const imageInput = document.getElementById("imageInput");
  const preview = document.getElementById("imagePreview");

  if (!input || !sendBtn || !uploadBtn || !imageInput || !preview) {
    console.error("❌ Prompt elements missing");
    return;
  }

  let sending = false;
  let imageBase64 = null;

  /* ===== IMAGE PICKER ===== */
  uploadBtn.addEventListener("click", () => imageInput.click());

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      preview.src = e.target.result;
      preview.style.display = "block";
      imageBase64 = e.target.result.split(",")[1];
    };
    reader.readAsDataURL(file);
  });

  /* ===== SEND (CLICK) ===== */
  sendBtn.addEventListener("click", sendMessage);

  /* ===== SEND (ENTER) ===== */
  input.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});


  async function sendMessage() {
    const text = input.value.trim();
    if ((!text && !imageBase64) || sending) return;

    sending = true;
    sendBtn.disabled = true;

    const store = getStore();
    if (!store.currentChatId) createChat();

    const chat = store.chats.find(c => c.id === store.currentChatId);
    if (!chat) {
      sending = false;
      sendBtn.disabled = false;
      return;
    }

    /* USER MESSAGE */
    chat.messages.push({
      role: "user",
      text,
      image: imageBase64 ? preview.src : null
    });

    setStore(store);
    loadChat();

    /* CLEAR INPUT IMMEDIATELY (ChatGPT behavior) */
    input.value = "";
    input.focus();

    try {
      const aiText = await askGemini(
        text || "Describe this image",
        imageBase64
      );

      chat.messages.push({
        role: "ai",
        text: aiText || "⚠️ Empty response"
      });
    } catch (err) {
      console.error(err);
      chat.messages.push({
        role: "ai",
        text: "⚠️ Gemini error"
      });
    }

    setStore(store);
    loadChat();

    /* RESET IMAGE AFTER RESPONSE */
    preview.src = "";
    preview.style.display = "none";
    imageInput.value = "";
    imageBase64 = null;

    sending = false;
    sendBtn.disabled = false;
  }
}
