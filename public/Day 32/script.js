// Load saved theme
if(localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark");
}

const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

// toggleBtn.addEventListener("click", () => {
//   body.classList.toggle("dark");
//   toggleBtn.textContent = body.classList.contains("dark")
//     ? "☀ Light Mode"
//     : "🌙 Dark Mode";
// });

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  // Save theme
  localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");

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


// Live Date & Time
function updateTime(){
  const now = new Date();
  document.getElementById("dateTime").textContent =
    now.toLocaleString();
}
setInterval(updateTime, 1000);
updateTime();

// Show welcome message
window.addEventListener("load", () => {
  const toast = document.getElementById("toast");
  setTimeout(()=>{
    toast.classList.add("show");
  }, 800);

  setTimeout(()=>{
    toast.classList.remove("show");
  }, 4000);
});


setInterval(()=>{
  animateValue("fbFollowers", 12450 + Math.floor(Math.random()*100));
  animateValue("twFollowers", 8230 + Math.floor(Math.random()*80));
  animateValue("igFollowers", 15980 + Math.floor(Math.random()*120));
  animateValue("ytSubscribers", 21300 + Math.floor(Math.random()*150));
}, 6000);