let expenses = [];

// DOM Elements
const form = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const categorySelect = document.getElementById('expense-category');
const totalAmountEl = document.getElementById('total-amount');
const expensesContainer = document.getElementById('expenses-container');

// Load expenses from localStorage on page load
function loadExpenses() {
    const stored = localStorage.getItem('expenses');
    if (stored) {
        expenses = JSON.parse(stored);
        renderExpenses();
        updateTotal();
    }
}

// Save expenses to localStorage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Add expense
function addExpense(name, amount, category) {
    const expense = {
        id: Date.now(),
        name: name,
        amount: parseFloat(amount),
        category: category
    };
    
    expenses.push(expense);
    saveExpenses();
    renderExpenses();
    updateTotal();
}

// Delete expense
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveExpenses();
    renderExpenses();
    updateTotal();
}

// Render expenses list
function renderExpenses() {
    if (expenses.length === 0) {
        expensesContainer.innerHTML = '<div class="empty-state">No expenses yet. Add your first expense above!</div>';
        return;
    }

    expensesContainer.innerHTML = expenses.map(expense => `
        <div class="expense-item">
            <div class="expense-details">
                <div class="expense-name">${escapeHtml(expense.name)}</div>
                <span class="expense-category">${escapeHtml(expense.category)}</span>
            </div>
            <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
            <button class="delete-btn" data-id="${expense.id}">Delete</button>
        </div>
    `).join('');

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            deleteExpense(id);
        });
    });
}

// Update total amount
function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountEl.textContent = `$${total.toFixed(2)}`;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Validate input
function validateInput(name, amount) {
    let isValid = true;

    // Reset error states
    nameInput.classList.remove('error');
    amountInput.classList.remove('error');

    // Validate name
    if (!name.trim()) {
        nameInput.classList.add('error');
        isValid = false;
    }

    // Validate amount
    if (!amount || parseFloat(amount) <= 0) {
        amountInput.classList.add('error');
        isValid = false;
    }

    return isValid;
}

// Form submit handler
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = nameInput.value;
    const amount = amountInput.value;
    const category = categorySelect.value;

    if (validateInput(name, amount)) {
        addExpense(name, amount, category);
        
        // Clear form
        nameInput.value = '';
        amountInput.value = '';
        categorySelect.value = 'Food';
        
        // Remove error states
        nameInput.classList.remove('error');
        amountInput.classList.remove('error');
    }
});

// Load expenses on page load
loadExpenses();