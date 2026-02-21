import { $, $$, random } from "../shared/utils.js";

let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const themeToggle = document.querySelector("#themeToggle");
const body = document.body;

const choices = $$(".choice");
const msg = $("#msg");
const userScorePara = $("#user-score");
const compScorePara = $("#comp-score");

/* ---------- Computer Choice ---------- */
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  return options[random(0, 2)];
};

/* ---------- Reset Game ---------- */
// const resetGame = () => {
//   userScore = 0;
//   compScore = 0;
//   userScorePara.innerText = 0;
//   compScorePara.innerText = 0;
//   msg.innerText = "Play your move";
//   msg.style.backgroundColor = "#081b31";
// };

// const resetGame = () => {
//   userScore = 0;
//   compScore = 0;
//   userScorePara.innerText = 0;
//   compScorePara.innerText = 0;
//   msg.innerText = "Play your move";
//   msg.style.backgroundColor = "#081b31";

//   document.body.style.background = "";
// };

const resetGame = () => {
  userScore = compScore = 0;
  userScorePara.innerText = compScorePara.innerText = 0;

  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";

  document.body.style.background = "";
};

/* ---------- Draw ---------- */
const drawGame = () => {
  msg.innerText = "Game was a draw. Click to reset";
  msg.style.backgroundColor = "#081b31";
};

/* ---------- Winner ---------- */
// const showWinner = (userWin, userChoice, compChoice) => {
//   if (userWin) {
//     userScore++;
//     userScorePara.innerText = userScore;
//     msg.innerText = `You win! ${userChoice} beats ${compChoice}. Click to reset`;
//     msg.style.backgroundColor = "green";
//   } else {
//     compScore++;
//     compScorePara.innerText = compScore;
//     msg.innerText = `You lost. ${compChoice} beats ${userChoice}. Click to reset`;
//     msg.style.backgroundColor = "red";
//   }
// };


const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;

    msg.innerText = `You win! ${userChoice} beats ${compChoice}. Click to reset`;
    msg.style.backgroundColor = "green";

    document.body.style.background =
      "linear-gradient(135deg, #a8ff78, #78ffd6)";
      
    userScorePara.classList.add("score-update");

  } else {
    compScore++;
    compScorePara.innerText = compScore;

    msg.innerText = `You lost. ${compChoice} beats ${userChoice}. Click to reset`;
    msg.style.backgroundColor = "red";

    document.body.style.background =
      "linear-gradient(135deg, #ff758c, #ff7eb3)";

    compScorePara.classList.add("score-update");
  }

  setTimeout(() => {
    userScorePara.classList.remove("score-update");
    compScorePara.classList.remove("score-update");
  }, 300);
};

/* ---------- Game Logic ---------- */
const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
    return;
  }

  let userWin = true;

  if (userChoice === "rock") {
    userWin = compChoice !== "paper";
  } else if (userChoice === "paper") {
    userWin = compChoice !== "scissors";
  } else {
    userWin = compChoice !== "rock";
  }

  showWinner(userWin, userChoice, compChoice);
};

/* ---------- Event Listeners ---------- */
// choices.forEach((choice) => {
//   choice.addEventListener("click", () => {
//     playGame(choice.id);
//   });
// });

choices.forEach((choice) => {
  choice.addEventListener("click", () => {

    /* Remove previous active */
    choices.forEach(c => c.classList.remove("active"));

    /* Highlight selected */
    choice.classList.add("active");

    playGame(choice.id);
  });
});

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
});

msg.style.cursor = "pointer";
msg.addEventListener("click", resetGame);

document.getElementById("darkBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
