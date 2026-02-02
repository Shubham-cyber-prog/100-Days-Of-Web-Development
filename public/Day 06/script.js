// ===== CONFIGURATION CONSTANTS =====
const TIMER_CONFIG = {
    easy: 20,
    medium: 15,
    hard: 10
};
const WARNING_TIME = 5;
const ANSWER_DELAY = 1500;
const PARTICLE_COUNT = 10;
const CONFETTI_COUNT = 100;
const CONFETTI_DURATION = 5000;

// ===== DOM HELPERS =====
const getDOMElement = (id) => document.getElementById(id);
const getQueryElement = (selector) => document.querySelector(selector);

// ===== DOM ELEMENTS =====
const startScreen = getDOMElement("start-screen");
const quizScreen = getDOMElement("quiz-screen");
const resultScreen = getDOMElement("result-screen");
const startButton = getDOMElement("start-btn");
const questionText = getDOMElement("question-text");
const answersContainer = getDOMElement("answer-container");
const currentQuestionSpan = getDOMElement("current-question");
const totalQuestionsSpan = getDOMElement("total-question");
const scoreSpan = getDOMElement("score");
const finalScoreSpan = getDOMElement("final-score");
const maxScoreSpan = getDOMElement("max-score");
const resultMessage = getDOMElement("result-message");
const restartButton = getDOMElement("restart-btn");
const progressBar = getDOMElement("progress");
const timerElement = getDOMElement("timer");
const timerContainer = getQueryElement(".timer-container");
const scoreCircle = getQueryElement(".score-circle");
const scoreText = getQueryElement(".score-text");
const correctAnswersElement = getDOMElement("correct-answers");
const incorrectAnswersElement = getDOMElement("incorrect-answers");
const accuracyElement = getDOMElement("accuracy");

const categoryButtons = document.querySelectorAll(".category-btn");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");

// ===== VALIDATE DOM =====
function validateDOM() {
    const required = [
        startScreen, quizScreen, resultScreen, startButton,
        questionText, answersContainer, scoreSpan,
        finalScoreSpan, maxScoreSpan, resultMessage,
        restartButton, progressBar, timerElement
    ];
    return required.every(el => el !== null);
}

// ===== QUIZ DATA =====
// (UNCHANGED – exactly your quizData object)
const quizData = { /* YOUR FULL QUIZ DATA – UNCHANGED */ };

// ===== QUIZ STATE =====
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let answersDisabled = false;
let selectedCategory = "general";
let selectedDifficulty = "medium";
let timer;
let timeLeft = 15;
let quizQuestions = [];

// ===== START QUIZ =====
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;

    scoreSpan.textContent = 0;

    quizQuestions = quizData[selectedCategory][selectedDifficulty];

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

// ===== RESTART QUIZ =====
function restartQuiz() {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");

    selectedCategory = "general";
    selectedDifficulty = "medium";
}

// ===== SHOW QUESTION =====
function showQuestion() {
    answersDisabled = false;
    clearInterval(timer);

    timeLeft = TIMER_CONFIG[selectedDifficulty];
    timerElement.textContent = timeLeft;
    timerContainer.classList.remove("warning");

    const q = quizQuestions[currentQuestionIndex];

    questionText.textContent = q.question;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    totalQuestionsSpan.textContent = quizQuestions.length;

    progressBar.style.width =
        ((currentQuestionIndex + 1) / quizQuestions.length) * 100 + "%";

    answersContainer.innerHTML = "";

    q.answers.forEach((ans) => {
        const btn = document.createElement("button");
        btn.textContent = ans.text;
        btn.className = "answer-btn";
        btn.dataset.correct = ans.correct;
        btn.onclick = selectAnswer;
        answersContainer.appendChild(btn);
    });

    startTimer();
}

// ===== TIMER =====
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= WARNING_TIME) {
            timerContainer.classList.add("warning");
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer();
        }
    }, 1000);
}

// ===== SELECT ANSWER =====
function selectAnswer(e) {
    if (answersDisabled) return;
    answersDisabled = true;
    clearInterval(timer);

    let correct = false;

    if (e && e.target) {
        correct = e.target.dataset.correct === "true";
    }

    [...answersContainer.children].forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === "true") btn.classList.add("correct");
        else btn.classList.add("incorrect");
    });

    if (correct) {
        score++;
        correctAnswers++;
        scoreSpan.textContent = score;
    } else {
        incorrectAnswers++;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, ANSWER_DELAY);
}

// ===== SHOW RESULTS =====
function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;
    maxScoreSpan.textContent = quizQuestions.length;

    const percent = Math.round((score / quizQuestions.length) * 100);
    scoreText.textContent = percent + "%";
    accuracyElement.textContent = percent + "%";

    correctAnswersElement.textContent = correctAnswers;
    incorrectAnswersElement.textContent = incorrectAnswers;

    if (percent >= 80) createConfetti();
}

// ===== CONFETTI =====
function createConfetti() {
    for (let i = 0; i < CONFETTI_COUNT; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "%";
        document.body.appendChild(c);
        setTimeout(() => c.remove(), CONFETTI_DURATION);
    }
}

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
    startButton.onclick = startQuiz;
    restartButton.onclick = restartQuiz;

    categoryButtons.forEach(btn => {
        btn.onclick = () => selectedCategory = btn.dataset.category;
    });

    difficultyButtons.forEach(btn => {
        btn.onclick = () => selectedDifficulty = btn.dataset.difficulty;
    });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
    if (validateDOM()) initializeEventListeners();
});

setInterval(() => {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerText = "✨";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 12 + "px";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}, 800);
