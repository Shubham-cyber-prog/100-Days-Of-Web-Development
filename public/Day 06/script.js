
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
const ANSWER_DELAY = 1200;


// ================= QUIZ DATA =================
// IMPORTANT: Must contain all categories + levels
const quizData = {
    general: {
        easy: [
            {
                question: "Capital of India?",
                answers: [
                    { text: "Delhi", correct: true },
                    { text: "Mumbai", correct: false },
                    { text: "Pune", correct: false },
                    { text: "Chennai", correct: false }
                ]
            }
        ],
        medium: [
            {
                question: "Which planet is red?",
                answers: [
                    { text: "Mars", correct: true },
                    { text: "Venus", correct: false },
                    { text: "Jupiter", correct: false },
                    { text: "Saturn", correct: false }
                ]
            }
        ],
        hard: [
            {
                question: "HTML stands for?",
                answers: [
                    { text: "Hyper Text Markup Language", correct: true },
                    { text: "High Machine Text Language", correct: false },
                    { text: "None", correct: false },
                    { text: "Hyper Tool ML", correct: false }
                ]
            }
        ]
    },

    science: {
        easy: [
            {
                question: "Water formula?",
                answers: [
                    { text: "H2O", correct: true },
                    { text: "CO2", correct: false },
                    { text: "O2", correct: false },
                    { text: "NaCl", correct: false }
                ]
            }
        ],
        medium: [
            {
                question: "Sun is a?",
                answers: [
                    { text: "Star", correct: true },
                    { text: "Planet", correct: false },
                    { text: "Moon", correct: false },
                    { text: "Asteroid", correct: false }
                ]
            }
        ],
        hard: [
            {
                question: "Speed of light?",
                answers: [
                    { text: "3x10^8 m/s", correct: true },
                    { text: "3x10^6 m/s", correct: false },
                    { text: "300 m/s", correct: false },
                    { text: "150 km/s", correct: false }
                ]
            }
        ]
    },

    history: {
        easy: [
            {
                question: "Father of Nation?",
                answers: [
                    { text: "Gandhi", correct: true },
                    { text: "Nehru", correct: false },
                    { text: "Patel", correct: false },
                    { text: "Bose", correct: false }
                ]
            }
        ],
        medium: [
            {
                question: "1947 is related to?",
                answers: [
                    { text: "Independence", correct: true },
                    { text: "War", correct: false },
                    { text: "Census", correct: false },
                    { text: "Election", correct: false }
                ]
            }
        ],
        hard: [
            {
                question: "Mughal founder?",
                answers: [
                    { text: "Babur", correct: true },
                    { text: "Akbar", correct: false },
                    { text: "Humayun", correct: false },
                    { text: "Aurangzeb", correct: false }
                ]
            }
        ]
    },

    geography: {
        easy: [
            {
                question: "Largest ocean?",
                answers: [
                    { text: "Pacific", correct: true },
                    { text: "Indian", correct: false },
                    { text: "Atlantic", correct: false },
                    { text: "Arctic", correct: false }
                ]
            }
        ],
        medium: [
            {
                question: "Mount Everest is in?",
                answers: [
                    { text: "Nepal", correct: true },
                    { text: "India", correct: false },
                    { text: "China", correct: false },
                    { text: "Bhutan", correct: false }
                ]
            }
        ],
        hard: [
            {
                question: "Sahara is in?",
                answers: [
                    { text: "Africa", correct: true },
                    { text: "Asia", correct: false },
                    { text: "Europe", correct: false },
                    { text: "Australia", correct: false }
                ]
            }
        ]
    }
};


// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", () => {

    // Elements
    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");

    const startScreen = document.getElementById("start-screen");
    const quizScreen = document.getElementById("quiz-screen");
    const resultScreen = document.getElementById("result-screen");

    const questionText = document.getElementById("question-text");
    const answersBox = document.getElementById("answer-container");

    const timerEl = document.getElementById("timer");
    const scoreEl = document.getElementById("score");

    const curQ = document.getElementById("current-question");
    const totalQ = document.getElementById("total-question");

    const progress = document.getElementById("progress");

    const finalScore = document.getElementById("final-score");
    const maxScore = document.getElementById("max-score");

    const categoryBtns = document.querySelectorAll(".category-btn");
    const difficultyBtns = document.querySelectorAll(".difficulty-btn");


    // State
    let current = 0;
    let score = 0;
    let timer;
    let timeLeft;

    let category = "general";
    let level = "medium";


    // ================= CATEGORY =================
    categoryBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            categoryBtns.forEach(b =>
                b.classList.remove("active")
            );

            btn.classList.add("active");

            category = btn.dataset.category;

        });

    });


    // ================= DIFFICULTY =================
    difficultyBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            difficultyBtns.forEach(b =>
                b.classList.remove("active")
            );

            btn.classList.add("active");

            level = btn.dataset.difficulty;

        });

    });


    // ================= START =================
    startBtn.addEventListener("click", startQuiz);


    function startQuiz() {

        const data =
            quizData[category][level];

        if (!data) {
            alert("No questions available!");
            return;
        }

        current = 0;
        score = 0;

        scoreEl.textContent = 0;

        startScreen.classList.remove("active");
        quizScreen.classList.add("active");

        showQuestion();

    }


    // ================= QUESTION =================
    function showQuestion() {

        clearInterval(timer);

        const q =
            quizData[category][level][current];

        questionText.textContent = q.question;

        curQ.textContent = current + 1;
        totalQ.textContent =
            quizData[category][level].length;

        progress.style.width =
            ((current + 1) /
            quizData[category][level].length) * 100 + "%";

        answersBox.innerHTML = "";


        q.answers.forEach(ans => {

            const btn = document.createElement("button");

            btn.className = "answer-btn";

            btn.textContent = ans.text;

            btn.dataset.correct = ans.correct;

            btn.addEventListener("click", checkAnswer);

            answersBox.appendChild(btn);

        });


        startTimer();

    }


    // ================= TIMER =================
    function startTimer() {

        timeLeft = TIMER_CONFIG[level];

        timerEl.textContent = timeLeft;

        timer = setInterval(() => {

            timeLeft--;

            timerEl.textContent = timeLeft;

            if (timeLeft <= 0) {

                clearInterval(timer);

                nextQuestion();

            }

        }, 1000);

    }


    // ================= ANSWER =================
    function checkAnswer(e) {

        clearInterval(timer);

        const correct =
            e.target.dataset.correct === "true";

        if (correct) {
            score++;
            scoreEl.textContent = score;
        }

        document
            .querySelectorAll(".answer-btn")
            .forEach(btn => {

                btn.disabled = true;

                if (btn.dataset.correct === "true") {
                    btn.classList.add("correct");
                } else {
                    btn.classList.add("incorrect");
                }

            });


        setTimeout(nextQuestion, ANSWER_DELAY);

    }


    // ================= NEXT =================
    function nextQuestion() {

        current++;

        if (current <
            quizData[category][level].length) {

            showQuestion();

        } else {

            showResult();

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
    }


    // ================= RESULT =================
  function showResult() {

    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    const total =
        quizData[category][level].length;

    // Scores
    finalScore.textContent = score;
    maxScore.textContent = total;

    const percent =
        Math.round((score / total) * 100);

    // Percentage text
    document.querySelector(".score-text").textContent =
        percent + "%";

    // Circle progress
    document.querySelector(".score-circle")
        .style.setProperty("--score", percent);

    // Stats
    document.getElementById("correct-answers").textContent =
        score;

    document.getElementById("incorrect-answers").textContent =
        total - score;

    document.getElementById("accuracy").textContent =
        percent + "%";

    // Message
    const msg = document.getElementById("result-message");

    if (percent >= 80) {
        msg.textContent = "Excellent! 🎉";
    } else if (percent >= 50) {
        msg.textContent = "Good Job 👍";
    } else {
        msg.textContent = "Keep Practicing 💪";
    }

}



    // ================= RESTART =================
    restartBtn.addEventListener("click", () => {

        resultScreen.classList.remove("active");
        startScreen.classList.add("active");

    });

});
