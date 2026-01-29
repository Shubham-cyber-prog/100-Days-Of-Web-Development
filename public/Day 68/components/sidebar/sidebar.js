import { getStore, setStore, createChat } from "../../data/store.js";
import { loadChat } from "../chat/chat.js";

export async function loadSidebar() {
  try {
    const res = await fetch("./components/sidebar/sidebar.html");
    
    if (!res.ok) {
      throw new Error(`Failed to load sidebar component: ${res.status}`);
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
      throw new Error('Invalid response format for sidebar component');
    }
    
    const html = await res.text();
    const sidebarEl = document.getElementById("sidebar");
    
    if (!sidebarEl) {
      console.error('Sidebar element not found in DOM');
      return;
    }
    
    sidebarEl.innerHTML = html;

    const usernameEl = document.getElementById("username");
    if (usernameEl) {
      usernameEl.textContent = getStore().user?.name || "User";
    }

    attachEvents();
    renderChats();
  } catch (error) {
    console.error('Error loading sidebar:', error);
    const sidebarEl = document.getElementById("sidebar");
    if (sidebarEl) {
      sidebarEl.innerHTML = '<p style="color: #e74c3c; padding: 10px;">Failed to load sidebar. Please refresh the page.</p>';
    }
  }
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
