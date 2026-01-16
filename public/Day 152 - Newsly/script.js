

const API_KEY = "PASTE_YOUR_GNEWS_API_KEY_HERE";

let currentCategory = "general";
let currentQuery = "";

// DOM
const newsGrid = document.getElementById("newsGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const refreshBtn = document.getElementById("refreshBtn");
const statusPill = document.getElementById("statusPill");
const resultCount = document.getElementById("resultCount");
const categoryTabs = document.getElementById("categoryTabs");

function setStatus(text) {
  statusPill.textContent = text;
}

function safeText(text, fallback = "") {
  return (text || fallback).toString();
}

function formatTime(isoString) {
  try {
    const date = new Date(isoString);
    return date.toLocaleString();
  } catch {
    return "Unknown";
  }
}

function renderLoadingCards(count = 6) {
  newsGrid.innerHTML = "";
  emptyState.style.display = "none";

  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div style="height:180px;border-radius:14px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.05);"></div>
      <div style="height:14px;margin-top:12px;width:55%;background:rgba(255,255,255,0.06);border-radius:10px;"></div>
      <div style="height:12px;margin-top:10px;width:95%;background:rgba(255,255,255,0.05);border-radius:10px;"></div>
      <div style="height:12px;margin-top:8px;width:75%;background:rgba(255,255,255,0.05);border-radius:10px;"></div>
      <div style="height:38px;margin-top:14px;width:100%;background:rgba(255,255,255,0.06);border-radius:12px;"></div>
    `;
    newsGrid.appendChild(div);
  }
}

function renderNews(articles = []) {
  newsGrid.innerHTML = "";

  if (!articles.length) {
    emptyState.style.display = "block";
    resultCount.textContent = "0 articles";
    return;
  }

  emptyState.style.display = "none";
  resultCount.textContent = `${articles.length} articles`;

  articles.forEach((a) => {
    const title = safeText(a.title, "Untitled");
    const description = safeText(a.description, "No description available.");
    const image =
      a.image || "https://dummyimage.com/1200x700/111827/ffffff&text=Newsly";
    const url = a.url || "#";
    const publishedAt = formatTime(a.publishedAt);
    const sourceName = safeText(a.source?.name, "Unknown Source");

    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <img class="thumb" src="${image}" alt="news thumbnail" loading="lazy"/>
      <div class="meta">
        <span class="tag">${sourceName}</span>
        <span class="time">${publishedAt}</span>
      </div>
      <h3 class="title">${title}</h3>
      <p class="desc">${description}</p>
      <div class="actions">
        <a class="linkBtn primary" href="${url}" target="_blank" rel="noreferrer">Read Full Article</a>
      </div>
    `;

    newsGrid.appendChild(card);
  });
}

async function fetchNews({ category = "general", query = "" } = {}) {
  if (!API_KEY || API_KEY.includes("PASTE_")) {
    setStatus("Missing API Key");
    renderNews([]);
    emptyState.style.display = "block";
    emptyState.innerHTML = `
      <h2>API Key missing</h2>
      <p>Paste your GNews API key inside <b>script.js</b> to run this app.</p>
    `;
    return;
  }

  setStatus("Loading...");
  renderLoadingCards();

  try {
    let endpoint = "";

    if (query.trim().length > 0) {
      const q = encodeURIComponent(query.trim());
      endpoint = `https://gnews.io/api/v4/search?q=${q}&lang=en&country=in&max=12&apikey=${API_KEY}`;
    } else {
      endpoint = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=12&apikey=${API_KEY}`;
    }

    const res = await fetch(endpoint);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.errors?.[0] || "Failed to fetch news.");
    }

    const articles = data.articles || [];
    setStatus("Updated");
    renderNews(articles);
  } catch (err) {
    setStatus("Error");
    newsGrid.innerHTML = "";
    emptyState.style.display = "block";
    emptyState.innerHTML = `
      <h2>Something went wrong</h2>
      <p>${safeText(err.message, "Unknown error")}</p>
    `;
    resultCount.textContent = "0 articles";
  }
}

// Category tabs
categoryTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;

  document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");

  currentCategory = btn.dataset.category;
  currentQuery = "";
  searchInput.value = "";

  fetchNews({ category: currentCategory, query: "" });
});

// Search
searchBtn.addEventListener("click", () => {
  currentQuery = searchInput.value.trim();
  fetchNews({ category: currentCategory, query: currentQuery });
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    currentQuery = searchInput.value.trim();
    fetchNews({ category: currentCategory, query: currentQuery });
  }
});

// Refresh
refreshBtn.addEventListener("click", () => {
  fetchNews({ category: currentCategory, query: currentQuery });
});

// Initial load
fetchNews({ category: currentCategory, query: "" });
