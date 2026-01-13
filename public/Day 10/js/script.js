const API = "https://www.themealdb.com/api/json/v1/1/";

const recipesGrid = document.getElementById("recipes-grid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const themeToggle = document.getElementById("themeToggle");

const recipeTitle = document.getElementById("recipe-title");
const recipeImg = document.getElementById("recipe-img");
const ingredientsList = document.getElementById("ingredients-list");
const stepsList = document.getElementById("steps-list");

/* ---------- Favorites ---------- */
function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}
function saveFavorites(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}
function toggleFavorite(id, btn) {
  let favs = getFavorites();
  if (favs.includes(id)) {
    favs = favs.filter(x => x !== id);
    btn.textContent = "🤍";
  } else {
    favs.push(id);
    btn.textContent = "❤️";
  }
  saveFavorites(favs);
}

/* ---------- Render ---------- */
function renderRecipes(meals) {
  recipesGrid.innerHTML = "";
  const favs = getFavorites();

  meals.forEach(meal => {
    const card = document.createElement("article");
    card.className = "recipe-card";

    card.innerHTML = `
      <img src="${meal.strMealThumb}">
      <div class="recipe-info">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strCategory || "Recipe"}</p>
        <div class="card-actions">
          <a class="btn" href="recipe.html?id=${meal.idMeal}">View Recipe</a>
          <button class="fav-btn">${favs.includes(meal.idMeal) ? "❤️" : "🤍"}</button>
        </div>
      </div>
    `;

    const favBtn = card.querySelector(".fav-btn");
    favBtn.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(meal.idMeal, favBtn);
    });

    recipesGrid.appendChild(card);
  });
}

/* ---------- Fetch ---------- */
async function fetchRecipes(q="") {
  if (!recipesGrid) return;
  const res = await fetch(`${API}search.php?s=${q}`);
  const data = await res.json();
  renderRecipes(data.meals || []);
}

async function fetchCategories() {
  if (!categorySelect) return;
  const res = await fetch(`${API}categories.php`);
  const data = await res.json();
  data.categories.forEach(c => {
    const o = document.createElement("option");
    o.value = c.strCategory;
    o.textContent = c.strCategory;
    categorySelect.appendChild(o);
  });
}

async function fetchByCategory(cat) {
  const res = await fetch(`${API}filter.php?c=${cat}`);
  const data = await res.json();
  renderRecipes(data.meals || []);
}

/* ---------- Recipe Details ---------- */
async function loadRecipeDetails() {
  if (!recipeTitle) return;
  const id = new URLSearchParams(location.search).get("id");
  const res = await fetch(`${API}lookup.php?i=${id}`);
  const data = await res.json();
  const r = data.meals[0];

  recipeTitle.textContent = r.strMeal;
  recipeImg.src = r.strMealThumb;

  r.strInstructions.split(".").forEach(s => {
    if (s.trim()) stepsList.innerHTML += `<li>${s}</li>`;
  });

  for (let i=1;i<=20;i++) {
    const ing = r[`strIngredient${i}`];
    if (ing) ingredientsList.innerHTML += `<li>${ing}</li>`;
  }
}

/* ---------- Favorites Page ---------- */
async function loadFavoritesPage() {
  if (!location.pathname.includes("favorites")) return;
  const favs = getFavorites();
  if (!favs.length) {
    recipesGrid.innerHTML = "<p>No favorites yet ❤️</p>";
    return;
  }
  const meals = await Promise.all(
    favs.map(id => fetch(`${API}lookup.php?i=${id}`).then(r=>r.json()).then(d=>d.meals[0]))
  );
  renderRecipes(meals);
}

/* ---------- Dark Mode ---------- */
function applyTheme(t) {
  document.body.classList.toggle("dark", t==="dark");
  if (themeToggle) themeToggle.textContent = t==="dark" ? "☀️" : "🌙";
}
const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);
if (themeToggle) {
  themeToggle.onclick = () => {
    const t = document.body.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem("theme", t);
    applyTheme(t);
  };
}

/* ---------- Events ---------- */
if (searchInput) searchInput.oninput = e => fetchRecipes(e.target.value);
if (categorySelect) categorySelect.onchange = e => e.target.value ? fetchByCategory(e.target.value) : fetchRecipes();

/* ---------- Init ---------- */
fetchRecipes();
fetchCategories();
loadRecipeDetails();
loadFavoritesPage();
