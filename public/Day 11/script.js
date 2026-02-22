const blogPosts = [
  { id: 1, title: "Intro to Web Dev", date: "2026-01-01", excerpt: "Learning web development step by step..." },
  { id: 2, title: "Why JavaScript Matters", date: "2026-01-03", excerpt: "JavaScript powers the web..." },
  { id: 3, title: "CSS is Powerful", date: "2026-01-06", excerpt: "CSS is more than colors..." },
  { id: 4, title: "Projects Teach Best", date: "2026-01-10", excerpt: "Building projects improves skills..." },
  { id: 5, title: "Debugging Tips", date: "2026-01-14", excerpt: "Debugging is a developer superpower..." }
];

const POSTS_PER_PAGE = 2;
let currentPage = 1;

const blogContainer = document.getElementById("blogContainer");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");
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

/* ---------------- RENDER POSTS ---------------- */
function getFilteredPosts() {
  const query = searchInput.value.toLowerCase();
  return blogPosts.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.excerpt.toLowerCase().includes(query)
  );
}

function renderPosts() {
  blogContainer.innerHTML = "";

  const filtered = getFilteredPosts();
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const paginated = filtered.slice(start, end);

  if (!paginated.length) {
    blogContainer.innerHTML = `<p class="no-results">No posts found.</p>`;
    return;
  }

  paginated.forEach(post => {
    blogContainer.innerHTML += `
      <article class="blog-card">
        <h2>${post.title}</h2>
        <p class="date">${post.date}</p>
        <p>${post.excerpt}</p>
        <a class="read-more" href="post.html?id=${post.id}">
          Read Full Post →
        </a>
      </article>
    `;
  });
}

/* ---------------- PAGINATION ---------------- */
function renderPagination() {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(getFilteredPosts().length / POSTS_PER_PAGE);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = i === currentPage ? "active" : "";

    btn.onclick = () => {
      currentPage = i;
      renderPosts();
      renderPagination();
    };

    pagination.appendChild(btn);
  }
}

/* ---------------- EVENTS ---------------- */
searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderPosts();
  renderPagination();
});

/* INIT */
applySavedTheme();
renderPosts();
renderPagination();
