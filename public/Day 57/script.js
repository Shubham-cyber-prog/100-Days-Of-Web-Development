let habitList = document.getElementById("habitList");
let habitInput = document.getElementById("habitInput");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
  habitList.innerHTML = "";

  habits.forEach((habit, index) => {
    let li = document.createElement("li");
    li.className = habit.completed ? "completed" : "";

    let span = document.createElement("span");
    span.textContent = habit.name;

    let actions = document.createElement("div");
    actions.className = "actions";

    let completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = () => toggleComplete(index);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteHabit(index);

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    habitList.appendChild(li);
  });
}

function addHabit() {
  let habitText = habitInput.value.trim();
  if (habitText === "") return;

  habits.push({ name: habitText, completed: false });
  habitInput.value = "";
  saveHabits();
  renderHabits();
}

function toggleComplete(index) {
  habits[index].completed = !habits[index].completed;
  saveHabits();
  renderHabits();
}

function deleteHabit(index) {
  habits.splice(index, 1);
  saveHabits();
  renderHabits();
}

renderHabits();
