import { loadSidebar } from "./components/sidebar/sidebar.js";
import { loadHeader } from "./components/header/header.js";
import { loadChat } from "./components/chat/chat.js";
import { loadPrompt } from "./components/prompt/prompt.js";

export function renderApp(root) {
  root.innerHTML = `
    <div class="app-layout">
      <div id="sidebar"></div>
      <div class="main-area">
        <div id="header"></div>
        <div id="chat"></div>
        <div id="prompt"></div>
      </div>
    </div>
  `;

  loadSidebar();
  loadHeader();
  loadChat();
  loadPrompt(); 
}
