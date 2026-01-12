// Recipe data - initial recipes
let recipes = [
    {
        id: 1,
        title: "Classic Pancakes",
        category: "breakfast",
        prepTime: 10,
        cookTime: 15,
        servings: 4,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        ingredients: [
            "1 cup all-purpose flour",
            "2 tablespoons sugar",
            "2 teaspoons baking powder",
            "1/2 teaspoon salt",
            "1 cup milk",
            "1 large egg",
            "2 tablespoons melted butter",
            "1 teaspoon vanilla extract"
        ],
        instructions: [
            "In a large bowl, mix flour, sugar, baking powder, and salt.",
            "In another bowl, whisk together milk, egg, melted butter, and vanilla.",
            "Pour wet ingredients into dry ingredients and stir until just combined.",
            "Heat a lightly oiled griddle or frying pan over medium-high heat.",
            "Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake.",
            "Cook until bubbles form and the edges are dry, about 2-3 minutes.",
            "Flip and cook until browned on the other side."
        ],
        author: "Sarah Johnson",
        story: "This is my grandmother's recipe that she used to make every Sunday morning. The smell of these pancakes cooking still brings back warm memories of family breakfasts.",
        rating: 4.8,
        createdAt: new Date(2023, 5, 15)
    },
    {
        id: 2,
        title: "Spaghetti Carbonara",
        category: "dinner",
        prepTime: 15,
        cookTime: 20,
        servings: 4,
        image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        ingredients: [
            "400g spaghetti",
            "200g pancetta or guanciale, diced",
            "3 large eggs",
            "100g Pecorino Romano cheese, grated",
            "50g Parmesan cheese, grated",
            "Freshly ground black pepper",
            "Salt"
        ],
        instructions: [
            "Bring a large pot of salted water to boil and cook spaghetti according to package directions.",
            "While pasta cooks, fry pancetta in a large pan until crispy.",
            "In a bowl, whisk together eggs, cheeses, and plenty of black pepper.",
            "Drain pasta, reserving 1 cup of pasta water.",
            "Quickly mix hot pasta with pancetta in the pan, then remove from heat.",
            "Pour egg mixture over pasta, tossing quickly to create a creamy sauce.",
            "Add pasta water as needed to reach desired consistency.",
            "Serve immediately with extra cheese and pepper."
        ],
        author: "Marco Rossi",
        story: "This authentic Roman recipe was taught to me by my Italian grandmother. The key is to work quickly off the heat to avoid scrambling the eggs.",
        rating: 4.9,
        createdAt: new Date(2023, 6, 22)
    },
    {
        id: 3,
        title: "Chocolate Chip Cookies",
        category: "dessert",
        prepTime: 20,
        cookTime: 12,
        servings: 24,
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        ingredients: [
            "2 1/4 cups all-purpose flour",
            "1 teaspoon baking soda",
            "1 teaspoon salt",
            "1 cup butter, softened",
            "3/4 cup granulated sugar",
            "3/4 cup packed brown sugar",
            "1 teaspoon vanilla extract",
            "2 large eggs",
            "2 cups semisweet chocolate chips"
        ],
        instructions: [
            "Preheat oven to 375°F (190°C).",
            "Combine flour, baking soda, and salt in small bowl.",
            "Beat butter, sugars, and vanilla in large mixer bowl until creamy.",
            "Add eggs, one at a time, beating well after each addition.",
            "Gradually beat in flour mixture.",
            "Stir in chocolate chips.",
            "Drop by rounded tablespoon onto ungreased baking sheets.",
            "Bake for 9 to 11 minutes or until golden brown.",
            "Cool on baking sheets for 2 minutes; remove to wire racks to cool completely."
        ],
        author: "Emily Chen",
        story: "These cookies are a family favorite! I've been making this recipe since I was 10 years old. They're perfect for bake sales and holiday gatherings.",
        rating: 4.7,
        createdAt: new Date(2023, 7, 10)
    },
    {
        id: 4,
        title: "Avocado Toast",
        category: "breakfast",
        prepTime: 5,
        cookTime: 5,
        servings: 1,
        image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        ingredients: [
            "1 slice of sourdough bread",
            "1 ripe avocado",
            "1/2 lemon, juiced",
            "Pinch of red pepper flakes",
            "Salt and pepper to taste",
            "Optional toppings: cherry tomatoes, feta cheese, microgreens"
        ],
        instructions: [
            "Toast bread until golden and crispy.",
            "While bread toasts, mash avocado in a bowl with lemon juice, salt, and pepper.",
            "Spread mashed avocado evenly on toast.",
            "Top with red pepper flakes and any additional toppings.",
            "Serve immediately."
        ],
        author: "Alex Morgan",
        story: "My go-to quick breakfast that's both delicious and nutritious. I love experimenting with different toppings depending on what's in season.",
        rating: 4.5,
        createdAt: new Date(2023, 8, 5)
    },
    {
        id: 5,
        title: "Vegetable Stir Fry",
        category: "vegetarian",
        prepTime: 15,
        cookTime: 10,
        servings: 4,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        ingredients: [
            "2 tablespoons vegetable oil",
            "1 onion, sliced",
            "2 bell peppers, sliced",
            "2 carrots, julienned",
            "1 cup broccoli florets",
            "1 cup snap peas",
            "3 cloves garlic, minced",
            "1 tablespoon ginger, minced",
            "1/4 cup soy sauce",
            "2 tablespoons honey",
            "1 tablespoon sesame oil",
            "Cooked rice for serving"
        ],
        instructions: [
            "Heat oil in a large wok or skillet over high heat.",
            "Add onion and stir-fry for 2 minutes.",
            "Add carrots and broccoli, stir-fry for 3 more minutes.",
            "Add bell peppers, snap peas, garlic, and ginger, stir-fry for 2 minutes.",
            "In a small bowl, whisk together soy sauce, honey, and sesame oil.",
            "Pour sauce over vegetables and stir to coat.",
            "Cook for 1-2 minutes until sauce thickens slightly.",
            "Serve immediately over cooked rice."
        ],
        author: "David Kim",
        story: "This versatile stir-fry is my solution for using up whatever vegetables I have in the fridge. It's healthy, quick, and always delicious.",
        rating: 4.6,
        createdAt: new Date(2023, 8, 18)
    },
    {
        id: 6,
        title: "15-Minute Pasta",
        category: "quick",
        prepTime: 5,
        cookTime: 10,
        servings: 2,
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        ingredients: [
            "200g pasta of your choice",
            "2 tablespoons olive oil",
            "3 cloves garlic, minced",
            "1/2 teaspoon red pepper flakes",
            "1 cup cherry tomatoes, halved",
            "Handful of fresh basil, chopped",
            "Salt and pepper to taste",
            "Grated Parmesan for serving"
        ],
        instructions: [
            "Cook pasta according to package directions in salted water.",
            "While pasta cooks, heat olive oil in a large pan.",
            "Add garlic and red pepper flakes, cook for 1 minute until fragrant.",
            "Add cherry tomatoes and cook until they start to burst, about 5 minutes.",
            "Drain pasta, reserving 1/2 cup of pasta water.",
            "Add pasta to the pan with tomatoes, along with some pasta water.",
            "Toss everything together until well combined.",
            "Stir in fresh basil and season with salt and pepper.",
            "Serve with grated Parmesan."
        ],
        author: "Sophia Williams",
        story: "My perfect 'I'm too tired to cook but want something delicious' recipe. It comes together in minutes with pantry staples.",
        rating: 4.4,
        createdAt: new Date(2023, 9, 2)
    }
];

// DOM Elements
const recipesContainer = document.getElementById('recipes-container');
const recipeForm = document.getElementById('recipe-form');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const sortSelect = document.getElementById('sort-recipes');
const recipeModal = document.getElementById('recipe-modal');
const closeModal = document.querySelector('.close-modal');
const modalRecipeContent = document.getElementById('modal-recipe-content');
const shareRecipeBtn = document.getElementById('share-recipe-btn');

// Current filter and search state
let currentFilter = 'all';
let currentSearch = '';
let currentSort = 'newest';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load recipes from localStorage if available
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
        recipes = JSON.parse(savedRecipes);
    }
    
    displayRecipes();
    setupEventListeners();
    setupCategoryLinks();
});

// Display recipes based on current filter, search, and sort
function displayRecipes() {
    // Filter and sort recipes
    let filteredRecipes = filterRecipes(recipes);
    filteredRecipes = sortRecipes(filteredRecipes);
    
    // Clear the container
    recipesContainer.innerHTML = '';
    
    // Check if no recipes match
    if (filteredRecipes.length === 0) {
        recipesContainer.innerHTML = `
            <div class="no-recipes">
                <i class="fas fa-utensils"></i>
                <h3>No recipes found</h3>
                <p>Try adjusting your search or filter, or share a new recipe!</p>
            </div>
        `;
        return;
    }
    
    // Create recipe cards
    filteredRecipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipesContainer.appendChild(recipeCard);
    });
}

// Create a recipe card element
function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.dataset.id = recipe.id;
    card.dataset.category = recipe.category;
    
    // Default image if none provided
    const imageUrl = recipe.image || 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
    
    // Truncate description for card view
    const description = recipe.story || 'A delicious recipe shared by ' + recipe.author;
    const truncatedDesc = description.length > 120 ? description.substring(0, 120) + '...' : description;
    
    card.innerHTML = `
        <div class="recipe-image">
            <img src="${imageUrl}" alt="${recipe.title}">
        </div>
        <div class="recipe-content">
            <h3 class="recipe-title">${recipe.title}</h3>
            <div class="recipe-meta">
                <span><i class="far fa-clock"></i> ${recipe.prepTime + recipe.cookTime} min</span>
                <span><i class="fas fa-user-friends"></i> ${recipe.servings} servings</span>
                <span><i class="fas fa-star"></i> ${recipe.rating || '4.5'}</span>
            </div>
            <p class="recipe-description">${truncatedDesc}</p>
            <div class="recipe-footer">
                <span class="recipe-category">${formatCategory(recipe.category)}</span>
                <button class="view-recipe-btn">View Recipe</button>
            </div>
        </div>
    `;
    
    // Add click event to view recipe button
    const viewBtn = card.querySelector('.view-recipe-btn');
    viewBtn.addEventListener('click', () => showRecipeModal(recipe.id));
    
    return card;
}

// Format category for display
function formatCategory(category) {
    const categoryMap = {
        'breakfast': 'Breakfast',
        'lunch': 'Lunch',
        'dinner': 'Dinner',
        'dessert': 'Dessert',
        'vegetarian': 'Vegetarian',
        'quick': 'Quick & Easy'
    };
    return categoryMap[category] || category;
}

// Filter recipes based on current filter and search
function filterRecipes(recipeList) {
    let filtered = recipeList;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(recipe => recipe.category === currentFilter);
    }
    
    // Apply search filter
    if (currentSearch) {
        const searchTerm = currentSearch.toLowerCase();
        filtered = filtered.filter(recipe => 
            recipe.title.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm)) ||
            recipe.author.toLowerCase().includes(searchTerm) ||
            (recipe.story && recipe.story.toLowerCase().includes(searchTerm))
        );
    }
    
    return filtered;
}

// Sort recipes based on current sort selection
function sortRecipes(recipeList) {
    const sorted = [...recipeList];
    
    switch(currentSort) {
        case 'newest':
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case 'oldest':
            sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
        case 'rating':
            sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        case 'time':
            sorted.sort((a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime));
            break;
    }
    
    return sorted;
}

// Show recipe modal with details
function showRecipeModal(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    const imageUrl = recipe.image || 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
    
    modalRecipeContent.innerHTML = `
        <div class="modal-recipe-header">
            <div class="modal-recipe-image">
                <img src="${imageUrl}" alt="${recipe.title}">
            </div>
            <div class="modal-recipe-info">
                <h2 class="modal-recipe-title">${recipe.title}</h2>
                <p class="modal-recipe-author">By ${recipe.author}</p>
                <div class="modal-recipe-stats">
                    <div>
                        <span>Prep Time</span>
                        <span>${recipe.prepTime} min</span>
                    </div>
                    <div>
                        <span>Cook Time</span>
                        <span>${recipe.cookTime} min</span>
                    </div>
                    <div>
                        <span>Servings</span>
                        <span>${recipe.servings}</span>
                    </div>
                    <div>
                        <span>Category</span>
                        <span>${formatCategory(recipe.category)}</span>
                    </div>
                </div>
                ${recipe.story ? `<div class="modal-recipe-story">"${recipe.story}"</div>` : ''}
            </div>
        </div>
        
        <div class="modal-recipe-section modal-recipe-ingredients">
            <h3>Ingredients</h3>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-recipe-section modal-recipe-instructions">
            <h3>Instructions</h3>
            <ol>
                ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
            </ol>
        </div>
    `;
    
    recipeModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update filter and display recipes
            currentFilter = button.dataset.category;
            displayRecipes();
            
            // Scroll to recipes section on mobile
            if (window.innerWidth < 768) {
                document.getElementById('recipes').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Search functionality
    searchBtn.addEventListener('click', () => {
        currentSearch = searchInput.value.trim();
        displayRecipes();
    });
    
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            currentSearch = searchInput.value.trim();
            displayRecipes();
        }
    });
    
    // Sort functionality
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        displayRecipes();
    });
    
    // Recipe form submission
    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addNewRecipe();
    });
    
    // Modal close button
    closeModal.addEventListener('click', () => {
        recipeModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === recipeModal) {
            recipeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Share recipe button scroll
    shareRecipeBtn.addEventListener('click', () => {
        document.getElementById('add-recipe').scrollIntoView({ behavior: 'smooth' });
        // Focus on first input
        document.getElementById('recipe-title').focus();
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                navLinks.style.display = 'none';
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.backgroundColor = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
            navLinks.style.width = 'auto';
        } else {
            navLinks.style.display = 'none';
        }
    });
}

// Setup category links in footer
function setupCategoryLinks() {
    document.querySelectorAll('.footer-section a[data-category]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            
            // Update active filter button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.category === category) {
                    btn.classList.add('active');
                }
            });
            
            // Update filter and display recipes
            currentFilter = category;
            displayRecipes();
            
            // Scroll to recipes section
            document.getElementById('recipes').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Add new recipe from form
function addNewRecipe() {
    // Get form values
    const title = document.getElementById('recipe-title').value.trim();
    const category = document.getElementById('recipe-category').value;
    const prepTime = parseInt(document.getElementById('prep-time').value);
    const cookTime = parseInt(document.getElementById('cook-time').value);
    const servings = parseInt(document.getElementById('servings').value);
    const image = document.getElementById('recipe-image').value.trim();
    const ingredients = document.getElementById('ingredients').value
        .split('\n')
        .filter(ing => ing.trim() !== '')
        .map(ing => ing.trim());
    const instructions = document.getElementById('instructions').value
        .split('\n')
        .filter(step => step.trim() !== '')
        .map(step => step.trim());
    const story = document.getElementById('recipe-story').value.trim();
    const author = document.getElementById('author-name').value.trim();
    
    // Validate required fields
    if (!title || !category || !prepTime || !cookTime || !servings || ingredients.length === 0 || instructions.length === 0 || !author) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Create new recipe object
    const newRecipe = {
        id: recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1,
        title,
        category,
        prepTime,
        cookTime,
        servings,
        image: image || null,
        ingredients,
        instructions,
        author,
        story: story || null,
        rating: 4.5, // Default rating
        createdAt: new Date()
    };
    
    // Add to recipes array
    recipes.unshift(newRecipe);
    
    // Save to localStorage
    localStorage.setItem('recipes', JSON.stringify(recipes));
    
    // Reset form
    recipeForm.reset();
    
    // Update display
    currentFilter = 'all';
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === 'all') {
            btn.classList.add('active');
        }
    });
    
    currentSearch = '';
    searchInput.value = '';
    
    displayRecipes();
    
    // Show success message
    alert('Recipe shared successfully!');
    
    // Scroll to top of recipes section
    document.getElementById('recipes').scrollIntoView({ behavior: 'smooth' });
}

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});