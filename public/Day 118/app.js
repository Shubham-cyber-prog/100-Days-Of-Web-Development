import { StorageManager } from './modules/storage.js';
import { AIEngine } from './modules/ai-engine.js';
import { CategoryManager } from './modules/categories.js';
import { ChartManager } from './modules/charts.js';

class FinanceApp {
    constructor() {
        this.storage = new StorageManager();
        this.aiEngine = new AIEngine(this.storage);
        this.categoryManager = new CategoryManager();
        this.chartManager = new ChartManager();
        this.currentPage = 'dashboard';
        
        this.initializeApp();
    }
    
    initializeApp() {
        this.setupEventListeners();
        this.loadCategoryOptions();
        this.renderDashboard();
        this.setupAIChat();
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                this.switchPage(page);
            });
        });
        
        // Transaction form
        document.getElementById('transactionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTransaction();
        });
        
        // Budget form
        document.getElementById('budgetForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBudget();
        });
        
        // Month filter
        document.getElementById('monthFilter').addEventListener('change', () => {
            this.renderExpenses();
        });
        
        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.renderExpenses();
        });
        
        // Set default date to today
        document.getElementById('transDate').valueAsDate = new Date();
    }
    
    loadCategoryOptions() {
        const categories = this.categoryManager.getAllCategories();
        const expenseCategories = categories.filter(cat => cat.id !== 'income');
        
        // Load into transaction category select
        const transCategorySelect = document.getElementById('transCategory');
        transCategorySelect.innerHTML = expenseCategories
            .map(cat => `<option value="${cat.id}">${cat.name}</option>`)
            .join('');
        
        // Load into budget category select
        const budgetCategorySelect = document.getElementById('budgetCategory');
        budgetCategorySelect.innerHTML = expenseCategories
            .map(cat => `<option value="${cat.id}">${cat.name}</option>`)
            .join('');
        
        // Load into filter select
        const categoryFilter = document.getElementById('categoryFilter');
        categoryFilter.innerHTML = 
            '<option value="all">All Categories</option>' +
            expenseCategories
                .map(cat => `<option value="${cat.id}">${cat.name}</option>`)
                .join('');
    }
    
    switchPage(page) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });
        
        // Show selected page
        document.getElementById(`${page}-page`).classList.add('active');
        
        // Render page content
        this.currentPage = page;
        
        switch(page) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'expenses':
                this.renderExpenses();
                break;
            case 'budget':
                this.renderBudgets();
                break;
            case 'goals':
                this.renderGoals();
                break;
            case 'insights':
                this.renderInsights();
                break;
        }
    }
    
    renderDashboard() {
        const transactions = this.storage.getTransactions();
        const budgets = this.storage.getBudgets();
        const goals = this.storage.getGoals();
        
        // Calculate stats
        const totalBalance = this.calculateBalance(transactions);
        const monthSpend = this.calculateMonthlySpend(transactions);
        const budgetUsed = this.calculateBudgetUsage(budgets, transactions);
        const savingsRate = this.calculateSavingsRate(transactions);
        
        // Update UI
        document.getElementById('totalBalance').textContent = `₹${totalBalance.toLocaleString()}`;
        document.getElementById('monthSpend').textContent = `₹${monthSpend.toLocaleString()}`;
        document.getElementById('budgetUsed').textContent = `${budgetUsed}%`;
        document.getElementById('budgetProgress').style.width = `${Math.min(budgetUsed, 100)}%`;
        document.getElementById('savingsRate').textContent = `${savingsRate}%`;
        
        // Update financial health score
        const healthScore = this.aiEngine.calculateFinancialHealth(transactions, budgets, goals);
        document.getElementById('healthScore').textContent = healthScore;
        
        // Render charts
        this.chartManager.renderCategoryChart(transactions);
        this.chartManager.renderTrendChart(transactions);
        
        // Render recent transactions
        this.renderRecentTransactions(transactions.slice(-5).reverse());
        
        // Generate and save insights
        const insights = this.aiEngine.generateSpendingInsights(transactions);
        insights.forEach(insight => this.storage.saveInsight(insight));
    }
    
    renderExpenses() {
        const transactions = this.storage.getTransactions();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const monthFilter = document.getElementById('monthFilter').value;
        
        let filteredTransactions = [...transactions].reverse();
        
        // Apply filters
        if (categoryFilter !== 'all') {
            filteredTransactions = filteredTransactions.filter(t => t.category === categoryFilter);
        }
        
        if (monthFilter) {
            const [year, month] = monthFilter.split('-');
            filteredTransactions = filteredTransactions.filter(t => {
                const date = new Date(t.date);
                return date.getFullYear() === parseInt(year) && 
                       date.getMonth() === parseInt(month) - 1;
            });
        }
        
        // Render transactions
        const container = document.getElementById('expensesList');
        
        if (filteredTransactions.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-receipt fa-3x"></i>
                    <h3>No transactions found</h3>
                    <p>Add your first transaction to get started!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = filteredTransactions.map(transaction => `
            <div class="transaction-item">
                <div>
                    <h4>${transaction.description}</h4>
                    <span class="date">${new Date(transaction.date).toLocaleDateString()}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span class="transaction-category" style="background: ${this.categoryManager.getCategoryColor(transaction.category)}">
                        ${this.categoryManager.getCategoryName(transaction.category)}
                    </span>
                    <span class="amount ${transaction.type}">
                        ${transaction.type === 'expense' ? '-' : '+'}₹${transaction.amount.toLocaleString()}
                    </span>
                    <button onclick="app.deleteTransaction(${transaction.id})" class="btn-delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    renderBudgets() {
        const budgets = this.storage.getBudgets();
        const transactions = this.storage.getTransactions();
        const currentMonth = new Date().getMonth();
        
        const container = document.getElementById('budgetsList');
        
        if (budgets.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-wallet fa-3x"></i>
                    <h3>No budgets set</h3>
                    <p>Create your first budget to track spending!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = budgets.map(budget => {
            const spent = transactions
                .filter(t => t.category === budget.category && 
                       new Date(t.date).getMonth() === currentMonth)
                .reduce((sum, t) => sum + t.amount, 0);
            
            const percentage = (spent / budget.amount * 100).toFixed(1);
            const remaining = budget.amount - spent;
            
            return `
                <div class="budget-card">
                    <div class="budget-header">
                        <h3>${budget.name}</h3>
                        <span class="budget-category">
                            ${this.categoryManager.getCategoryName(budget.category)}
                        </span>
                    </div>
                    <div class="budget-progress">
                        <div class="progress-info">
                            <span>₹${spent.toLocaleString()} spent</span>
                            <span>₹${remaining.toLocaleString()} remaining</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.min(percentage, 100)}%; 
                                 background: ${percentage > 100 ? '#FF6B6B' : '#06D6A0'}"></div>
                        </div>
                        <div class="progress-percentage">
                            ${percentage}% of ₹${budget.amount.toLocaleString()}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    renderGoals() {
        const goals = this.storage.getGoals();
        const container = document.getElementById('goalsList');
        
        if (goals.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bullseye fa-3x"></i>
                    <h3>No goals set</h3>
                    <p>Set your first financial goal!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = goals.map(goal => {
            const progressPercentage = (goal.progress / goal.targetAmount * 100).toFixed(1);
            const daysLeft = Math.ceil((new Date(goal.targetDate) - new Date()) / (1000 * 60 * 60 * 24));
            
            return `
                <div class="goal-card">
                    <div class="goal-header">
                        <h3>${goal.name}</h3>
                        <span class="goal-deadline">
                            ${daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                        </span>
                    </div>
                    <div class="goal-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                        </div>
                        <div class="progress-info">
                            <span>₹${goal.progress.toLocaleString()} saved</span>
                            <span>₹${goal.targetAmount.toLocaleString()} target</span>
                        </div>
                    </div>
                    <div class="goal-actions">
                        <button onclick="app.addToGoal(${goal.id}, 1000)" class="btn-small">
                            Add ₹1,000
                        </button>
                        <button onclick="app.addToGoal(${goal.id}, 5000)" class="btn-small">
                            Add ₹5,000
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    renderInsights() {
        const insights = this.storage.getInsights();
        const container = document.getElementById('aiInsights');
        
        if (insights.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-brain fa-3x"></i>
                    <h3>No insights yet</h3>
                    <p>Add some transactions to generate AI insights!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = insights.map(insight => `
            <div class="insight-card ${insight.priority}">
                <div class="insight-icon">
                    <i class="${insight.icon}"></i>
                </div>
                <div class="insight-content">
                    <h4>${insight.title}</h4>
                    <p>${insight.message}</p>
                    <span class="insight-time">
                        ${new Date(insight.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
        `).join('');
    }
    
    renderRecentTransactions(transactions) {
        const container = document.getElementById('recentTransactions');
        
        if (transactions.length === 0) {
            container.innerHTML = '<p class="empty">No recent transactions</p>';
            return;
        }
        
        container.innerHTML = transactions.map(transaction => `
            <div class="transaction-item">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div class="transaction-icon" style="background: ${this.categoryManager.getCategoryColor(transaction.category)}">
                        <i class="${this.categoryManager.getCategoryIcon(transaction.category)}"></i>
                    </div>
                    <div>
                        <h4>${transaction.description}</h4>
                        <span class="date">${new Date(transaction.date).toLocaleDateString()}</span>
                    </div>
                </div>
                <span class="amount ${transaction.type}">
                    ${transaction.type === 'expense' ? '-' : '+'}₹${transaction.amount.toLocaleString()}
                </span>
            </div>
        `).join('');
    }
    
    // Transaction Management
    addTransaction() {
        const description = document.getElementById('transDesc').value;
        const amount = parseFloat(document.getElementById('transAmount').value);
        const category = document.getElementById('transCategory').value;
        const type = document.getElementById('transType').value;
        const date = document.getElementById('transDate').value;
        
        // Auto-categorize using AI if category is "other"
        let finalCategory = category;
        if (category === 'other') {
            finalCategory = this.aiEngine.categorizeTransaction(description);
        }
        
        const transaction = {
            description,
            amount,
            category: finalCategory,
            type,
            date
        };
        
        this.storage.saveTransaction(transaction);
        this.closeModal('transactionModal');
        this.clearForm('transactionForm');
        
        // Refresh current view
        this.renderDashboard();
        this.showNotification('Transaction added successfully!', 'success');
    }
    
    deleteTransaction(id) {
        if (confirm('Are you sure you want to delete this transaction?')) {
            this.storage.deleteTransaction(id);
            this.renderDashboard();
            this.showNotification('Transaction deleted!', 'success');
        }
    }
    
    // Budget Management
    addBudget() {
        const name = document.getElementById('budgetName').value;
        const category = document.getElementById('budgetCategory').value;
        const amount = parseFloat(document.getElementById('budgetAmount').value);
        const period = document.getElementById('budgetPeriod').value;
        
        const budget = {
            name,
            category,
            amount,
            period,
            spent: 0
        };
        
        this.storage.saveBudget(budget);
        this.closeModal('budgetModal');
        this.clearForm('budgetForm');
        
        this.renderBudgets();
        this.showNotification('Budget created successfully!', 'success');
    }
    
    // Goal Management
    addToGoal(goalId, amount) {
        this.storage.updateGoalProgress(goalId, amount);
        this.renderGoals();
        this.showNotification(`Added ₹${amount} to goal!`, 'success');
    }
    
    // Calculations
    calculateBalance(transactions) {
        return transactions.reduce((total, t) => {
            return t.type === 'income' ? total + t.amount : total - t.amount;
        }, 0);
    }
    
    calculateMonthlySpend(transactions) {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        return transactions
            .filter(t => t.type === 'expense' && 
                   new Date(t.date).getMonth() === currentMonth &&
                   new Date(t.date).getFullYear() === currentYear)
            .reduce((sum, t) => sum + t.amount, 0);
    }
    
    calculateBudgetUsage(budgets, transactions) {
        if (budgets.length === 0) return 0;
        
        const currentMonth = new Date().getMonth();
        let totalBudget = 0;
        let totalSpent = 0;
        
        budgets.forEach(budget => {
            totalBudget += budget.amount;
            const spent = transactions
                .filter(t => t.category === budget.category && 
                       new Date(t.date).getMonth() === currentMonth)
                .reduce((sum, t) => sum + t.amount, 0);
            totalSpent += spent;
        });
        
        return totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
    }
    
    calculateSavingsRate(transactions) {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const income = transactions
            .filter(t => t.type === 'income' && 
                   new Date(t.date).getMonth() === currentMonth &&
                   new Date(t.date).getFullYear() === currentYear)
            .reduce((sum, t) => sum + t.amount, 0);
        
        const expenses = transactions
            .filter(t => t.type === 'expense' && 
                   new Date(t.date).getMonth() === currentMonth &&
                   new Date(t.date).getFullYear() === currentYear)
            .reduce((sum, t) => sum + t.amount, 0);
        
        if (income === 0) return 0;
        
        return Math.round(((income - expenses) / income) * 100);
    }
    
    // Modal Controls
    showAddTransaction() {
        document.getElementById('transactionModal').style.display = 'flex';
    }
    
    showAddBudget() {
        document.getElementById('budgetModal').style.display = 'flex';
    }
    
    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }
    
    clearForm(formId) {
        document.getElementById(formId).reset();
        document.getElementById('transDate').valueAsDate = new Date();
    }
    
    // AI Insights
    generateInsights() {
        const transactions = this.storage.getTransactions();
        const insights = this.aiEngine.generateSpendingInsights(transactions);
        
        // Save and display insights
        insights.forEach(insight => this.storage.saveInsight(insight));
        this.renderInsights();
        this.showNotification('New insights generated!', 'success');
    }
    
    // AI Chat Setup
    setupAIChat() {
        window.toggleAIChat = () => {
            const chat = document.getElementById('aiChat');
            chat.style.display = chat.style.display === 'block' ? 'none' : 'block';
        };
        
        window.sendMessage = () => {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (message) {
                // Add user message
                this.addChatMessage(message, 'user');
                input.value = '';
                
                // Get AI response
                setTimeout(() => {
                    const response = this.aiEngine.generateChatResponse(message);
                    this.addChatMessage(response, 'ai');
                }, 500);
            }
        };
        
        // Allow Enter key to send message
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    addChatMessage(message, sender) {
        const container = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = message;
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }
    
    // Utility
    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Export/Import
    exportData() {
        this.storage.exportData();
    }
    
    importData(event) {
        const file = event.target.files[0];
        if (file) {
            this.storage.importData(file);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new FinanceApp();
    
    // Make functions available globally for HTML onclick
    window.showAddTransaction = () => app.showAddTransaction();
    window.showAddBudget = () => app.showAddBudget();
    window.showAddGoal = () => app.showAddGoal();
    window.generateInsights = () => app.generateInsights();
    window.closeModal = (id) => app.closeModal(id);
    window.toggleAIChat = () => window.toggleAIChat();
    window.sendMessage = () => window.sendMessage();
});