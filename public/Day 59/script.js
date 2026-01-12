// Meal Planner Application
class MealPlanner {
    constructor() {
        this.currentWeek = 1;
        this.mealsPerDay = 3;
        this.planDuration = 7;
        this.meals = {};
        this.shoppingList = new Set();
        this.templates = {
            breakfast: {
                name: "Quick Breakfast",
                description: "Oatmeal with mixed berries and honey",
                ingredients: ["1 cup rolled oats", "1 cup milk or water", "1/2 cup mixed berries", "1 tbsp honey", "Pinch of cinnamon"],
                recipe: ""
            },
            lunch: {
                name: "Healthy Lunch",
                description: "Grilled chicken salad with vinaigrette",
                ingredients: ["1 chicken breast", "2 cups mixed greens", "1/2 cucumber", "1 tomato", "2 tbsp olive oil", "1 tbsp lemon juice", "Salt and pepper to taste"],
                recipe: ""
            },
            dinner: {
                name: "Family Dinner",
                description: "Pasta with vegetables and tomato sauce",
                ingredients: ["8 oz pasta", "2 cups tomato sauce", "1 bell pepper", "1 zucchini", "1 onion", "2 cloves garlic", "Fresh basil", "Parmesan cheese"],
                recipe: ""
            }
        };
        
        this.daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
        
        this.init();
    }
    
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.generateCalendar();
        this.updateStats();
        this.updateShoppingList();
        this.populateDayDropdown();
    }
    
    setupEventListeners() {
        // Navigation
        document.getElementById('prev-week').addEventListener('click', () => this.prevWeek());
        document.getElementById('next-week').addEventListener('click', () => this.nextWeek());
        
        // Settings
        document.getElementById('apply-settings').addEventListener('click', () => this.applySettings());
        
        // Meal Editor
        document.getElementById('save-meal').addEventListener('click', () => this.saveMeal());
        document.getElementById('clear-form').addEventListener('click', () => this.clearForm());
        document.getElementById('save-template').addEventListener('click', () => this.saveAsTemplate());
        
        // Shopping List
        document.getElementById('clear-shopping').addEventListener('click', () => this.clearShoppingList());
        document.getElementById('print-shopping').addEventListener('click', () => this.printShoppingList());
        
        // Templates
        document.querySelectorAll('.use-template').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const template = e.target.closest('.template-card').dataset.template;
                this.useTemplate(template);
            });
        });
        
        // Import/Export
        document.getElementById('export-plan').addEventListener('click', () => this.exportPlan());
        document.getElementById('import-file').addEventListener('change', (e) => this.importPlan(e));
        
        // Other Actions
        document.getElementById('new-week').addEventListener('click', () => this.newWeek());
        document.getElementById('print-plan').addEventListener('click', () => this.printPlan());
        document.getElementById('help-btn').addEventListener('click', () => this.showHelp());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetAll());
        
        // Modal
        document.querySelector('.close-modal').addEventListener('click', () => this.hideHelp());
        document.getElementById('help-modal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.hideHelp();
        });
    }
    
    generateCalendar() {
        const grid = document.getElementById('calendar-grid');
        const mealsPerDay = this.mealsPerDay;
        
        // Generate header
        let html = `
            <div class="calendar-header" style="--meals-per-day: ${mealsPerDay}">
                <div>Day</div>
        `;
        
        for (let i = 0; i < mealsPerDay; i++) {
            html += `<div>${this.mealTypes[i] || `Meal ${i + 1}`}</div>`;
        }
        
        html += '</div><div class="calendar-days">';
        
        // Generate days
        for (let day = 0; day < this.planDuration; day++) {
            const date = this.getDateForDay(day);
            const dayName = this.daysOfWeek[day % 7];
            const fullDate = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
            });
            
            html += `
                <div class="calendar-day" style="--meals-per-day: ${mealsPerDay}" data-day="${day}">
                    <div class="day-header">
                        <div class="day-name">${dayName}</div>
                        <div class="date">${fullDate}</div>
                    </div>
            `;
            
            for (let mealIndex = 0; mealIndex < mealsPerDay; mealIndex++) {
                const mealType = this.mealTypes[mealIndex]?.toLowerCase() || `meal${mealIndex}`;
                const mealKey = `${this.currentWeek}-${day}-${mealType}`;
                const meal = this.meals[mealKey];
                
                if (meal) {
                    html += `
                        <div class="meal-slot filled" data-key="${mealKey}">
                            <div class="meal-content">
                                <div class="meal-title">${meal.name}</div>
                                <div class="meal-description">${meal.description}</div>
                                <div class="meal-ingredients">
                                    ${meal.ingredients.slice(0, 2).join(', ')}
                                    ${meal.ingredients.length > 2 ? `... (+${meal.ingredients.length - 2} more)` : ''}
                                </div>
                            </div>
                            <div class="meal-actions">
                                <button class="btn-icon edit-meal" data-key="${mealKey}">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn-icon delete-meal" data-key="${mealKey}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="meal-slot empty" data-day="${day}" data-meal-type="${mealType}">
                            <i class="fas fa-plus"></i>
                            <span>Add ${this.mealTypes[mealIndex] || 'Meal'}</span>
                        </div>
                    `;
                }
            }
            
            html += '</div>';
        }
        
        html += '</div>';
        grid.innerHTML = html;
        
        // Update week title
        const startDate = this.getDateForDay(0);
        const endDate = this.getDateForDay(this.planDuration - 1);
        const weekTitle = `Week ${this.currentWeek}: ${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        document.getElementById('week-title').textContent = weekTitle;
        
        // Add event listeners to meal slots
        this.addMealSlotListeners();
    }
    
    addMealSlotListeners() {
        // Empty slots
        document.querySelectorAll('.meal-slot.empty').forEach(slot => {
            slot.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-icon')) return;
                
                const day = slot.dataset.day;
                const mealType = slot.dataset.mealType;
                this.openEditorForNewMeal(parseInt(day), mealType);
            });
        });
        
        // Filled slots
        document.querySelectorAll('.meal-slot.filled').forEach(slot => {
            slot.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-icon')) return;
                
                const mealKey = slot.dataset.key;
                this.openEditorForExistingMeal(mealKey);
            });
        });
        
        // Edit buttons
        document.querySelectorAll('.edit-meal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const mealKey = btn.dataset.key;
                this.openEditorForExistingMeal(mealKey);
            });
        });
        
        // Delete buttons
        document.querySelectorAll('.delete-meal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const mealKey = btn.dataset.key;
                if (confirm('Are you sure you want to delete this meal?')) {
                    this.deleteMeal(mealKey);
                }
            });
        });
    }
    
    openEditorForNewMeal(day, mealType) {
        document.getElementById('meal-day').value = day;
        document.getElementById('meal-type').value = mealType;
        this.clearForm();
        document.getElementById('meal-name').focus();
    }
    
    openEditorForExistingMeal(mealKey) {
        const meal = this.meals[mealKey];
        if (!meal) return;
        
        const [week, day, type] = mealKey.split('-');
        document.getElementById('meal-day').value = day;
        document.getElementById('meal-type').value = type;
        document.getElementById('meal-name').value = meal.name;
        document.getElementById('meal-description').value = meal.description;
        document.getElementById('meal-ingredients').value = meal.ingredients.join('\n');
        document.getElementById('meal-recipe').value = meal.recipe || '';
        
        // Store current meal key for updating
        document.getElementById('save-meal').dataset.key = mealKey;
    }
    
    saveMeal() {
        const day = parseInt(document.getElementById('meal-day').value);
        const type = document.getElementById('meal-type').value;
        const name = document.getElementById('meal-name').value.trim();
        const description = document.getElementById('meal-description').value.trim();
        const ingredients = document.getElementById('meal-ingredients').value
            .split('\n')
            .map(i => i.trim())
            .filter(i => i);
        const recipe = document.getElementById('meal-recipe').value.trim();
        
        if (!name) {
            alert('Please enter a meal name');
            return;
        }
        
        const mealKey = document.getElementById('save-meal').dataset.key || 
                       `${this.currentWeek}-${day}-${type}`;
        
        // Remove old meal from shopping list if updating
        const oldMeal = this.meals[mealKey];
        if (oldMeal) {
            oldMeal.ingredients.forEach(ingredient => {
                this.removeFromShoppingList(ingredient);
            });
        }
        
        // Add new meal
        this.meals[mealKey] = {
            name,
            description,
            ingredients,
            recipe,
            type,
            day
        };
        
        // Add ingredients to shopping list
        ingredients.forEach(ingredient => {
            this.addToShoppingList(ingredient);
        });
        
        // Save and update
        this.saveToStorage();
        this.generateCalendar();
        this.updateStats();
        this.updateShoppingList();
        this.clearForm();
        
        // Show success message
        this.showNotification('Meal saved successfully!');
    }
    
    deleteMeal(mealKey) {
        const meal = this.meals[mealKey];
        if (!meal) return;
        
        // Remove ingredients from shopping list
        meal.ingredients.forEach(ingredient => {
            this.removeFromShoppingList(ingredient);
        });
        
        // Delete meal
        delete this.meals[mealKey];
        
        // Save and update
        this.saveToStorage();
        this.generateCalendar();
        this.updateStats();
        this.updateShoppingList();
        
        this.showNotification('Meal deleted');
    }
    
    clearForm() {
        document.getElementById('meal-name').value = '';
        document.getElementById('meal-description').value = '';
        document.getElementById('meal-ingredients').value = '';
        document.getElementById('meal-recipe').value = '';
        delete document.getElementById('save-meal').dataset.key;
    }
    
    useTemplate(templateName) {
        const template = this.templates[templateName];
        if (!template) return;
        
        document.getElementById('meal-name').value = template.name;
        document.getElementById('meal-description').value = template.description;
        document.getElementById('meal-ingredients').value = template.ingredients.join('\n');
        document.getElementById('meal-recipe').value = template.recipe || '';
        
        this.showNotification('Template loaded');
    }
    
    saveAsTemplate() {
        const name = document.getElementById('meal-name').value.trim();
        const description = document.getElementById('meal-description').value.trim();
        const ingredients = document.getElementById('meal-ingredients').value
            .split('\n')
            .map(i => i.trim())
            .filter(i => i);
        
        if (!name || !ingredients.length) {
            alert('Please enter meal name and ingredients to save as template');
            return;
        }
        
        const templateKey = name.toLowerCase().replace(/\s+/g, '_');
        this.templates[templateKey] = {
            name,
            description,
            ingredients,
            recipe: document.getElementById('meal-recipe').value.trim()
        };
        
        // Add to templates list
        const templatesList = document.getElementById('templates-list');
        const templateCard = document.createElement('div');
        templateCard.className = 'template-card';
        templateCard.dataset.template = templateKey;
        templateCard.innerHTML = `
            <h4>${name}</h4>
            <p>${description || 'No description'}</p>
            <button class="btn-icon use-template">
                <i class="fas fa-plus"></i>
            </button>
        `;
        templatesList.appendChild(templateCard);
        
        // Add event listener to new template button
        templateCard.querySelector('.use-template').addEventListener('click', () => {
            this.useTemplate(templateKey);
        });
        
        this.saveTemplatesToStorage();
        this.showNotification('Template saved successfully!');
    }
    
    addToShoppingList(ingredient) {
        this.shoppingList.add(ingredient.toLowerCase());
    }
    
    removeFromShoppingList(ingredient) {
        // Check if ingredient is used in any other meal
        const ingredientLower = ingredient.toLowerCase();
        let stillUsed = false;
        
        for (const mealKey in this.meals) {
            const meal = this.meals[mealKey];
            if (meal.ingredients.some(i => i.toLowerCase() === ingredientLower)) {
                stillUsed = true;
                break;
            }
        }
        
        if (!stillUsed) {
            this.shoppingList.delete(ingredientLower);
        }
    }
    
    updateShoppingList() {
        const shoppingListDiv = document.getElementById('shopping-list');
        
        if (this.shoppingList.size === 0) {
            shoppingListDiv.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-shopping-basket"></i>
                    <p>Your shopping list will appear here</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        Array.from(this.shoppingList).sort().forEach(ingredient => {
            html += `
                <div class="shopping-list-item">
                    <label>
                        <input type="checkbox">
                        <span>${ingredient}</span>
                    </label>
                </div>
            `;
        });
        
        shoppingListDiv.innerHTML = html;
        
        // Add checkbox event listeners
        shoppingListDiv.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const item = e.target.closest('.shopping-list-item');
                item.classList.toggle('checked', e.target.checked);
            });
        });
    }
    
    clearShoppingList() {
        if (confirm('Clear all items from shopping list?')) {
            this.shoppingList.clear();
            this.updateShoppingList();
            this.saveToStorage();
        }
    }
    
    applySettings() {
        this.mealsPerDay = parseInt(document.getElementById('meals-per-day').value);
        this.planDuration = parseInt(document.getElementById('plan-duration').value);
        this.generateCalendar();
        this.populateDayDropdown();
        this.showNotification('Settings applied');
    }
    
    populateDayDropdown() {
        const daySelect = document.getElementById('meal-day');
        daySelect.innerHTML = '';
        
        for (let i = 0; i < this.planDuration; i++) {
            const date = this.getDateForDay(i);
            const dayName = this.daysOfWeek[i % 7];
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${dayName} (${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
            daySelect.appendChild(option);
        }
    }
    
    prevWeek() {
        this.currentWeek--;
        if (this.currentWeek < 1) this.currentWeek = 1;
        this.generateCalendar();
    }
    
    nextWeek() {
        this.currentWeek++;
        this.generateCalendar();
    }
    
    newWeek() {
        this.currentWeek++;
        this.generateCalendar();
        this.showNotification('New week created');
    }
    
    updateStats() {
        const totalMeals = Object.keys(this.meals).length;
        const daysPlanned = new Set(Object.values(this.meals).map(m => m.day)).size;
        
        document.getElementById('total-meals').textContent = totalMeals;
        document.getElementById('shopping-items').textContent = this.shoppingList.size;
        document.getElementById('days-planned').textContent = daysPlanned;
    }
    
    getDateForDay(dayOffset) {
        const date = new Date();
        const currentDay = date.getDay();
        const diff = (currentDay === 0 ? 6 : currentDay - 1); // Adjust to Monday start
        
        // Calculate week offset
        const weekOffset = (this.currentWeek - 1) * 7;
        
        // Set date to the start of the current week (Monday)
        date.setDate(date.getDate() - diff + weekOffset + dayOffset);
        return date;
    }
    
    exportPlan() {
        const data = {
            meals: this.meals,
            shoppingList: Array.from(this.shoppingList),
            templates: this.templates,
            settings: {
                mealsPerDay: this.mealsPerDay,
                planDuration: this.planDuration,
                currentWeek: this.currentWeek
            }
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `meal-planner-week-${this.currentWeek}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Plan exported successfully');
    }
    
    importPlan(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                // Import meals
                if (data.meals) {
                    this.meals = data.meals;
                }
                
                // Import shopping list
                if (data.shoppingList) {
                    this.shoppingList = new Set(data.shoppingList);
                }
                
                // Import templates
                if (data.templates) {
                    this.templates = { ...this.templates, ...data.templates };
                    this.updateTemplatesList();
                }
                
                // Import settings
                if (data.settings) {
                    this.mealsPerDay = data.settings.mealsPerDay || this.mealsPerDay;
                    this.planDuration = data.settings.planDuration || this.planDuration;
                    this.currentWeek = data.settings.currentWeek || this.currentWeek;
                    
                    // Update UI controls
                    document.getElementById('meals-per-day').value = this.mealsPerDay;
                    document.getElementById('plan-duration').value = this.planDuration;
                }
                
                // Clear file input
                event.target.value = '';
                
                // Update everything
                this.generateCalendar();
                this.updateStats();
                this.updateShoppingList();
                this.populateDayDropdown();
                this.saveToStorage();
                
                this.showNotification('Plan imported successfully');
            } catch (error) {
                alert('Error importing plan: ' + error.message);
            }
        };
        reader.readAsText(file);
    }
    
    updateTemplatesList() {
        const templatesList = document.getElementById('templates-list');
        templatesList.innerHTML = '';
        
        for (const [key, template] of Object.entries(this.templates)) {
            const templateCard = document.createElement('div');
            templateCard.className = 'template-card';
            templateCard.dataset.template = key;
            templateCard.innerHTML = `
                <h4>${template.name}</h4>
                <p>${template.description || 'No description'}</p>
                <button class="btn-icon use-template">
                    <i class="fas fa-plus"></i>
                </button>
            `;
            templatesList.appendChild(templateCard);
            
            // Add event listener
            templateCard.querySelector('.use-template').addEventListener('click', () => {
                this.useTemplate(key);
            });
        }
    }
    
    printPlan() {
        window.print();
    }
    
    printShoppingList() {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Shopping List - Meal Planner Pro</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { color: #4CAF50; }
                        ul { list-style: none; padding: 0; }
                        li { padding: 5px 0; border-bottom: 1px solid #eee; }
                        .checked { text-decoration: line-through; color: #999; }
                    </style>
                </head>
                <body>
                    <h1>Shopping List</h1>
                    <ul>
                        ${Array.from(this.shoppingList).sort().map(item => 
                            `<li>${item}</li>`
                        ).join('')}
                    </ul>
                    <p>Total items: ${this.shoppingList.size}</p>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
    
    showHelp() {
        document.getElementById('help-modal').classList.add('active');
    }
    
    hideHelp() {
        document.getElementById('help-modal').classList.remove('active');
    }
    
    resetAll() {
        if (confirm('Are you sure you want to reset everything? This cannot be undone.')) {
            localStorage.clear();
            this.meals = {};
            this.shoppingList.clear();
            this.currentWeek = 1;
            this.mealsPerDay = 3;
            this.planDuration = 7;
            
            // Reset UI controls
            document.getElementById('meals-per-day').value = this.mealsPerDay;
            document.getElementById('plan-duration').value = this.planDuration;
            
            // Update everything
            this.generateCalendar();
            this.updateStats();
            this.updateShoppingList();
            this.populateDayDropdown();
            
            this.showNotification('All data has been reset');
        }
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Add animation styles
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    saveToStorage() {
        const data = {
            meals: this.meals,
            shoppingList: Array.from(this.shoppingList),
            currentWeek: this.currentWeek,
            mealsPerDay: this.mealsPerDay,
            planDuration: this.planDuration
        };
        localStorage.setItem('mealPlannerData', JSON.stringify(data));
    }
    
    saveTemplatesToStorage() {
        localStorage.setItem('mealPlannerTemplates', JSON.stringify(this.templates));
    }
    
    loadFromStorage() {
        // Load main data
        const savedData = localStorage.getItem('mealPlannerData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.meals = data.meals || {};
            this.shoppingList = new Set(data.shoppingList || []);
            this.currentWeek = data.currentWeek || 1;
            this.mealsPerDay = data.mealsPerDay || 3;
            this.planDuration = data.planDuration || 7;
            
            // Update UI controls
            document.getElementById('meals-per-day').value = this.mealsPerDay;
            document.getElementById('plan-duration').value = this.planDuration;
        }
        
        // Load templates
        const savedTemplates = localStorage.getItem('mealPlannerTemplates');
        if (savedTemplates) {
            const templates = JSON.parse(savedTemplates);
            this.templates = { ...this.templates, ...templates };
            this.updateTemplatesList();
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const mealPlanner = new MealPlanner();
});

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