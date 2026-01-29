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

/* ---------- Error Display ---------- */
function showErrorMessage(message) {
  if (recipesGrid) {
    recipesGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px;">
        <p style="color: #e74c3c; font-size: 16px; margin: 0;">❌ ${message}</p>
        <p style="color: #95a5a6; font-size: 14px; margin-top: 8px;">Please check your connection and try again.</p>
      </div>
    `;
  }
}

function showLoadingState() {
  if (recipesGrid) {
    recipesGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px;">
        <div style="display: inline-block; animation: spin 1s linear infinite;">⏳</div>
        <p style="color: #7f8c8d; margin-top: 10px;">Loading recipes...</p>
      </div>
    `;
  }
}

/* ---------- Fetch ---------- */
async function fetchRecipes(q="") {
  if (!recipesGrid) return;
  
  try {
    showLoadingState();
    const res = await fetch(`${API}search.php?s=${q}`);
    
    // Check response status
    if (!res.ok) {
      throw new Error(`Network error: ${res.status} ${res.statusText}`);
    }
    
    // Check if response is JSON
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format from server');
    }
    
    const data = await res.json();
    
    // Validate response data
    if (!data || !data.meals) {
      showErrorMessage('No recipes found for your search');
      return;
    }
    
    renderRecipes(data.meals);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    
    if (!navigator.onLine) {
      showErrorMessage('You are offline. Please check your internet connection.');
    } else if (error.message.includes('Network')) {
      showErrorMessage('Failed to load recipes. Please check your connection and try again.');
    } else {
      showErrorMessage('An error occurred while loading recipes. Please try again.');
    }
  }
}

async function fetchCategories() {
  if (!categorySelect) return;
  
  try {
    const res = await fetch(`${API}categories.php`);
    
    if (!res.ok) {
      throw new Error(`Network error: ${res.status}`);
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format');
    }
    
    const data = await res.json();
    
    if (!data || !data.categories) {
      console.error('Invalid categories response');
      return;
    }
    
    data.categories.forEach(c => {
      const o = document.createElement("option");
      o.value = c.strCategory;
      o.textContent = c.strCategory;
      categorySelect.appendChild(o);
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Silently fail for categories dropdown, it's not critical
  }
}

async function fetchByCategory(cat) {
  try {
    showLoadingState();
    const res = await fetch(`${API}filter.php?c=${cat}`);
    
    if (!res.ok) {
      throw new Error(`Network error: ${res.status}`);
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format');
    }
    
    const data = await res.json();
    
    if (!data || !data.meals) {
      showErrorMessage('No recipes found in this category');
      return;
    }
    
    renderRecipes(data.meals);
  } catch (error) {
    console.error('Error fetching category:', error);
    showErrorMessage('Failed to load recipes from this category. Please try again.');
  }
}

/* ---------- Recipe Details ---------- */
async function loadRecipeDetails() {
  if (!recipeTitle) return;
  
  try {
    const id = new URLSearchParams(location.search).get("id");
    if (!id) return;
    
    const res = await fetch(`${API}lookup.php?i=${id}`);
    
    if (!res.ok) {
      throw new Error(`Network error: ${res.status}`);
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format');
    }
    
    const data = await res.json();
    
    if (!data || !data.meals || !data.meals[0]) {
      console.error('Recipe details not found');
      recipeTitle.textContent = 'Recipe not found';
      return;
    }
    
    const r = data.meals[0];

    recipeTitle.textContent = r.strMeal || 'Unknown Recipe';
    recipeImg.src = r.strMealThumb || '';

    if (r.strInstructions) {
      r.strInstructions.split(".").forEach(s => {
        if (s.trim()) stepsList.innerHTML += `<li>${s.trim()}</li>`;
      });
    }

    for (let i=1;i<=20;i++) {
      const ing = r[`strIngredient${i}`];
      if (ing) ingredientsList.innerHTML += `<li>${ing}</li>`;
    }
  } catch (error) {
    console.error('Error loading recipe details:', error);
    recipeTitle.textContent = 'Error loading recipe';
  }
}

/* ---------- Favorites Page ---------- */
async function loadFavoritesPage() {
  if (!location.pathname.includes("favorites")) return;
  
  try {
    const favs = getFavorites();
    if (!favs.length) {
      recipesGrid.innerHTML = "<p>No favorites yet ❤️</p>";
      return;
    }
    
    showLoadingState();
    
    const meals = await Promise.all(
      favs.map(id => 
        fetch(`${API}lookup.php?i=${id}`)
          .then(r => {
            if (!r.ok) throw new Error(`Failed to fetch recipe ${id}`);
            return r.json();
          })
          .then(d => d.meals && d.meals[0] ? d.meals[0] : null)
          .catch(err => {
            console.error(`Error fetching favorite recipe:`, err);
            return null;
          })
      )
    );
    
    // Filter out failed requests
    const validMeals = meals.filter(m => m !== null);
    
    if (validMeals.length === 0) {
      showErrorMessage('Failed to load your favorite recipes');
      return;
    }
    
    renderRecipes(validMeals);
  } catch (error) {
    console.error('Error loading favorites page:', error);
    showErrorMessage('Failed to load favorites. Please try again.');
  }
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
