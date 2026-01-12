/* ================= VIEW ================= */

/**
 * Create a task DOM element
 */
export function createTaskElement(task, handlers) {
  const el = document.createElement("div");
  el.className = `task priority-${task.priority}`;
  el.id = task.id;
  el.draggable = true;

  el.innerHTML = `
    <strong>${task.title}</strong>
    <p>${task.desc || ""}</p>
    <span class="priority-tag">${task.priority}</span>
    <button class="delete-btn">❌</button>
  `;

  // Delete
  el.querySelector(".delete-btn").addEventListener("click", () => {
    handlers.onDelete(task.id);
  });

  // Drag
  el.draggable = true;

    el.addEventListener("dragstart", e => {
  e.dataTransfer.setData("id", task.id);
    e.dataTransfer.effectAllowed = "move";
    });
  el.addEventListener("dragend", () => {
    el.classList.remove("dragging");
  });

  return el;
}

/**
 * Render all tasks into columns
 */
export function renderTasks(tasks, handlers) {
  // Clear all columns
  document.querySelectorAll(".task-list").forEach(col => {
    col.innerHTML = "";
  });

  tasks.forEach(task => {
    const taskEl = createTaskElement(task, handlers);
    const column = document
      .getElementById(task.column)
      ?.querySelector(".task-list");

    if (column) {
      column.appendChild(taskEl);
    }
  });
}
