import * as Model from "./model.js";
import * as View from "./view.js";

/* ================= INIT ================= */
export function initBoard() {
  const tasks = Model.getTasks();
  View.renderTasks(tasks, handlers);
  updateProgress();
}

/* ================= TASK ACTIONS ================= */
export function createTask(task) {
  Model.addTask(task);
  initBoard();
}

export function removeTask(id) {
  Model.deleteTask(id);
  initBoard();
}

export function moveTask(id, column) {
  Model.updateTaskColumn(id, column);
  initBoard();
}

/* ================= PROGRESS ================= */
function updateProgress() {
  const tasks = Model.getTasks();
  const doneCount = tasks.filter(t => t.column === "done").length;
  const percent = tasks.length
    ? Math.round((doneCount / tasks.length) * 100)
    : 0;

  const bar = document.getElementById("progress-text");
  if (bar) {
    bar.style.width = percent + "%";
    bar.textContent = percent + "%";
  }
}

/* ================= VIEW HANDLERS ================= */
const handlers = {
  onDelete: removeTask,
  onDrag: e => {
    e.dataTransfer.setData("id", e.target.id);
    e.dataTransfer.effectAllowed = "move";
  }
};
