const boxes = document.querySelectorAll(".box");
const turnText = document.getElementById("turn");

const welcomeModal = document.getElementById("welcomeModal");
const modeModal = document.getElementById("modeModal");
const resultModal = document.getElementById("resultModal");
const resultText = document.getElementById("resultText");
const gameUI = document.getElementById("gameUI");

let turnO = true;
let gameOver = false;
let count = 0;
let mode = null;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

/* MODALS */
function openMode(){
  welcomeModal.classList.add("hidden");
  modeModal.classList.remove("hidden");
}

function startGame(selectedMode){
  mode = selectedMode;
  modeModal.classList.add("hidden");
  gameUI.classList.remove("hidden");
  document.body.classList.remove("blur");
  resetGame();
}

function showResult(text){
  resultText.innerText = text;
  resultModal.classList.remove("hidden");
  document.body.classList.add("blur");
}

function closeResult(){
  resultModal.classList.add("hidden");
  document.body.classList.remove("blur");
  resetGame();
}

/* GAME LOGIC */
boxes.forEach(box=>{
  box.addEventListener("click",()=>{
    if(box.innerText || gameOver) return;

    box.innerText = turnO ? "O" : "X";
    count++;
    checkWinner();

    turnO = !turnO;
    turnText.innerText = `${turnO ? "O" : "X"}'s Turn`;

    if(mode === "single" && !turnO && !gameOver){
      setTimeout(aiMove,500);
    }
  });
});

function aiMove(){
  const empty = [...boxes].filter(b=>b.innerText==="");
  if(!empty.length) return;

  const box = empty[Math.floor(Math.random()*empty.length)];
  box.innerText = "X";
  count++;
  checkWinner();
  turnO = true;
  turnText.innerText = "O's Turn";
}

function checkWinner(){
  for(let p of winPatterns){
    const [a,b,c] = p.map(i=>boxes[i].innerText);
    if(a && a===b && b===c){
      gameOver = true;
      showResult(`${a} Wins 🎉`);
      return;
    }
  }
  if(count===9){
    gameOver = true;
    showResult("It's a Draw 🤝");
  }
}

function resetGame(){
  boxes.forEach(b=>b.innerText="");
  turnO = true;
  count = 0;
  gameOver = false;
  turnText.innerText = "O's Turn";
}
