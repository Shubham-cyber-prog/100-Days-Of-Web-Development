let timer = null;
let targetTime = null;
let startTime = null;

const $ = id => document.getElementById(id);

const daysEl = $("days");
const hoursEl = $("hours");
const minutesEl = $("minutes");
const secondsEl = $("seconds");
const eventTitle = $("eventTitle");
const progressFill = $("progressFill");
const errorMsg = $("errorMsg");
const resetBtn = $("resetBtn");
const startBtn = $("startBtn");

// default date = tomorrow
(() => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  $("targetDate").value = d.toISOString().split("T")[0];
})();

startBtn.addEventListener("click", startCountdown);
resetBtn.addEventListener("click", resetCountdown);

// presets
document.querySelectorAll(".preset-list button").forEach(btn => {
  btn.onclick = () => {
    $("targetDate").value = btn.dataset.date;
    $("targetTime").value = btn.dataset.time;
    $("eventName").value = btn.textContent.trim();
    startCountdown();
  };
});

function startCountdown() {
  errorMsg.textContent = "";

  const date = $("targetDate").value;
  const time = $("targetTime").value;
  const name = $("eventName").value || "Countdown";

  if (!date) {
    errorMsg.textContent = "Please select a target date.";
    return;
  }

  targetTime = new Date(`${date}T${time}`);
  startTime = new Date();

  if (targetTime <= startTime) {
    errorMsg.textContent = "Please select a future date & time.";
    return;
  }

  clearInterval(timer);
  startBtn.disabled = true;
  resetBtn.style.display = "inline-block";
  eventTitle.textContent = name;

  update();
  timer = setInterval(update, 1000);
}

function update() {
  const now = new Date();
  const diff = targetTime - now;

  if (diff <= 0) {
    clearInterval(timer);
    eventTitle.textContent = "🎉 Time’s Up!";
    progressFill.style.width = "100%";
    startBtn.disabled = false;
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;

  daysEl.textContent = String(d).padStart(2, "0");
  hoursEl.textContent = String(h).padStart(2, "0");
  minutesEl.textContent = String(m).padStart(2, "0");
  secondsEl.textContent = String(s).padStart(2, "0");

  const percent = ((now - startTime) / (targetTime - startTime)) * 100;
  progressFill.style.width = Math.min(percent, 100) + "%";
}

function resetCountdown() {
  clearInterval(timer);
  startBtn.disabled = false;
  progressFill.style.width = "0%";
  resetBtn.style.display = "none";
  eventTitle.textContent = "Set a countdown to begin";

  [daysEl, hoursEl, minutesEl, secondsEl].forEach(el => el.textContent = "00");
}

// particles
(() => {
  const p = document.getElementById("particles");
  for (let i = 0; i < 25; i++) {
    const d = document.createElement("div");
    d.className = "particle";
    d.style.left = Math.random() * 100 + "%";
    d.style.top = Math.random() * 100 + "%";
    d.style.animationDelay = Math.random() * 10 + "s";
    p.appendChild(d);
  }
})();
