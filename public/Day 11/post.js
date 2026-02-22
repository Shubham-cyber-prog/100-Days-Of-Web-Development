const posts = [
  {
    id: 1,
    title: "Intro to Web Dev",
    date: "January 2026",
    content: `
# Welcome to Web Development 🚀

Web development lets you build **real-world applications**.

## What you'll learn
- HTML
- CSS
- JavaScript

> Learn by building projects.
`
  }
];

const params = new URLSearchParams(window.location.search);
const post = posts.find(p => p.id === Number(params.get("id")));

const themeToggle = document.getElementById("themeToggle");

/* ---------------- THEME ---------------- */
function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

/* ---------------- POST CONTENT ---------------- */
if (!post) {
  document.body.innerHTML = "<h2>Post not found</h2>";
} else {
  document.getElementById("postTitle").textContent = post.title;
  document.getElementById("postDate").textContent = post.date;
  document.getElementById("postContent").innerHTML = marked.parse(post.content);
}

applySavedTheme();
