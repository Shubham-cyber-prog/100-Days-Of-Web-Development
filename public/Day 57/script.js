let habitList = document.getElementById("habitList");
let habitInput = document.getElementById("habitInput");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

let lastReset = localStorage.getItem("lastReset");

function resetDaily() {
  let today = new Date().toDateString();

  if (lastReset !== today) {
    habits.forEach(h => h.completed = false);
    localStorage.setItem("lastReset", today);
    saveHabits();
  }
}

resetDaily();

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

    let streak = document.createElement("small");
streak.textContent = `🔥 ${habit.streak || 0} days`;
span.appendChild(document.createElement("br"));
span.appendChild(streak);

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

  let completed = habits.filter(h => h.completed).length;
let percent = habits.length ? (completed / habits.length) * 100 : 0;
document.getElementById("progressBar").style.width = percent + "%";
}

function addHabit() {
  let habitText = habitInput.value.trim();
  if (habitText === "") return;

  // habits.push({ name: habitText, completed: false });
  habits.push({
  name: habitText,
  completed: false,
  streak: 0,
  lastCompleted: null
});
  habitInput.value = "";
  saveHabits();
  renderHabits();
}

// function toggleComplete(index) {
//   habits[index].completed = !habits[index].completed;
//   saveHabits();
//   renderHabits();
// }

function toggleComplete(index) {
  let today = new Date().toDateString();
  let habit = habits[index];

  if (!habit.completed) {
    habit.completed = true;

    if (habit.lastCompleted === today) return;

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (habit.lastCompleted === yesterday.toDateString()) {
      habit.streak++;
    } else {
      habit.streak = 1;
    }

    habit.lastCompleted = today;
  } else {
    habit.completed = false;
  }

  saveHabits();
  renderHabits();
}



let search = document.getElementById("search");

search.addEventListener("input", () => {
  let value = search.value.toLowerCase();
  let filtered = habits.filter(h => h.name.toLowerCase().includes(value));
  renderFiltered(filtered);
});

function renderFiltered(list) {
  habitList.innerHTML = "";

  list.forEach((habit, index) => {
    let li = document.createElement("li");
    li.textContent = habit.name;
    habitList.appendChild(li);
  });
}

function deleteHabit(index) {
  habits.splice(index, 1);
  saveHabits();
  renderHabits();
}

renderHabits();


if ("Notification" in window) {
  Notification.requestPermission();
}

function remind() {
  if (Notification.permission === "granted") {
    new Notification("Habit Reminder", {
      body: "Don't forget your habits today! 💪"
    });
  }
}

setTimeout(remind, 5000);