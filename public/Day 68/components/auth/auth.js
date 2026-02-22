import { setUser, createChat } from "../../data/store.js";

export function renderAuth(root) {
  fetch("./components/auth/auth.html")
    .then(res => res.text())
    .then(html => {
      root.innerHTML = html;
      attachAuthEvents();
    });
}

function attachAuthEvents() {
  const usernameInput = document.getElementById("usernameInput");
  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", login);
  usernameInput.addEventListener("keydown", e => {
    if (e.key === "Enter") login();
  });

  function login() {
    const name = usernameInput.value.trim();
    if (!name) return;

    setUser({ id: Date.now(), name });
    createChat();

    location.reload(); 
  }
}
