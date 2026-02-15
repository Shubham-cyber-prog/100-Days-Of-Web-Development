const cube = document.getElementById("cube");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");
const resultText = document.getElementById("resultText");
const historyList = document.getElementById("historyList");

rollBtn.addEventListener("click", rollDice);
resetBtn.addEventListener("click", resetHistory);

function rollDice() {
  const num = Math.floor(Math.random() * 6) + 1;

  let x = 0, y = 0;
  switch (num) {
    case 1: x = 0; y = 0; break;
    case 2: x = 0; y = 180; break;
    case 3: x = 0; y = -90; break;
    case 4: x = 0; y = 90; break;
    case 5: x = -90; y = 0; break;
    case 6: x = 90; y = 0; break;
  }

  x += 360 * 3;
  y += 360 * 3;

  cube.style.transform = `translateZ(-50px) rotateX(${x}deg) rotateY(${y}deg)`;

  resultText.innerText = "Rolling...";

  setTimeout(() => {
    resultText.innerText = `You rolled ${num}!`;
    addToHistory(num);
  }, 1000);
}

function addToHistory(num) {
  const li = document.createElement("li");
  li.textContent = `🎲 ${num}`;
  historyList.prepend(li);
}

// function resetHistory() {
//   historyList.innerHTML = "";
//   resultText.innerText = "Roll the dice!";
// }
function resetHistory() {
  historyList.innerHTML = "";
  resultText.innerText = "Roll the dice!";

  // Reset dice position
  cube.style.transform = `translateZ(-50px) rotateX(0deg) rotateY(0deg)`;
}

function resetHistory() {
  historyList.innerHTML = "";
  resultText.innerText = "Roll the dice!";
}
