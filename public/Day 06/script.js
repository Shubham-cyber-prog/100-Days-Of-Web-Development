
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

// ===== DOM ELEMENTS WITH ERROR HANDLING =====
const getDOMElement = (id) => {
    const element = document.getElementById(id);
    if (!element) console.warn(`DOM element with id "${id}" not found`);
    return element;
};

const getQueryElement = (selector) => {
    const element = document.querySelector(selector);
    if (!element) console.warn(`DOM element with selector "${selector}" not found`);
    return element;
};

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

// ===== VALIDATION CHECK (FIXED) =====
const validateDOM = () => {
    const requiredElements = [
        startScreen, quizScreen, resultScreen, startButton, questionText,
        answersContainer, scoreSpan, finalScoreSpan, maxScoreSpan,
        resultMessage, restartButton, progressBar, timerElement,
        timerContainer, scoreCircle, scoreText
    ];

    const allValid = requiredElements.every(el => el !== null);

    if (!allValid) {
        console.warn(
            "Quiz initialization aborted: required DOM elements are missing."
        );
        return false; // Graceful early exit
    }

    return true;
};

// ===== QUIZ DATA =====
// (UNCHANGED — your full quizData object stays exactly the same)
const quizData = { /* ... unchanged quiz data ... */ };

// ===== QUIZ STATE =====
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
let selectedCategory = "general";
let selectedDifficulty = "medium";
let timer;
let timeLeft = 15;
let correctAnswers = 0;
let incorrectAnswers = 0;
let quizQuestions = [];

// ===== INITIALIZATION =====
const initializeEventListeners = () => {
    if (startButton) startButton.addEventListener("click", startQuiz);
    if (restartButton) restartButton.addEventListener("click", restartQuiz);

    categoryButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            categoryButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            selectedCategory = this.dataset.category;
        });
    });

    difficultyButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            difficultyButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            selectedDifficulty = this.dataset.difficulty;
        });
    });
};

// ===== START APPLICATION =====
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        if (validateDOM()) initializeEventListeners();
    });
} else {
    if (validateDOM()) initializeEventListeners();
}

        // ===== CONFIGURATION CONSTANTS =====
        const TIMER_CONFIG = {
            easy: 20,
            medium: 15,
            hard: 10
        };
        const WARNING_TIME = 5; // seconds
        const ANSWER_DELAY = 1500; // milliseconds before showing next question
        const PARTICLE_COUNT = 10;
        const CONFETTI_COUNT = 100;
        const CONFETTI_DURATION = 5000; // milliseconds

        // ===== DOM ELEMENTS WITH ERROR HANDLING =====
        const getDOMElement = (id) => {
            const element = document.getElementById(id);
            if (!element) console.warn(`DOM element with id "${id}" not found`);
            return element;
        };

        const getQueryElement = (selector) => {
            const element = document.querySelector(selector);
            if (!element) console.warn(`DOM element with selector "${selector}" not found`);
            return element;
        };

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

        // ===== VALIDATION CHECK =====
        const validateDOM = () => {
            const requiredElements = [
                startScreen, quizScreen, resultScreen, startButton, questionText,
                answersContainer, scoreSpan, finalScoreSpan, maxScoreSpan, resultMessage,
                restartButton, progressBar, timerElement, timerContainer, scoreCircle, scoreText
            ];

            const allValid = requiredElements.every(el => el !== null);
            if (!allValid) {
                // Graceful handling: Display an error message to the user
                const errorMessage = document.createElement("div");
                errorMessage.textContent = "Some required DOM elements are missing. Please check the HTML structure and try again.";
                errorMessage.style.cssText = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #ffdddd; color: #d8000c; padding: 20px; border: 1px solid #d8000c; border-radius: 5px; font-size: 16px; z-index: 1000;";
                document.body.appendChild(errorMessage);
            }
            return allValid;
        };

        
        const quizData = {
            general: {
                easy: [
                    {
                        question: "What is the capital of France?",
                        answers: [
                            { text: "London", correct: false },
                            { text: "Berlin", correct: false },
                            { text: "Paris", correct: true },
                            { text: "Madrid", correct: false }
                        ]
                    },
                    {
                        question: "Which planet is known as the Red Planet?",
                        answers: [
                            { text: "Venus", correct: false },
                            { text: "Mars", correct: true },
                            { text: "Jupiter", correct: false },
                            { text: "Saturn", correct: false }
                        ]
                    },
                    {
                        question: "What is the largest ocean on Earth?",
                        answers: [
                            { text: "Atlantic Ocean", correct: false },
                            { text: "Indian Ocean", correct: false },
                            { text: "Arctic Ocean", correct: false },
                            { text: "Pacific Ocean", correct: true }
                        ]
                    },
                    {
                        question: "Which of these is NOT a programming language?",
                        answers: [
                            { text: "Java", correct: false },
                            { text: "Python", correct: false },
                            { text: "Banana", correct: true },
                            { text: "JavaScript", correct: false }
                        ]
                    },
                    {
                        question: "What is the chemical symbol for gold?",
                        answers: [
                            { text: "Go", correct: false },
                            { text: "Gd", correct: false },
                            { text: "Au", correct: true },
                            { text: "Ag", correct: false }
                        ]
                    }
                ],
                medium: [
                    {
                        question: "Who painted the Mona Lisa?",
                        answers: [
                            { text: "Vincent van Gogh", correct: false },
                            { text: "Leonardo da Vinci", correct: true },
                            { text: "Pablo Picasso", correct: false },
                            { text: "Michelangelo", correct: false }
                        ]
                    },
                    {
                        question: "What is the smallest country in the world?",
                        answers: [
                            { text: "Monaco", correct: false },
                            { text: "San Marino", correct: false },
                            { text: "Vatican City", correct: true },
                            { text: "Liechtenstein", correct: false }
                        ]
                    },
                    {
                        question: "Which element has the atomic number 1?",
                        answers: [
                            { text: "Helium", correct: false },
                            { text: "Hydrogen", correct: true },
                            { text: "Lithium", correct: false },
                            { text: "Carbon", correct: false }
                        ]
                    },
                    {
                        question: "In which year did World War II end?",
                        answers: [
                            { text: "1943", correct: false },
                            { text: "1944", correct: false },
                            { text: "1945", correct: true },
                            { text: "1946", correct: false }
                        ]
                    },
                    {
                        question: "What is the largest mammal in the world?",
                        answers: [
                            { text: "African Elephant", correct: false },
                            { text: "Blue Whale", correct: true },
                            { text: "Giraffe", correct: false },
                            { text: "Polar Bear", correct: false }
                        ]
                    }
                ],
                hard: [
                    {
                        question: "What is the speed of light in vacuum?",
                        answers: [
                            { text: "299,792,458 m/s", correct: true },
                            { text: "199,792,458 m/s", correct: false },
                            { text: "399,792,458 m/s", correct: false },
                            { text: "99,792,458 m/s", correct: false }
                        ]
                    },
                    {
                        question: "Who wrote 'One Hundred Years of Solitude'?",
                        answers: [
                            { text: "Jorge Luis Borges", correct: false },
                            { text: "Gabriel García Márquez", correct: true },
                            { text: "Pablo Neruda", correct: false },
                            { text: "Isabel Allende", correct: false }
                        ]
                    },
                    {
                        question: "What is the capital of Kazakhstan?",
                        answers: [
                            { text: "Almaty", correct: false },
                            { text: "Nur-Sultan", correct: true },
                            { text: "Bishkek", correct: false },
                            { text: "Tashkent", correct: false }
                        ]
                    },
                    {
                        question: "Which philosopher said 'I think, therefore I am'?",
                        answers: [
                            { text: "Plato", correct: false },
                            { text: "Aristotle", correct: false },
                            { text: "René Descartes", correct: true },
                            { text: "Immanuel Kant", correct: false }
                        ]
                    },
                    {
                        question: "What is the most abundant element in the universe?",
                        answers: [
                            { text: "Oxygen", correct: false },
                            { text: "Carbon", correct: false },
                            { text: "Helium", correct: false },
                            { text: "Hydrogen", correct: true }
                        ]
                    }
                ]
            },
            science: {
                easy: [
                    {
                        question: "What is the powerhouse of the cell?",
                        answers: [
                            { text: "Nucleus", correct: false },
                            { text: "Mitochondria", correct: true },
                            { text: "Ribosome", correct: false },
                            { text: "Endoplasmic Reticulum", correct: false }
                        ]
                    },
                    {
                        question: "What is H2O?",
                        answers: [
                            { text: "Oxygen", correct: false },
                            { text: "Hydrogen", correct: false },
                            { text: "Water", correct: true },
                            { text: "Carbon Dioxide", correct: false }
                        ]
                    },
                    {
                        question: "How many bones are in the adult human body?",
                        answers: [
                            { text: "106", correct: false },
                            { text: "206", correct: true },
                            { text: "306", correct: false },
                            { text: "406", correct: false }
                        ]
                    },
                    {
                        question: "What is the largest organ in the human body?",
                        answers: [
                            { text: "Heart", correct: false },
                            { text: "Liver", correct: false },
                            { text: "Brain", correct: false },
                            { text: "Skin", correct: true }
                        ]
                    },
                    {
                        question: "What gas do plants absorb from the atmosphere?",
                        answers: [
                            { text: "Oxygen", correct: false },
                            { text: "Nitrogen", correct: false },
                            { text: "Carbon Dioxide", correct: true },
                            { text: "Hydrogen", correct: false }
                        ]
                    }
                ],
                medium: [
                    {
                        question: "What is the process by which plants make their own food?",
                        answers: [
                            { text: "Respiration", correct: false },
                            { text: "Photosynthesis", correct: true },
                            { text: "Transpiration", correct: false },
                            { text: "Germination", correct: false }
                        ]
                    },
                    {
                        question: "What is the smallest unit of matter?",
                        answers: [
                            { text: "Molecule", correct: false },
                            { text: "Atom", correct: true },
                            { text: "Electron", correct: false },
                            { text: "Proton", correct: false }
                        ]
                    },
                    {
                        question: "What is the force that opposes motion between two surfaces in contact?",
                        answers: [
                            { text: "Gravity", correct: false },
                            { text: "Friction", correct: true },
                            { text: "Magnetism", correct: false },
                            { text: "Tension", correct: false }
                        ]
                    },
                    {
                        question: "What is the study of earthquakes called?",
                        answers: [
                            { text: "Meteorology", correct: false },
                            { text: "Seismology", correct: true },
                            { text: "Geology", correct: false },
                            { text: "Volcanology", correct: false }
                        ]
                    },
                    {
                        question: "What is the chemical formula for table salt?",
                        answers: [
                            { text: "NaCl", correct: true },
                            { text: "KCl", correct: false },
                            { text: "CaCl2", correct: false },
                            { text: "MgCl2", correct: false }
                        ]
                    }
                ],
                hard: [
                    {
                        question: "What is the name of the process by which a solid changes directly into a gas?",
                        answers: [
                            { text: "Evaporation", correct: false },
                            { text: "Sublimation", correct: true },
                            { text: "Condensation", correct: false },
                            { text: "Deposition", correct: false }
                        ]
                    },
                    {
                        question: "What is the name of the particle that carries the electromagnetic force?",
                        answers: [
                            { text: "Electron", correct: false },
                            { text: "Proton", correct: false },
                            { text: "Photon", correct: true },
                            { text: "Neutron", correct: false }
                        ]
                    },
                    {
                        question: "What is the process by which DNA makes an exact copy of itself called?",
                        answers: [
                            { text: "Transcription", correct: false },
                            { text: "Translation", correct: false },
                            { text: "Replication", correct: true },
                            { text: "Mutation", correct: false }
                        ]
                    },
                    {
                        question: "What is the name of the theory that explains the origin of the universe?",
                        answers: [
                            { text: "Theory of Relativity", correct: false },
                            { text: "Quantum Theory", correct: false },
                            { text: "Big Bang Theory", correct: true },
                            { text: "String Theory", correct: false }
                        ]
                    },
                    {
                        question: "What is the name of the process by which plants lose water through their leaves?",
                        answers: [
                            { text: "Transpiration", correct: true },
                            { text: "Respiration", correct: false },
                            { text: "Photosynthesis", correct: false },
                            { text: "Germination", correct: false }
                        ]
                    }
                ]
            },
            history: {
                easy: [
                    {
                        question: "Who was the first President of the United States?",
                        answers: [
                            { text: "Thomas Jefferson", correct: false },
                            { text: "George Washington", correct: true },
                            { text: "John Adams", correct: false },
                            { text: "Benjamin Franklin", correct: false }
                        ]
                    },
                    {
                        question: "In which year did Christopher Columbus reach the Americas?",
                        answers: [
                            { text: "1490", correct: false },
                            { text: "1491", correct: false },
                            { text: "1492", correct: true },
                            { text: "1493", correct: false }
                        ]
                    },
                    {
                        question: "Who was the leader of the Civil Rights Movement in the United States?",
                        answers: [
                            { text: "Malcolm X", correct: false },
                            { text: "Martin Luther King Jr.", correct: true },
                            { text: "Rosa Parks", correct: false },
                            { text: "Nelson Mandela", correct: false }
                        ]
                    },
                    {
                        question: "Which ancient wonder of the world still stands today?",
                        answers: [
                            { text: "Hanging Gardens of Babylon", correct: false },
                            { text: "Great Pyramid of Giza", correct: true },
                            { text: "Colossus of Rhodes", correct: false },
                            { text: "Lighthouse of Alexandria", correct: false }
                        ]
                    },
                    {
                        question: "Who was known as the 'Iron Lady'?",
                        answers: [
                            { text: "Queen Elizabeth II", correct: false },
                            { text: "Margaret Thatcher", correct: true },
                            { text: "Angela Merkel", correct: false },
                            { text: "Hillary Clinton", correct: false }
                        ]
                    }
                ],
                medium: [
                    {
                        question: "In which year did the Berlin Wall fall?",
                        answers: [
                            { text: "1987", correct: false },
                            { text: "1988", correct: false },
                            { text: "1989", correct: true },
                            { text: "1990", correct: false }
                        ]
                    },
                    {
                        question: "Who was the first Emperor of Rome?",
                        answers: [
                            { text: "Julius Caesar", correct: false },
                            { text: "Augustus", correct: true },
                            { text: "Nero", correct: false },
                            { text: "Marcus Aurelius", correct: false }
                        ]
                    },
                    {
                        question: "Which treaty ended World War I?",
                        answers: [
                            { text: "Treaty of Versailles", correct: true },
                            { text: "Treaty of Paris", correct: false },
                            { text: "Treaty of Tordesillas", correct: false },
                            { text: "Treaty of Westphalia", correct: false }
                        ]
                    },
                    {
                        question: "Who was the first female Prime Minister of the United Kingdom?",
                        answers: [
                            { text: "Theresa May", correct: false },
                            { text: "Margaret Thatcher", correct: true },
                            { text: "Queen Victoria", correct: false },
                            { text: "Elizabeth I", correct: false }
                        ]
                    },
                    {
                        question: "Which ancient civilization built Machu Picchu?",
                        answers: [
                            { text: "Maya", correct: false },
                            { text: "Aztec", correct: false },
                            { text: "Inca", correct: true },
                            { text: "Olmec", correct: false }
                        ]
                    }
                ],
                hard: [
                    {
                        question: "Who was the Byzantine Emperor when Constantinople fell to the Ottoman Empire in 1453?",
                        answers: [
                            { text: "Justinian I", correct: false },
                            { text: "Constantine XI", correct: true },
                            { text: "Leo III", correct: false },
                            { text: "Basil II", correct: false }
                        ]
                    },
                    {
                        question: "Which treaty ended the Thirty Years' War in 1648?",
                        answers: [
                            { text: "Treaty of Westphalia", correct: true },
                            { text: "Treaty of Versailles", correct: false },
                            { text: "Treaty of Utrecht", correct: false },
                            { text: "Treaty of Nystad", correct: false }
                        ]
                    },
                    {
                        question: "Who was the leader of the Bolshevik Revolution in Russia?",
                        answers: [
                            { text: "Joseph Stalin", correct: false },
                            { text: "Leon Trotsky", correct: false },
                            { text: "Vladimir Lenin", correct: true },
                            { text: "Mikhail Gorbachev", correct: false }
                        ]
                    },
                    {
                        question: "Which dynasty ruled China during the construction of the Great Wall?",
                        answers: [
                            { text: "Han Dynasty", correct: false },
                            { text: "Tang Dynasty", correct: false },
                            { text: "Ming Dynasty", correct: true },
                            { text: "Qing Dynasty", correct: false }
                        ]
                    },
                    {
                        question: "Who was the first Emperor of the Mughal Empire in India?",
                        answers: [
                            { text: "Akbar", correct: false },
                            { text: "Shah Jahan", correct: false },
                            { text: "Babur", correct: true },
                            { text: "Aurangzeb", correct: false }
                        ]
                    }
                ]
            },
            geography: {
                easy: [
                    {
                        question: "What is the longest river in the world?",
                        answers: [
                            { text: "Amazon River", correct: false },
                            { text: "Nile River", correct: true },
                            { text: "Mississippi River", correct: false },
                            { text: "Yangtze River", correct: false }
                        ]
                    },
                    {
                        question: "Which is the largest continent by area?",
                        answers: [
                            { text: "Africa", correct: false },
                            { text: "Asia", correct: true },
                            { text: "North America", correct: false },
                            { text: "Antarctica", correct: false }
                        ]
                    },
                    {
                        question: "What is the capital of Australia?",
                        answers: [
                            { text: "Sydney", correct: false },
                            { text: "Melbourne", correct: false },
                            { text: "Canberra", correct: true },
                            { text: "Brisbane", correct: false }
                        ]
                    },
                    {
                        question: "Which country has the most natural lakes?",
                        answers: [
                            { text: "Russia", correct: false },
                            { text: "Canada", correct: true },
                            { text: "Finland", correct: false },
                            { text: "USA", correct: false }
                        ]
                    },
                    {
                        question: "What is the smallest continent?",
                        answers: [
                            { text: "Europe", correct: false },
                            { text: "Australia", correct: true },
                            { text: "Antarctica", correct: false },
                            { text: "South America", correct: false }
                        ]
                    }
                ],
                medium: [
                    {
                        question: "What is the deepest point in the ocean?",
                        answers: [
                            { text: "Java Trench", correct: false },
                            { text: "Puerto Rico Trench", correct: false },
                            { text: "Mariana Trench", correct: true },
                            { text: "Tonga Trench", correct: false }
                        ]
                    },
                    {
                        question: "Which desert is the largest in the world?",
                        answers: [
                            { text: "Sahara Desert", correct: false },
                            { text: "Arabian Desert", correct: false },
                            { text: "Gobi Desert", correct: false },
                            { text: "Antarctic Polar Desert", correct: true }
                        ]
                    },
                    {
                        question: "What is the capital of Brazil?",
                        answers: [
                            { text: "Rio de Janeiro", correct: false },
                            { text: "São Paulo", correct: false },
                            { text: "Brasília", correct: true },
                            { text: "Salvador", correct: false }
                        ]
                    },
                    {
                        question: "Which country has the most time zones?",
                        answers: [
                            { text: "Russia", correct: false },
                            { text: "USA", correct: false },
                            { text: "France", correct: true },
                            { text: "China", correct: false }
                        ]
                    },
                    {
                        question: "What is the longest mountain range in the world?",
                        answers: [
                            { text: "Himalayas", correct: false },
                            { text: "Andes", correct: true },
                            { text: "Rocky Mountains", correct: false },
                            { text: "Alps", correct: false }
                        ]
                    }
                ],
                hard: [
                    {
                        question: "What is the name of the longest river in Asia?",
                        answers: [
                            { text: "Yangtze River", correct: true },
                            { text: "Yellow River", correct: false },
                            { text: "Mekong River", correct: false },
                            { text: "Ganges River", correct: false }
                        ]
                    },
                    {
                        question: "Which country has the most islands in the world?",
                        answers: [
                            { text: "Indonesia", correct: false },
                            { text: "Japan", correct: false },
                            { text: "Philippines", correct: false },
                            { text: "Sweden", correct: true }
                        ]
                    },
                    {
                        question: "What is the name of the largest hot desert in the world?",
                        answers: [
                            { text: "Sahara Desert", correct: true },
                            { text: "Arabian Desert", correct: false },
                            { text: "Gobi Desert", correct: false },
                            { text: "Kalahari Desert", correct: false }
                        ]
                    },
                    {
                        question: "Which country is known as the 'Land of a Thousand Lakes'?",
                        answers: [
                            { text: "Canada", correct: false },
                            { text: "Finland", correct: true },
                            { text: "Norway", correct: false },
                            { text: "Sweden", correct: false }
                        ]
                    },
                    {
                        question: "What is the name of the largest canyon in the world?",
                        answers: [
                            { text: "Grand Canyon", correct: false },
                            { text: "Fish River Canyon", correct: false },
                            { text: "Yarlung Tsangpo Grand Canyon", correct: true },
                            { text: "Canyonlands", correct: false }
                        ]
                    }
                ]
            }
        };

        // Quiz state variables
        let currentQuestionIndex = 0;
        let score = 0;
        let answersDisabled = false;
        let selectedCategory = "general";
        let selectedDifficulty = "medium";
        let timer;
        let timeLeft = 15;
        let correctAnswers = 0;
        let incorrectAnswers = 0;
        let quizQuestions = [];

        function startQuiz() {
            // Reset variables
            currentQuestionIndex = 0;
            score = 0;
            correctAnswers = 0;
            incorrectAnswers = 0;
            if (scoreSpan) scoreSpan.textContent = 0;

            // Get questions based on selected category and difficulty
            quizQuestions = quizData[selectedCategory][selectedDifficulty];

            // Update UI
            if (startScreen) startScreen.classList.remove("active");
            if (quizScreen) quizScreen.classList.add("active");

            // Show first question
            showQuestion();
        }

        function restartQuiz() {
            if (resultScreen) resultScreen.classList.remove("active");
            if (startScreen) startScreen.classList.add("active");
            
            // Reset selections
            categoryButtons.forEach(btn => {
                if (btn.dataset.category === "general") {
                    btn.classList.add("active");
                    btn.setAttribute("aria-pressed", "true");
                } else {
                    btn.classList.remove("active");
                    btn.setAttribute("aria-pressed", "false");
                }
            });
            
            difficultyButtons.forEach(btn => {
                if (btn.dataset.difficulty === "medium") {
                    btn.classList.add("active");
                    btn.setAttribute("aria-pressed", "true");
                } else {
                    btn.classList.remove("active");
                    btn.setAttribute("aria-pressed", "false");
                }
            });
            
            selectedCategory = "general";
            selectedDifficulty = "medium";
        }

        // ===== INITIALIZE EVENT LISTENERS =====
        const initializeEventListeners = () => {
            if (startButton) {
                startButton.addEventListener("click", startQuiz);
            }
            if (restartButton) {
                restartButton.addEventListener("click", restartQuiz);
            }

            // Category selection
            if (categoryButtons && categoryButtons.length) {
                categoryButtons.forEach(button => {
                    button.addEventListener("click", function() {
                        categoryButtons.forEach(btn => {
                            btn.classList.remove("active");
                            btn.setAttribute("aria-pressed", "false");
                        });
                        this.classList.add("active");
                        this.setAttribute("aria-pressed", "true");
                        selectedCategory = this.dataset.category;
                    });
                });
            }

            // Difficulty selection
            if (difficultyButtons && difficultyButtons.length) {
                difficultyButtons.forEach(button => {
                    button.addEventListener("click", function() {
                        difficultyButtons.forEach(btn => {
                            btn.classList.remove("active");
                            btn.setAttribute("aria-pressed", "false");
                        });
                        this.classList.add("active");
                        this.setAttribute("aria-pressed", "true");
                        selectedDifficulty = this.dataset.difficulty;
                    });
                });
            }
        };

        // ===== START APPLICATION =====
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => {
                if (validateDOM()) {
                    initializeEventListeners();
                }
            });
        } else {
            if (validateDOM()) {
                initializeEventListeners();
            }
        }

        function showQuestion() {
            // Reset state
            answersDisabled = false;
            clearInterval(timer);
            timeLeft = TIMER_CONFIG[selectedDifficulty] || TIMER_CONFIG.medium;
            if (timerElement) timerElement.textContent = timeLeft;
            if (timerContainer) timerContainer.classList.remove("warning");

            const currentQuestion = quizQuestions[currentQuestionIndex];

            // Update question number
            if (currentQuestionSpan) currentQuestionSpan.textContent = currentQuestionIndex + 1;
            if (totalQuestionsSpan) totalQuestionsSpan.textContent = quizQuestions.length;

            // Update progress bar
            const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
            if (progressBar) progressBar.style.width = progressPercent + "%";
            
            // Update ARIA progressbar
            if (quizScreen) quizScreen.setAttribute("aria-valuenow", progressPercent);

            // Display question
            if (questionText) questionText.textContent = currentQuestion.question;

            // Clear and populate answer buttons
            if (answersContainer) {
                answersContainer.innerHTML = "";

                currentQuestion.answers.forEach((answer, index) => {
                    const button = document.createElement("button");
                    button.textContent = answer.text;
                    button.classList.add("answer-btn");
                    button.dataset.correct = answer.correct;
                    button.addEventListener("click", selectAnswer);
                    button.setAttribute("aria-label", `Answer option ${index + 1}: ${answer.text}`);
                    
                    // Add animation delay for staggered appearance
                    button.style.animationDelay = `${index * 0.1}s`;
                    button.style.animation = "fadeIn 0.5s ease-in-out forwards";
                    
                    answersContainer.appendChild(button);
                });
            }

            // Start timer
            startTimer();
        }

        function startTimer() {
            timer = setInterval(() => {
                timeLeft--;
                if (timerElement) timerElement.textContent = timeLeft;

                if (timeLeft <= WARNING_TIME && timerContainer) {
                    timerContainer.classList.add("warning");
                }

                if (timeLeft <= 0) {
                    clearInterval(timer);
                    selectAnswer({ target: null });
                }
            }, 1000);
        }

        function selectAnswer(event) {
            // Prevent multiple selections
            if (answersDisabled) return;
            answersDisabled = true;
            clearInterval(timer);

            let selectedButton;
            let isCorrect;

            if (event && event.target) {
                selectedButton = event.target;
                isCorrect = selectedButton.dataset.correct === "true";
            } else {
                // Time ran out, no answer selected
                isCorrect = false;
            }

            // Show correct and incorrect answers
            if (answersContainer) {
                Array.from(answersContainer.children).forEach(button => {
                    button.disabled = true;
                    if (button.dataset.correct === "true") {
                        button.classList.add("correct");
                        button.setAttribute("aria-label", button.getAttribute("aria-label") + " (Correct Answer)");
                    } else if (button === selectedButton) {
                        button.classList.add("incorrect");
                        button.setAttribute("aria-label", button.getAttribute("aria-label") + " (Your Answer - Incorrect)");
                    }
                });
            }

            // Update score and statistics
            if (isCorrect) {
                score++;
                correctAnswers++;
                if (scoreSpan) scoreSpan.textContent = score;
                createParticles(selectedButton);
            } else {
                incorrectAnswers++;
            }

            // Move to next question or show results
            setTimeout(() => {
                currentQuestionIndex++;

                if (currentQuestionIndex < quizQuestions.length) {
                    showQuestion();
                } else {
                    showResults();
                }
            }, ANSWER_DELAY);
        }

        function createParticles(element) {
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const particle = document.createElement("div");
                particle.classList.add("particle");
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                document.body.appendChild(particle);

                // Cleanup after animation completes
                const timeoutId = setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 1000);
                
                // Store timeout ID for potential cleanup on unmount
                particle.dataset.timeoutId = timeoutId;
            }
        }

        function showResults() {
            // Switch screens
            if (quizScreen) quizScreen.classList.remove("active");
            if (resultScreen) resultScreen.classList.add("active");

            // Update score display
            if (finalScoreSpan) finalScoreSpan.textContent = score;
            if (maxScoreSpan) maxScoreSpan.textContent = quizQuestions.length;

            // Calculate percentage
            const percentage = Math.round((score / quizQuestions.length) * 100);
            
            // Update circular progress
            if (scoreCircle) {
                scoreCircle.style.setProperty("--score", percentage);
                scoreCircle.setAttribute("aria-label", `Your score: ${percentage}%`);
            }
            if (scoreText) scoreText.textContent = `${percentage}%`;

            // Update statistics
            if (correctAnswersElement) correctAnswersElement.textContent = correctAnswers;
            if (incorrectAnswersElement) incorrectAnswersElement.textContent = incorrectAnswers;
            if (accuracyElement) accuracyElement.textContent = `${percentage}%`;

            // Update result message based on percentage
            let message = "Keep studying! You'll get better!";
            if (percentage === 100) {
                message = "Perfect! You're a genius!";
                createConfetti();
            } else if (percentage >= 80) {
                message = "Excellent work! You know your stuff!";
                createConfetti();
            } else if (percentage >= 60) {
                message = "Good job! Keep learning!";
            } else if (percentage >= 40) {
                message = "Not bad! Try again to improve!";
            }
            
            if (resultMessage) {
                resultMessage.textContent = message;
                resultMessage.setAttribute("aria-live", "polite");
            }
        }

        function createConfetti() {
            const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722"];
            const timeoutIds = [];
            
            for (let i = 0; i < CONFETTI_COUNT; i++) {
                const timeoutId = setTimeout(() => {
                    const confetti = document.createElement("div");
                    confetti.classList.add("confetti");
                    confetti.style.left = `${Math.random() * 100}%`;
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
                    confetti.style.opacity = Math.random();
                    document.body.appendChild(confetti);

                    const cleanupId = setTimeout(() => {
                        if (confetti.parentNode) {
                            confetti.remove();
                        }
                    }, CONFETTI_DURATION);
                    
                    confetti.dataset.cleanupId = cleanupId;
                }, i * 30);
                
                timeoutIds.push(timeoutId);
            }
        }

