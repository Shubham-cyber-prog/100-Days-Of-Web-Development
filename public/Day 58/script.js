// Initialize Chart.js
let expenseChart, trendChart;

// Current month tracking
let currentDate = new Date();

// Sample data
let transactions = [
    {
        id: 1,
        description: "Monthly Salary",
        amount: 3500,
        category: "salary",
        type: "income",
        date: new Date().toISOString()
    },
    {
        id: 2,
        description: "Grocery Shopping",
        amount: 150.75,
        category: "food",
        type: "expense",
        date: new Date().toISOString()
    },
    {
        id: 3,
        description: "Electricity Bill",
        amount: 85.50,
        category: "utilities",
        type: "expense",
        date: new Date().toISOString()
    },
    {
        id: 4,
        description: "Freelance Work",
        amount: 500,
        category: "freelance",
        type: "income",
        date: new Date().toISOString()
    }
];

// DOM Elements
const elements = {
    transactionForm: document.getElementById('transaction-form'),
    descriptionInput: document.getElementById('description'),
    amountInput: document.getElementById('amount'),
    categoryInput: document.getElementById('category'),
    typeInput: document.getElementById('type'),
    typeButtons: document.querySelectorAll('.type-btn'),
    transactionsList: document.getElementById('transactions-list'),
    totalIncome: document.getElementById('total-income'),
    totalExpenses: document.getElementById('total-expenses'),
    balance: document.getElementById('balance'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    currentMonth: document.getElementById('current-month'),
    prevMonthBtn: document.getElementById('prev-month'),
    nextMonthBtn: document.getElementById('next-month'),
    exportBtn: document.getElementById('export-btn'),
    resetBtn: document.getElementById('reset-btn')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateMonthDisplay();
    loadTransactions();
    updateSummary();
    initializeCharts();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Type selector buttons
    elements.typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            elements.typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            elements.typeInput.value = button.dataset.type;
        });
    });

    // Transaction form
    elements.transactionForm.addEventListener('submit', addTransaction);

    // Filter buttons
    elements.filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            elements.filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadTransactions(button.dataset.filter);
        });
    });

    // Month navigation
    elements.prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateMonthDisplay();
        loadTransactions();
    });

    elements.nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateMonthDisplay();
        loadTransactions();
    });

    // Export and Reset
    elements.exportBtn.addEventListener('click', exportData);
    elements.resetBtn.addEventListener('click', resetMonth);
}

// Update month display
function updateMonthDisplay() {
    const options = { year: 'numeric', month: 'long' };
    elements.currentMonth.textContent = currentDate.toLocaleDateString('en-US', options);
}

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    const description = elements.descriptionInput.value.trim();
    const amount = parseFloat(elements.amountInput.value);
    const category = elements.categoryInput.value;
    const type = elements.typeInput.value;

    if (!description || isNaN(amount) || amount <= 0 || !category) {
        alert('Please fill in all fields correctly');
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        category,
        type,
        date: new Date().toISOString()
    };

    transactions.unshift(transaction);
    
    // Clear form
    elements.descriptionInput.value = '';
    elements.amountInput.value = '';
    elements.categoryInput.value = '';
    
    // Update UI
    loadTransactions();
    updateSummary();
    updateCharts();
}

// Load transactions with filtering
function loadTransactions(filter = 'all') {
    elements.transactionsList.innerHTML = '';

    const filteredTransactions = transactions.filter(transaction => {
        if (filter === 'all') return true;
        return transaction.type === filter;
    });

    if (filteredTransactions.length === 0) {
        elements.transactionsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-receipt"></i>
                <p>No transactions found. Add your first transaction!</p>
            </div>
        `;
        return;
    }

    filteredTransactions.forEach(transaction => {
        const transactionElement = createTransactionElement(transaction);
        elements.transactionsList.appendChild(transactionElement);
    });
}

// Create transaction element
function createTransactionElement(transaction) {
    const div = document.createElement('div');
    div.className = 'transaction-item';
    div.dataset.id = transaction.id;

    const categoryNames = {
        'salary': 'Salary',
        'freelance': 'Freelance',
        'investment': 'Investment',
        'other-income': 'Other Income',
        'housing': 'Housing',
        'transportation': 'Transportation',
        'food': 'Food & Dining',
        'utilities': 'Utilities',
        'entertainment': 'Entertainment',
        'shopping': 'Shopping',
        'health': 'Health',
        'education': 'Education',
        'other-expense': 'Other Expense'
    };

    const icon = transaction.type === 'income' ? 'fa-plus-circle' : 'fa-minus-circle';
    const typeClass = transaction.type;

    div.innerHTML = `
        <div class="transaction-info">
            <div class="transaction-desc">${transaction.description}</div>
            <div class="transaction-category">${categoryNames[transaction.category]}</div>
        </div>
        <div class="transaction-details">
            <div class="transaction-amount ${typeClass}">
                <i class="fas ${icon}"></i>
                $${transaction.amount.toFixed(2)}
            </div>
            <div class="transaction-date">
                ${new Date(transaction.date).toLocaleDateString()}
            </div>
        </div>
        <div class="transaction-actions">
            <button class="delete-btn" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    // Add delete functionality
    const deleteBtn = div.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteTransaction(transaction.id));

    return div;
}

// Delete transaction
function deleteTransaction(id) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        loadTransactions();
        updateSummary();
        updateCharts();
    }
}

// Update summary
function updateSummary() {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    elements.totalIncome.textContent = `$${totalIncome.toFixed(2)}`;
    elements.totalExpenses.textContent = `$${totalExpenses.toFixed(2)}`;
    elements.balance.textContent = `$${balance.toFixed(2)}`;

    // Update balance color
    if (balance < 0) {
        elements.balance.style.color = '#e17055';
    } else {
        elements.balance.style.color = '#00b894';
    }
}

// Initialize charts
function initializeCharts() {
    const expenseCtx = document.getElementById('expenseChart').getContext('2d');
    const trendCtx = document.getElementById('trendChart').getContext('2d');

    // Expense Breakdown Chart
    expenseChart = new Chart(expenseCtx, {
        type: 'doughnut',
        data: {
            labels: ['Food', 'Housing', 'Transportation', 'Utilities', 'Entertainment', 'Shopping'],
            datasets: [{
                data: [150, 1200, 300, 200, 150, 100],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // Monthly Trend Chart
    trendChart = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Income',
                    data: [3000, 3200, 3100, 3500, 3400, 3600],
                    borderColor: '#43e97b',
                    backgroundColor: 'rgba(67, 233, 123, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Expenses',
                    data: [2500, 2700, 2600, 2800, 2900, 3000],
                    borderColor: '#fa709a',
                    backgroundColor: 'rgba(250, 112, 154, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Update charts
function updateCharts() {
    // Calculate expense breakdown from current transactions
    const expensesByCategory = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});

    // Update expense chart
    const expenseData = Object.values(expensesByCategory);
    const expenseLabels = Object.keys(expensesByCategory).map(cat => {
        const categoryNames = {
            'housing': 'Housing',
            'transportation': 'Transportation',
            'food': 'Food',
            'utilities': 'Utilities',
            'entertainment': 'Entertainment',
            'shopping': 'Shopping',
            'health': 'Health',
            'education': 'Education',
            'other-expense': 'Other'
        };
        return categoryNames[cat] || cat;
    });

    expenseChart.data.labels = expenseLabels;
    expenseChart.data.datasets[0].data = expenseData;
    expenseChart.update();
}

// Export data
function exportData() {
    const data = {
        transactions,
        summary: {
            totalIncome: parseFloat(elements.totalIncome.textContent.replace('$', '')),
            totalExpenses: parseFloat(elements.totalExpenses.textContent.replace('$', '')),
            balance: parseFloat(elements.balance.textContent.replace('$', ''))
        },
        exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `budget-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Reset month
function resetMonth() {
    if (confirm('Are you sure you want to reset all transactions for this month?')) {
        transactions = [];
        loadTransactions();
        updateSummary();
        updateCharts();
    }
}

// Additional utility: Import data
function importData(jsonData) {
    try {
        const data = JSON.parse(jsonData);
        transactions = data.transactions || [];
        loadTransactions();
        updateSummary();
        updateCharts();
        alert('Data imported successfully!');
    } catch (error) {
        alert('Error importing data. Please check the file format.');
    }
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