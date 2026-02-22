import { getStore, setStore, createChat } from "../../data/store.js";
import { loadChat } from "../chat/chat.js";

export async function loadSidebar() {
  const res = await fetch("./components/sidebar/sidebar.html");
  document.getElementById("sidebar").innerHTML = await res.text();

  document.getElementById("username").textContent =
    getStore().user?.name || "User";

  attachEvents();
  renderChats();
}

function attachEvents() {
  document.getElementById("newChatBtn").onclick = () => {
    createChat();
    loadChat();
    renderChats();
  };

  document.getElementById("chatSearch").oninput = e => {
    renderChats(e.target.value);
  };
}

function renderChats(filter = "") {
  const store = getStore();

  renderSection(
    store.chats.filter(c => c.pinned && !c.archived),
    "pinnedChats",
    filter
  );

  renderSection(
    store.chats.filter(c => c.project && !c.archived),
    "projectChats",
    filter
  );

  renderSection(
    store.chats.filter(c => c.archived),
    "archivedChats",
    filter
  );
}

function renderSection(chats, elementId, filter) {
  const ul = document.getElementById(elementId);
  ul.innerHTML = "";

  chats
    .filter(c =>
      c.title.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach(chat => {
      const li = document.createElement("li");
      li.textContent = chat.title;
      li.onclick = () => {
        const store = getStore();
        store.currentChatId = chat.id;
        setStore(store);
        loadChat();
      };
      ul.appendChild(li);
    });
}
