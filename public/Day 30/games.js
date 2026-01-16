let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#new");
let resetHistoryBtn = document.querySelector("#resetHistory");

let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnText = document.querySelector("#turn");

let oScoreText = document.querySelector("#oScore");
let xScoreText = document.querySelector("#xScore");
let drawScoreText = document.querySelector("#drawScore");

let turnO = true;
let count = 0;
let gameOver = false;

let oScore = 0;
let xScore = 0;
let drawScore = 0;

const winPatterns = [
  [0,1,2],[0,3,6],[0,4,8],
  [3,4,5],[6,7,8],[2,4,6],
  [2,5,8],[1,4,7]
];

// ---------------- RESET BOARD ----------------
const resetGame = () => {
  turnO = true;
  count = 0;
  gameOver = false;

  turnText.innerText = "Turn: O";
  msg.innerText = "";
  msgContainer.classList.add("hide");

  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
  });
};

// ---------------- RESET HISTORY ----------------
const resetHistory = () => {
  oScore = 0;
  xScore = 0;
  drawScore = 0;

  oScoreText.innerText = 0;
  xScoreText.innerText = 0;
  drawScoreText.innerText = 0;

  resetGame();
};

// ---------------- CLICK HANDLER ----------------
boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || gameOver) return;

    box.innerText = turnO ? "O" : "X";
    count++;

    turnO = !turnO;
    turnText.innerText = `Turn: ${turnO ? "O" : "X"}`;

    checkWinner();
  });
});

// ---------------- SHOW WINNER ----------------
const showWinner = (winner) => {
  gameOver = true;
  msg.innerText = `Winner: ${winner}`;
  msgContainer.classList.remove("hide");

  if (winner === "O") {
    oScore++;
    oScoreText.innerText = oScore;
  } else {
    xScore++;
    xScoreText.innerText = xScore;
  }

  boxes.forEach(box => box.disabled = true);
};

// ---------------- SHOW DRAW ----------------
const showDraw = () => {
  gameOver = true;
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");

  drawScore++;
  drawScoreText.innerText = drawScore;

  boxes.forEach(box => box.disabled = true);
};

// ---------------- CHECK WIN ----------------
const checkWinner = () => {
  for (let p of winPatterns) {
    let a = boxes[p[0]].innerText;
    let b = boxes[p[1]].innerText;
    let c = boxes[p[2]].innerText;

    if (a && a === b && b === c) {
      showWinner(a);
      return;
    }
  }

  if (count === 9) showDraw();
};

// ---------------- BUTTONS ----------------
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
resetHistoryBtn.addEventListener("click", resetHistory);
