// Mobile menu
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Skill animation
const bars = document.querySelectorAll(".bar span");

window.addEventListener("scroll", () => {
  bars.forEach(bar => {
    const top = bar.getBoundingClientRect().top;
    if(top < window.innerHeight) {
      bar.style.width = bar.dataset.progress + "%";
    }
  });
});

// Scroll to top
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
