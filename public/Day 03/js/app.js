import { createTask, initBoard, moveTask } from "./controller.js";
import { generateId } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ App loaded");

  /* ================= THEME ================= */
  const themeBtn = document.querySelector(".nav-actions button");

  window.toggleTheme = () => {
    const current =
      document.documentElement.getAttribute("data-theme") || "dark";

    const next = current === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeIcon(next);

    console.log("Theme switched to:", next);
  };

  function updateThemeIcon(theme) {
    if (themeBtn) {
      themeBtn.textContent = theme === "dark" ? "🌙" : "☀️";
    }
  }

  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  /* ================= MODAL ================= */
  let activeColumn = null;

  window.openModal = column => {
    activeColumn = column;
    document.getElementById("task-modal").classList.remove("hidden");
  };

  window.closeModal = () => {
    document.getElementById("task-modal").classList.add("hidden");
  };

  document
    .getElementById("save-task")
    .addEventListener("click", () => {
      const title = document.getElementById("task-title").value.trim();
      if (!title) return alert("Task title is required");

      createTask({
        id: generateId(),
        title,
        desc: document.getElementById("task-desc").value,
        priority: document.getElementById("task-priority").value,
        column: activeColumn
      });

      closeModal();
    });

  /* ================= DRAG & DROP ================= */
  window.allowDrop = e => {
  e.preventDefault();
};

window.drop = e => {
  e.preventDefault();
  const id = e.dataTransfer.getData("id");
  const column = e.target.closest(".column");
  if (!column) return;

  moveTask(id, column.id);
};


  /* ================= INIT ================= */
  initBoard();
});
