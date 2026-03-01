import { db } from '../firebase-config.js';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

const quizzes = [
  {
    id: 'html-basics',
    title: 'HTML Basics',
    description: 'Test your knowledge of fundamental HTML concepts',
    icon: '📄',
    difficulty: 'Beginner',
    questions: [
      {
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Hyper Transfer Markup Language',
          'Home Tool Markup Language'
        ],
        correct: 0
      },
      {
        question: 'Which tag is used to create a hyperlink?',
        options: ['<link>', '<a>', '<href>', '<url>'],
        correct: 1
      },
      {
        question: 'Which HTML element is used to specify a footer for a document?',
        options: ['<section>', '<bottom>', '<footer>', '<end>'],
        correct: 2
      },
      {
        question: 'What is the correct HTML element for the largest heading?',
        options: ['<head>', '<h6>', '<h1>', '<heading>'],
        correct: 2
      },
      {
        question: 'Which attribute specifies an alternate text for an image?',
        options: ['title', 'alt', 'src', 'longdesc'],
        correct: 1
      }
    ]
  },
  {
    id: 'css-basics',
    title: 'CSS Fundamentals',
    description: 'Master the basics of CSS styling',
    icon: '🎨',
    difficulty: 'Beginner',
    questions: [
      {
        question: 'What does CSS stand for?',
        options: [
          'Creative Style Sheets',
          'Cascading Style Sheets',
          'Computer Style Sheets',
          'Colorful Style Sheets'
        ],
        correct: 1
      },
      {
        question: 'Which CSS property controls the text size?',
        options: ['font-style', 'text-style', 'font-size', 'text-size'],
        correct: 2
      },
      {
        question: 'How do you select an element with id "demo"?',
        options: ['.demo', '#demo', 'demo', '*demo'],
        correct: 1
      },
      {
        question: 'Which property is used to change the background color?',
        options: ['color', 'bgcolor', 'background-color', 'bg-color'],
        correct: 2
      },
      {
        question: 'How do you make each word start with a capital letter?',
        options: ['text-transform: uppercase', 'text-transform: capitalize', 'text-style: capitalize', 'font-variant: capitalize'],
        correct: 1
      }
    ]
  },
  {
    id: 'javascript-basics',
    title: 'JavaScript Essentials',
    description: 'Core JavaScript concepts and syntax',
    icon: '⚡',
    difficulty: 'Intermediate',
    questions: [
      {
        question: 'Which symbol is used for comments in JavaScript?',
        options: ['//', '#', '<!--', '**'],
        correct: 0
      },
      {
        question: 'How do you declare a variable in JavaScript?',
        options: ['variable myVar', 'v myVar', 'var myVar', 'let myVar'],
        correct: 2
      },
      {
        question: 'Which method is used to write into the browser console?',
        options: ['console.write()', 'console.log()', 'print()', 'document.write()'],
        correct: 1
      },
      {
        question: 'What is the correct way to write a JavaScript array?',
        options: [
          'var colors = (1:"red", 2:"green", 3:"blue")',
          'var colors = ["red", "green", "blue"]',
          'var colors = "red", "green", "blue"',
          'var colors = 1=("red"), 2=("green"), 3=("blue")'
        ],
        correct: 1
      },
      {
        question: 'Which event occurs when the user clicks on an HTML element?',
        options: ['onmouseclick', 'onchange', 'onclick', 'onmouseover'],
        correct: 2
      }
    ]
  },
  {
    id: 'code-challenges',
    title: 'Code Challenges',
    description: 'Test your coding skills with real code examples',
    icon: '💻',
    difficulty: 'Advanced',
    questions: [
      {
        question: 'What will be the output of this code?',
        code: 'console.log(typeof undefined);',
        options: ['"undefined"', '"null"', '"object"', '"number"'],
        correct: 0
      },
      {
        question: 'What is the output of the following code?',
        code: 'let x = 5;\nlet y = "5";\nconsole.log(x == y);\nconsole.log(x === y);',
        options: ['true true', 'true false', 'false true', 'false false'],
        correct: 1
      },
      {
        question: 'What does this array method return?',
        code: '[1, 2, 3].map(x => x * 2);',
        options: ['6', '[1, 2, 3]', '[2, 4, 6]', 'Error'],
        correct: 2
      },
      {
        question: 'What is the result of this expression?',
        code: 'console.log(1 + "2" + "2");',
        options: ['5', '"122"', '"14"', 'NaN'],
        correct: 1
      },
      {
        question: 'What will this function return?',
        code: 'function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2));',
        options: ['2', 'NaN', 'undefined', 'Error'],
        correct: 1
      }
    ]
  }
];

let currentUser = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizStartTime = null;
let timerInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  initializeAuth();
  setupEventListeners();
  loadQuizSelector();
  loadQuizHistory();
});

function initializeAuth() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
  });
}

function setupEventListeners() {
  document.getElementById('prevBtn').addEventListener('click', previousQuestion);
  document.getElementById('nextBtn').addEventListener('click', nextQuestion);
  document.getElementById('backToQuizesBtn').addEventListener('click', backToQuizzes);
  document.getElementById('retryBtn').addEventListener('click', retryQuiz);
}

function loadQuizSelector() {
  const selector = document.getElementById('quizSelector');
  selector.innerHTML = '';

  quizzes.forEach(quiz => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="quiz-icon">${quiz.icon}</div>
      <div class="quiz-title">${quiz.title}</div>
      <div class="quiz-desc">${quiz.description}</div>
      <div class="quiz-meta">
        <span>📝 ${quiz.questions.length} questions</span>
        <span>⏱️ ${quiz.questions.length * 2} min</span>
        <span>📊 ${quiz.difficulty}</span>
      </div>
    `;
    card.addEventListener('click', () => startQuiz(quiz));
    selector.appendChild(card);
  });
}

function startQuiz(quiz) {
  currentQuiz = quiz;
  currentQuestionIndex = 0;
  userAnswers = new Array(quiz.questions.length).fill(null);
  quizStartTime = Date.now();

  document.getElementById('quizSelector').style.display = 'none';
  document.getElementById('mainHeader').style.display = 'none';
  document.getElementById('historySection').style.display = 'none';
  document.getElementById('quizContainer').classList.add('active');
  document.getElementById('quizTitle').textContent = quiz.title;

  renderQuestion();
  startTimer();
}

function renderQuestion() {
  const question = currentQuiz.questions[currentQuestionIndex];
  const container = document.getElementById('questionsContainer');

  let html = `
    <div class="question-card">
      <div class="question-number">Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}</div>
      <div class="question-text">${question.question}</div>
      ${question.code ? `
        <div class="code-challenge">
          <pre>${escapeHtml(question.code)}</pre>
        </div>
      ` : ''}
      <div class="options">
  `;

  const letters = ['A', 'B', 'C', 'D', 'E'];
  question.options.forEach((option, index) => {
    const isSelected = userAnswers[currentQuestionIndex] === index;
    html += `
      <div class="option ${isSelected ? 'selected' : ''}" data-index="${index}">
        <div class="option-letter">${letters[index]}</div>
        <div class="option-text">${option}</div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;

  container.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => selectOption(parseInt(option.dataset.index)));
  });

  updateProgress();
  updateButtons();
}

function selectOption(index) {
  userAnswers[currentQuestionIndex] = index;
  renderQuestion();
}

function updateProgress() {
  const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
  document.getElementById('progressFill').style.width = progress + '%';
  document.getElementById('questionCounter').textContent = `${currentQuestionIndex + 1} / ${currentQuiz.questions.length}`;
}

function updateButtons() {
  document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
  
  const nextBtn = document.getElementById('nextBtn');
  if (currentQuestionIndex === currentQuiz.questions.length - 1) {
    nextBtn.textContent = 'Submit Quiz';
  } else {
    nextBtn.textContent = 'Next →';
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

function nextQuestion() {
  if (currentQuestionIndex < currentQuiz.questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    submitQuiz();
  }
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - quizStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('timer').textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

async function submitQuiz() {
  stopTimer();
  
  let correct = 0;
  const total = currentQuiz.questions.length;

  currentQuiz.questions.forEach((question, index) => {
    if (userAnswers[index] === question.correct) {
      correct++;
    }
  });

  const score = Math.round((correct / total) * 100);
  const timeTaken = Math.floor((Date.now() - quizStartTime) / 1000);
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  document.getElementById('quizContainer').classList.remove('active');
  document.getElementById('resultsContainer').classList.add('active');

  document.getElementById('finalScore').textContent = score + '%';
  document.getElementById('correctCount').textContent = correct;
  document.getElementById('incorrectCount').textContent = total - correct;
  document.getElementById('timeTaken').textContent = 
    `${minutes}:${seconds.toString().padStart(2, '0')}`;

  let message = '';
  if (score >= 90) message = 'Excellent! You mastered this quiz!';
  else if (score >= 70) message = 'Great job! Keep learning!';
  else if (score >= 50) message = 'Good effort! Review the material and try again.';
  else message = 'Keep practicing! Review the lessons and try again.';

  document.getElementById('scoreMessage').textContent = message;

  await saveQuizResult(score, timeTaken);
}

async function saveQuizResult(score, timeTaken) {
  const result = {
    quizId: currentQuiz.id,
    quizTitle: currentQuiz.title,
    score: score,
    correct: userAnswers.filter((answer, index) => answer === currentQuiz.questions[index].correct).length,
    total: currentQuiz.questions.length,
    timeTaken: timeTaken,
    timestamp: new Date().toISOString()
  };

  let history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
  history.unshift(result);
  history = history.slice(0, 20);
  localStorage.setItem('quizHistory', JSON.stringify(history));

  if (currentUser && currentUser.uid) {
    try {
      const quizRef = doc(collection(db, 'users', currentUser.uid, 'quizResults'), Date.now().toString());
      await setDoc(quizRef, {
        ...result,
        userId: currentUser.uid,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error saving quiz result to Firestore:', error);
    }
  }

  loadQuizHistory();
}

function loadQuizHistory() {
  const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
  const historySection = document.getElementById('historySection');
  const historyList = document.getElementById('historyList');

  if (history.length === 0) {
    historySection.style.display = 'none';
    return;
  }

  historySection.style.display = 'block';
  historyList.innerHTML = '';

  history.slice(0, 5).forEach(result => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <div class="history-info">
        <div class="history-name">${result.quizTitle}</div>
        <div class="history-date">${new Date(result.timestamp).toLocaleDateString()}</div>
      </div>
      <div class="history-score">${result.score}%</div>
    `;
    historyList.appendChild(item);
  });
}

function backToQuizzes() {
  document.getElementById('resultsContainer').classList.remove('active');
  document.getElementById('quizContainer').classList.remove('active');
  document.getElementById('mainHeader').style.display = 'block';
  document.getElementById('quizSelector').style.display = 'grid';
  loadQuizHistory();
}

function retryQuiz() {
  startQuiz(currentQuiz);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
