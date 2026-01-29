import { setUser, createChat } from "../../data/store.js";

export function renderAuth(root) {
  if (!root) {
    console.error('Auth root element not provided');
    return;
  }
  
  fetch("./components/auth/auth.html")
    .then(res => {
      if (!res.ok) {
        throw new Error(`Failed to load auth component: ${res.status}`);
      }
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('text/html')) {
        throw new Error('Invalid response format for auth component');
      }
      return res.text();
    })
    .then(html => {
      root.innerHTML = html;
      attachAuthEvents();
    })
    .catch(error => {
      console.error('Error loading auth component:', error);
      root.innerHTML = '<p style="color: #e74c3c; padding: 10px;">Failed to load authentication. Please refresh the page.</p>';
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
