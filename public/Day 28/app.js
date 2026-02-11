import { $, $$, random } from "../shared/utils.js";

let userScore = 0;
let compScore = 0;

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
const resetGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = 0;
  compScorePara.innerText = 0;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
};

/* ---------- Draw ---------- */
const drawGame = () => {
  msg.innerText = "Game was a draw. Click to reset";
  msg.style.backgroundColor = "#081b31";
};

/* ---------- Winner ---------- */
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! ${userChoice} beats ${compChoice}. Click to reset`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats ${userChoice}. Click to reset`;
    msg.style.backgroundColor = "red";
  }
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
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    playGame(choice.id);
  });
});

msg.style.cursor = "pointer";
msg.addEventListener("click", resetGame);
