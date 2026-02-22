const modes = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

let currentMode = "pomodoro";
let timeLeft = modes[currentMode];
let isRunning = false;
let timer;

const timerDisplay = document.getElementById("timer");
const modeText = document.getElementById("modeText");

/* Display */
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

/* Timer */
function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;

      if (currentMode === "pomodoro") {
        switchMode("shortBreak");
        alert("Time for a break!");
      } else {
        switchMode("pomodoro");
        alert("Back to work!");
      }
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = modes[currentMode];
  updateDisplay();
}

/* Modes */
function switchMode(mode) {
  clearInterval(timer);
  isRunning = false;
  currentMode = mode;
  timeLeft = modes[mode];

  modeText.textContent =
    mode === "pomodoro" ? "Time to focus!" : "Time for a break!";

  document.body.className = mode;
  updateActiveTab(mode);
  updateDisplay();
}

function updateActiveTab(mode) {
  document.querySelectorAll(".modes button").forEach(btn =>
    btn.classList.remove("active")
  );
  document.getElementById(mode).classList.add("active");
}

/*Events */
document.getElementById("start").onclick = startTimer;
document.getElementById("pause").onclick = pauseTimer;
document.getElementById("reset").onclick = resetTimer;

document.getElementById("pomodoro").onclick = () => switchMode("pomodoro");
document.getElementById("shortBreak").onclick = () => switchMode("shortBreak");
document.getElementById("longBreak").onclick = () => switchMode("longBreak");

updateDisplay();
