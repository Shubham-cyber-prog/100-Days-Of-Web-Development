const root = document.documentElement;
const toggle = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
root.setAttribute("data-theme", savedTheme);

// Update toggle text
if (toggle) {
  toggle.textContent =
    savedTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    toggle.textContent =
      next === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  });
}
