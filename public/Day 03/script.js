const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      themeToggle.textContent = "☀️ Light Mode";
    } else {
      themeToggle.textContent = "🌙 Dark Mode";
    }
  });
}
const container = document.querySelector('.container');
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
  const text = taskInput.value.trim();
  
   if (text=== '') {
        
        const errMsg = document.createElement('div');
         errMsg.innerText = 'Please enter a task.';
         
         container.prepend(errMsg);
         errMsg.classList.add('tempMsg','errMsg');
         setTimeout(() => {
             container.removeChild(errMsg);
         }, 4000);
         return;
        
    }

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;
  span.addEventListener("click", () => {
    span.classList.toggle("completed");
  });

  const actions = document.createElement("div");
  actions.className = "actions";

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn","btn");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit task:", span.textContent);
    if (newText && newText.trim() !== "") {
      span.textContent = newText.trim();
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn","btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);

  taskList.appendChild(li);
  taskInput.value = "";
   const succMsg = document.createElement('div');
         succMsg.innerText = 'Task added successfully.';
         container.prepend(succMsg);
         succMsg.classList.add('tempMsg','succMsg');
         setTimeout(() => {
             container.removeChild(succMsg);
         }, 4000);
        return;
    
}
