// ================= CONFIG =================
const TIMER_CONFIG = {
    easy: 20,
    medium: 15,
    hard: 10
};

const WARNING_TIME = 5;
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
