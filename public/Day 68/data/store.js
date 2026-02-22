const STORE_KEY = "chat_app";

export function initStore() {
  if (!localStorage.getItem(STORE_KEY)) {
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({
        user: null,
        currentChatId: null,
        chats: []
      })
    );
  }
}

export function getStore() {
  return JSON.parse(localStorage.getItem(STORE_KEY));
}

export function setStore(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

export function setUser(user) {
  const store = getStore();
  store.user = user;
  setStore(store);
}

export function logoutUser() {
  const store = getStore();
  store.user = null;
  setStore(store);
}

export function createChat() {
  const store = getStore();
  const id = "chat_" + Date.now();

  store.chats.unshift({
    id,
    title: "New Chat",
    messages: [
      { role: "system", text: "🤖 Hello! How can I help you today?" }
    ],
    updatedAt: Date.now()
  });

  store.currentChatId = id;
  setStore(store);

  return id;
}
