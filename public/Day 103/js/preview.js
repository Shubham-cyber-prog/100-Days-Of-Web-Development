const preview = document.getElementById("preview");
const themeToggle = document.getElementById("themeToggle");

/* =========================
   MARKDOWN SETUP
========================= */
marked.setOptions({
  gfm: true,
  breaks: true,
});

/* =========================
   THEME TOGGLE (FIXED)
========================= */
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }
}

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});

/* =========================
   PREVIEW RENDER
========================= */
function renderPreview(markdown) {
  preview.innerHTML = marked.parse(markdown);
}

// Load saved README
const savedReadme = localStorage.getItem("readme");
if (savedReadme) renderPreview(savedReadme);
