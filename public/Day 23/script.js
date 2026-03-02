const currencies = {
  USD: { rate: 1, color: "#38bdf8" },
  EUR: { rate: 0.92, color: "#facc15" },
  GBP: { rate: 0.79, color: "#22c55e" },
  INR: { rate: 83.1, color: "#f97316" },
  JPY: { rate: 144.7, color: "#ef4444" }
};

const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");
const rateInfo = document.getElementById("rateInfo");
const historyList = document.getElementById("historyList");
const swapBtn = document.getElementById("swapBtn");
const themeToggle = document.getElementById("themeToggle");

Object.keys(currencies).forEach(code => {
  fromSelect.add(new Option(code, code));
  toSelect.add(new Option(code, code));
});

fromSelect.value = "USD";
toSelect.value = "INR";

function animateValue(start, end, duration) {
  let startTime = null;
  function step(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = start + (end - start) * progress;
    resultDiv.textContent = value.toFixed(2);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function convert() {
  let amount = parseFloat(amountInput.value.replace(/,/g, ""));
  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "Enter valid amount";
    return;
  }

  const fromRate = currencies[fromSelect.value].rate;
  const toRate = currencies[toSelect.value].rate;
  const converted = (amount / fromRate) * toRate;

  animateValue(0, converted, 500);

  rateInfo.textContent =
    `1 ${fromSelect.value} = ${(1/fromRate*toRate).toFixed(4)} ${toSelect.value}`;

  addHistory(`${amount} ${fromSelect.value} → ${converted.toFixed(2)} ${toSelect.value}`);

  updateTheme();
}

function addHistory(text) {
  const li = document.createElement("li");
  li.textContent = text;
  historyList.prepend(li);
  if (historyList.children.length > 5)
    historyList.removeChild(historyList.lastChild);
}

function updateTheme() {
  const color = currencies[fromSelect.value].color;
  document.documentElement.style.setProperty("--primary", color);
}

swapBtn.addEventListener("click", () => {
  [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
  convert();
});

fromSelect.addEventListener("change", convert);
toSelect.addEventListener("change", convert);
amountInput.addEventListener("input", convert);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

convert();