// ===== CONFIGURATION CONSTANTS =====
const TIMER_CONFIG = {
    easy: 20,
    medium: 15,
    hard: 10
};

const WARNING_TIME = 5;
const ANSWER_DELAY = 1200;
const CONFETTI_COUNT = 100;
const CONFETTI_DURATION = 5000;

// ===== QUIZ DATA =====
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

// ===== DOM READY =====
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
    const timerContainer = document.querySelector(".timer-container");
    const scoreEl = document.getElementById("score");
    
    const curQ = document.getElementById("current-question");
    const totalQ = document.getElementById("total-question");
    
    const progress = document.getElementById("progress");
    
    const finalScore = document.getElementById("final-score");
    const maxScore = document.getElementById("max-score");
    const resultMessage = document.getElementById("result-message");
    
    const categoryBtns = document.querySelectorAll(".category-btn");
    const difficultyBtns = document.querySelectorAll(".difficulty-btn");
    
    const scoreCircle = document.querySelector(".score-circle");
    const scoreText = document.querySelector(".score-text");
    const correctAnswers = document.getElementById("correct-answers");
    const incorrectAnswers = document.getElementById("incorrect-answers");
    const accuracy = document.getElementById("accuracy");
    
    // State
    let current = 0;
    let score = 0;
    let correctCount = 0;
    let timer;
    let timeLeft;
    
    let category = "general";
    let level = "medium";
    
    // ===== CATEGORY SELECTION =====
    categoryBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            category = btn.dataset.category;
        });
    });
    
    // ===== DIFFICULTY SELECTION =====
    difficultyBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            difficultyBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            level = btn.dataset.difficulty;
        });
    });
    
    // ===== START QUIZ =====
    startBtn.addEventListener("click", startQuiz);
    
    function startQuiz() {
        const data = quizData[category][level];
        
        if (!data || data.length === 0) {
            alert("No questions available for this category!");
            return;
        }
        
        current = 0;
        score = 0;
        correctCount = 0;
        
        scoreEl.textContent = "0";
        
        startScreen.classList.remove("active");
        quizScreen.classList.add("active");
        
        showQuestion();
    }
    
    // ===== SHOW QUESTION =====
    function showQuestion() {
        clearInterval(timer);
        
        const questions = quizData[category][level];
        const q = questions[current];
        
        questionText.textContent = q.question;
        
        curQ.textContent = current + 1;
        totalQ.textContent = questions.length;
        
        progress.style.width = ((current + 1) / questions.length) * 100 + "%";
        
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
    
    // ===== START TIMER =====
    function startTimer() {
        timeLeft = TIMER_CONFIG[level];
        timerEl.textContent = timeLeft;
        timerContainer.classList.remove("warning");
        
        timer = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft;
            
            if (timeLeft <= WARNING_TIME) {
                timerContainer.classList.add("warning");
            }
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                handleTimeout();
            }
        }, 1000);
    }
    
    // ===== HANDLE TIMEOUT =====
    function handleTimeout() {
        document.querySelectorAll(".answer-btn").forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.correct === "true") {
                btn.classList.add("correct");
            }
        });
        
        incorrectCount++;
        
        setTimeout(nextQuestion, ANSWER_DELAY);
    }
    
    // ===== CHECK ANSWER =====
    function checkAnswer(e) {
        clearInterval(timer);
        
        const correct = e.target.dataset.correct === "true";
        
        document.querySelectorAll(".answer-btn").forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.correct === "true") {
                btn.classList.add("correct");
            } else if (btn === e.target && !correct) {
                btn.classList.add("incorrect");
            }
        });
        
        if (correct) {
            score++;
            correctCount++;
            scoreEl.textContent = score;
            e.target.classList.add("correct");
        } else {
            e.target.classList.add("incorrect");
        }
        
        setTimeout(nextQuestion, ANSWER_DELAY);
    }
    
    // ===== NEXT QUESTION =====
    function nextQuestion() {
        current++;
        
        if (current < quizData[category][level].length) {
            showQuestion();
        } else {
            showResult();
        }
    }
    
    // ===== SHOW RESULT =====
    function showResult() {
        quizScreen.classList.remove("active");
        resultScreen.classList.add("active");
        
        const total = quizData[category][level].length;
        
        // Scores
        finalScore.textContent = score;
        maxScore.textContent = total;
        
        const percent = Math.round((score / total) * 100);
        
        // Percentage text
        if (scoreText) scoreText.textContent = percent + "%";
        
        // Circle progress
        if (scoreCircle) {
            scoreCircle.style.setProperty("--score", percent);
        }
        
        // Stats
        if (correctAnswers) correctAnswers.textContent = correctCount;
        if (incorrectAnswers) incorrectAnswers.textContent = total - correctCount;
        if (accuracy) accuracy.textContent = percent + "%";
        
        // Message
        if (resultMessage) {
            if (percent >= 80) {
                resultMessage.textContent = "Excellent! 🎉";
                createConfetti();
            } else if (percent >= 50) {
                resultMessage.textContent = "Good Job 👍";
            } else {
                resultMessage.textContent = "Keep Practicing 💪";
            }
        }
    }
    
    // ===== CREATE CONFETTI =====
    function createConfetti() {
        for (let i = 0; i < CONFETTI_COUNT; i++) {
            setTimeout(() => {
                const confetti = document.createElement("div");
                confetti.className = "confetti";
                confetti.style.left = Math.random() * 100 + "%";
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), CONFETTI_DURATION);
            }, i * 30);
        }
    }
    
    // ===== RESTART QUIZ =====
    restartBtn.addEventListener("click", () => {
        // Clear any existing confetti
        document.querySelectorAll(".confetti").forEach(c => c.remove());
        
        resultScreen.classList.remove("active");
        startScreen.classList.add("active");
    });
    
    // ===== DECORATIVE ELEMENTS (Optional) =====
    setInterval(() => {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        sparkle.innerText = "✨";
        sparkle.style.left = Math.random() * 100 + "vw";
        sparkle.style.top = Math.random() * 100 + "vh";
        sparkle.style.fontSize = (Math.random() * 20 + 10) + "px";
        sparkle.style.position = "fixed";
        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = "9999";
        sparkle.style.animation = "fadeOut 3s forwards";
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 3000);
    }, 800);
});