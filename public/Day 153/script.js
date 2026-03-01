const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');
const clearLapsBtn = document.getElementById('clearLapsBtn');

let timerInterval = null;
let totalSeconds = 0;
let isRunning = false;

let laps = JSON.parse(localStorage.getItem('stopwatchLaps')) || [];

function formatTime(totalSec) {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;

    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');

    return `${h}:${m}:${s}`;
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(totalSeconds);
}

function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    toggleControls();
    
    timerInterval = setInterval(() => {
        totalSeconds++;
        updateDisplay();
    }, 1000);
}

function stopTimer() {
    if (!isRunning) return;

    isRunning = false;
    clearInterval(timerInterval);
    toggleControls();
}

function resetTimer() {
    stopTimer();
    totalSeconds = 0;
    updateDisplay();
}

function recordLap() {
    const currentDisplayTime = formatTime(totalSeconds);
    const lapRecord = {
        id: Date.now(),
        time: currentDisplayTime,
        lapNum: laps.length + 1
    };

    laps.push(lapRecord);
    saveLaps();
    renderLaps();
}

function saveLaps() {
    localStorage.setItem('stopwatchLaps', JSON.stringify(laps));
}

function clearLaps() {
    laps = [];
    saveLaps();
    renderLaps();
}

function renderLaps() {
    lapsList.innerHTML = '';
    
    const reversedLaps = [...laps].reverse();

    reversedLaps.forEach(lap => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="lap-number">Lap ${lap.lapNum}</span>
            <span>${lap.time}</span>
        `;
        lapsList.appendChild(li);
    });
}

function toggleControls() {
    startBtn.disabled = isRunning;
    stopBtn.disabled = !isRunning;
    lapBtn.disabled = !isRunning;
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
clearLapsBtn.addEventListener('click', clearLaps);

renderLaps();


/* 🎨 Theme switch logic */

const themeButtons = document.querySelectorAll(".theme-switcher button");
const floatingBg = document.querySelector(".floating-bg");

// Load saved theme
const savedTheme = localStorage.getItem("stopwatchTheme");
if(savedTheme){
    floatingBg.style.background = savedTheme;
}

themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        let theme = "";

        if(btn.dataset.theme === "blue"){
            theme = "linear-gradient(270deg,#3b82f6,#06b6d4,#2563eb)";
        }

        if(btn.dataset.theme === "purple"){
            theme = "linear-gradient(270deg,#8b5cf6,#ec4899,#a855f7)";
        }

        if(btn.dataset.theme === "green"){
            theme = "linear-gradient(270deg,#22c55e,#10b981,#4ade80)";
        }

        if(btn.dataset.theme === "sunset"){
            theme = "linear-gradient(270deg,#ff7a18,#ff4d6d,#ff9a8b)";
        }

        floatingBg.style.background = theme;
        localStorage.setItem("stopwatchTheme", theme);
    });
});