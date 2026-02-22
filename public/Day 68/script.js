
import { initStore, getStore } from "./data/store.js";
import { renderAuth } from "./components/auth/auth.js";
import { renderApp } from "./app.js";

initStore();

const app = document.getElementById("app");

function init() {
  const store = getStore();
  app.innerHTML = "";

  if (!store.user) {
    renderAuth(app);
  } else {
    renderApp(app);
  }
}

init();
