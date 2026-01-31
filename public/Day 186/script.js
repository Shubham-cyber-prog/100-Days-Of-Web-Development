document.addEventListener('DOMContentLoaded',()=>{
    const start=document.getElementById('btn');
    const next=document.getElementById('next');
    const restart=document.getElementById('rebtn');

    const quesc=document.getElementById('ques');
    const questext=document.getElementById('ques-text');
    const list=document.getElementById('choice-list');
    const res=document.getElementById('res-container');
    const score=document.getElementById('score');
    let currentindex=0;
    let tscore=0;

    const questions=[
  {
    "id": 1,
    "question": "What does HTML stand for?",
    "options": [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Markup Language",
      "Hyperlinks Text Mark Language"
    ],
    "answer": "Hyper Text Markup Language",
    "category": "HTML"
  },
  {
    "id": 2,
    "question": "Which CSS property is used to change text color?",
    "options": [
      "font-color",
      "text-color",
      "color",
      "background-color"
    ],
    "answer": "color",
    "category": "CSS"
  },
  {
    "id": 3,
    "question": "Which keyword is used to declare a variable in JavaScript?",
    "options": [
      "var",
      "int",
      "string",
      "float"
    ],
    "answer": "var",
    "category": "JavaScript"
  },
  {
    "id": 4,
    "question": "Which data structure follows FIFO?",
    "options": [
      "Stack",
      "Queue",
      "Tree",
      "Graph"
    ],
    "answer": "Queue",
    "category": "DSA"
  },
  {
    "id": 5,
    "question": "What is the time complexity of binary search?",
    "options": [
      "O(n)",
      "O(log n)",
      "O(n log n)",
      "O(1)"
    ],
    "answer": "O(log n)",
    "category": "DSA"
  },
  {
    "id": 6,
    "question": "Which method is used to add an element at the end of an array in JavaScript?",
    "options": [
      "push()",
      "pop()",
      "shift()",
      "unshift()"
    ],
    "answer": "push()",
    "category": "JavaScript"
  },
  {
    "id": 7,
    "question": "Which tag is used to create a hyperlink in HTML?",
    "options": [
      "<a>",
      "<link>",
      "<href>",
      "<url>"
    ],
    "answer": "<a>",
    "category": "HTML"
  },
  {
    "id": 8,
    "question": "Which HTTP method is used to fetch data?",
    "options": [
      "POST",
      "PUT",
      "GET",
      "DELETE"
    ],
    "answer": "GET",
    "category": "Web"
  },
  {
    "id": 9,
    "question": "Which company developed Java?",
    "options": [
      "Google",
      "Microsoft",
      "Sun Microsystems",
      "Apple"
    ],
    "answer": "Sun Microsystems",
    "category": "Java"
  },
  {
    "id": 10,
    "question": "What is the default value of a boolean variable in Java?",
    "options": [
      "true",
      "false",
      "0",
      "null"
    ],
    "answer": "false",
    "category": "Java"
  }
]

    restart.addEventListener('click',()=>{
        currentindex=0;
        tscore=0;
        res.classList.add('hidden');
        startQuiz();
    })
    start.addEventListener('click',startQuiz);
    next.addEventListener('click',()=>{
        currentindex++;
        if(currentindex<questions.length){
            showQuestion();
        }
        else{
            showResult();
        }
    })
    /**
 * Starts the quiz
 */
    function startQuiz(){
        start.classList.add('hidden');
        quesc.classList.remove('hidden');
        res.classList.add('hidden');
        showQuestion();
    }
    /**
 * Displays the current question and its options
 */
    function showQuestion(){

        next.classList.add('hidden');
        questext.textContent=questions[currentindex].question;
        list.innerHTML='';
        questions[currentindex].options.forEach((choice)=>{
            const button=document.createElement('button');
            button.textContent=choice;
            button.addEventListener('click',(e)=>{selectAnswer(choice,e.target)});
            list.appendChild(button);
        });

    }
    /**
 * Performs whether the answer is correct
 */
    function selectAnswer(choice, clickedButton){
        let c=questions[currentindex].answer;
        const buttons = list.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.disabled = true;
            if(btn.textContent === c){
                btn.style.background = 'green'; // green for correct
            }
        });
        if(choice !== c){
            clickedButton.style.background = 'red'; // red for wrong
        } else {
            tscore++;
        }
        next.classList.remove('hidden');
    }
    /**
 * Displays the final score of the quiz
 */
    function showResult(){
        quesc.classList.add('hidden');
        res.classList.remove('hidden');
        score.textContent=`${tscore} out of ${questions.length}`;
    }
    
})