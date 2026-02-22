const STORAGE_KEY = "flowboard_tasks";

export function getTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(task) {
  const tasks = getTasks();
  tasks.push({
    ...task,
    priority: task.priority || "medium"
  });
  saveTasks(tasks);
}

export function deleteTask(id) {
  const tasks = getTasks().filter(t => t.id !== id);
  saveTasks(tasks);
}

export function updateTaskColumn(id, column) {
  const tasks = getTasks().map(t =>
    t.id === id ? { ...t, column } : t
  );
  saveTasks(tasks);
}
