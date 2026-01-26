const calcBtn = document.getElementById("calcBtn");
const scoreEl = document.getElementById("score");
const barFill = document.getElementById("barFill");
const impactText = document.getElementById("impactText");

function safeNum(input) {
  const n = Number(input.value);
  return isNaN(n) || n < 0 ? 0 : n;
}

calcBtn.onclick = () => {
  const browsing = safeNum(browsing) * 5;
  const streaming = safeNum(streaming) * 15;
  const messaging = safeNum(messaging) * 0.2;
  const posts = safeNum(posts) * 10;
  const gaming = safeNum(gaming) * 8;

  let score = Math.round(browsing + streaming + messaging + posts + gaming);
  score = Math.min(score, 300);

  scoreEl.textContent = score;
  barFill.style.width = `${(score / 300) * 100}%`;

  if (score < 80) {
    barFill.style.background = "#22c55e";
    impactText.textContent = "Low Digital Footprint 🌱 (Healthy usage)";
  } else if (score < 180) {
    barFill.style.background = "#eab308";
    impactText.textContent = "Moderate Footprint 🌐 (Balanced usage)";
  } else {
    barFill.style.background = "#ef4444";
    impactText.textContent = "High Footprint 🔥 (Reduce usage)";
  }
};
