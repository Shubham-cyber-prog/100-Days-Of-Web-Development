const newsContainer = document.getElementById("news-container");
const statusEl = document.getElementById("status");

// 🔹 MOCK DATA (fallback)
const mockNews = [
  {
    title: "PWA is the Future of Web Apps",
    description: "Progressive Web Apps combine the best of web and mobile.",
    url: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps"
  },
  {
    title: "JavaScript Dominates Web Development",
    description: "JavaScript remains the most popular programming language.",
    url: "https://www.javascript.com/"
  },
  {
    title: "Open Source Contributions Matter",
    description: "Collaborative development builds scalable software.",
    url: "https://opensource.guide/"
  }
];

// 🔹 Render News
function renderNews(articles) {
  newsContainer.innerHTML = "";
  articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description || "No description available."}</p>
    `;
    card.onclick = () => window.open(article.url, "_blank");
    newsContainer.appendChild(card);
  });
}

// 🔹 Load Category (mock for now)
function loadCategory(category) {
  renderNews(mockNews);
}

// Initial Load
renderNews(mockNews);

// 🔹 Online / Offline Indicator
function updateStatus() {
  if (navigator.onLine) {
    statusEl.textContent = "🟢 Online";
    statusEl.className = "status online";
  } else {
    statusEl.textContent = "🔴 Offline – showing cached news";
    statusEl.className = "status offline";
  }
}

window.addEventListener("online", updateStatus);
window.addEventListener("offline", updateStatus);
updateStatus();
