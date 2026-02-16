const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

/* Auto-grow textarea */
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});

/* Enter to send */
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener("click", sendMessage);

/* Add message with avatar */
function addMessage(text, role) {
  const message = document.createElement("div");
  message.className = `message ${role}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  const avatar = document.createElement("img");
  avatar.className = "avatar";

  if (role === "assistant") {
    avatar.src = "bot.jpg";
    avatar.alt = "Bot";
    message.appendChild(avatar);
    message.appendChild(bubble);
  } else {
    avatar.src = "user.jpg";
    avatar.alt = "User";
    message.appendChild(bubble);
    message.appendChild(avatar);
  }

  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;

  return bubble;
}

/* Simulated streaming */
function streamResponse(element, text) {
  let i = 0;
  sendBtn.disabled = true;
  element.textContent = "";

  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    chat.scrollTop = chat.scrollHeight;

    if (i >= text.length) {
      clearInterval(interval);
      sendBtn.disabled = false;
    }
  }, 25);
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");

  input.value = "";
  input.style.height = "auto";

  const assistantBubble = addMessage("", "assistant");

  const fakeResponse =
    "Hello\n" +
    "Welcome to 100 days of Web development";

  streamResponse(assistantBubble, fakeResponse);
}

/* Back navigation */
function goBack() {
  window.location.href = "../../index.html";
}
