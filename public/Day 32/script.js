const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  toggleBtn.textContent = body.classList.contains("dark")
    ? "☀ Light Mode"
    : "🌙 Dark Mode";
});

// Smooth counter animation
function animateValue(id, end, duration = 1200) {
  let start = 0;
  let range = end - start;
  let stepTime = Math.max(Math.floor(duration / range), 10);
  let current = start;
  let obj = document.getElementById(id);

  const timer = setInterval(() => {
    current++;
    obj.textContent = current.toLocaleString();
    if (current >= end) clearInterval(timer);
  }, stepTime);
}

animateValue("fbFollowers", 12450);
animateValue("twFollowers", 8230);
animateValue("igFollowers", 15980);
animateValue("ytSubscribers", 21300);
