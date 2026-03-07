// LocalStorage Manager
class StorageManager {
    constructor() {
        this.keys = {
            TRANSACTIONS: 'finance_transactions',
            BUDGETS: 'finance_budgets',
            GOALS: 'finance_goals',
            INSIGHTS: 'finance_insights',
            SETTINGS: 'finance_settings'
        };
        
        this.initializeStorage();
    }
    
    initializeStorage() {
        // Initialize with sample data if empty
        if (!this.getTransactions().length) {
            this.setSampleData();
        }
    }
    
    // Transactions
    getTransactions() {
        return JSON.parse(localStorage.getItem(this.keys.TRANSACTIONS) || '[]');
    }
    
    saveTransaction(transaction) {
        const transactions = this.getTransactions();
        transaction.id = Date.now();
        transaction.createdAt = new Date().toISOString();
        transactions.push(transaction);
        localStorage.setItem(this.keys.TRANSACTIONS, JSON.stringify(transactions));
        return transaction;
    }
    
    deleteTransaction(id) {
        const transactions = this.getTransactions();
        const filtered = transactions.filter(t => t.id !== id);
        localStorage.setItem(this.keys.TRANSACTIONS, JSON.stringify(filtered));
    }
    
    // Budgets
    getBudgets() {
        return JSON.parse(localStorage.getItem(this.keys.BUDGETS) || '[]');
    }
    
    saveBudget(budget) {
        const budgets = this.getBudgets();
        budget.id = Date.now();
        budgets.push(budget);
        localStorage.setItem(this.keys.BUDGETS, JSON.stringify(budgets));
        return budget;
    }
    
    updateBudget(id, updates) {
        const budgets = this.getBudgets();
        const index = budgets.findIndex(b => b.id === id);
        if (index !== -1) {
            budgets[index] = { ...budgets[index], ...updates };
            localStorage.setItem(this.keys.BUDGETS, JSON.stringify(budgets));
        }
    }
    
    // Goals
    getGoals() {
        return JSON.parse(localStorage.getItem(this.keys.GOALS) || '[]');
    }
    
    saveGoal(goal) {
        const goals = this.getGoals();
        goal.id = Date.now();
        goal.createdAt = new Date().toISOString();
        goal.progress = 0;
        goals.push(goal);
        localStorage.setItem(this.keys.GOALS, JSON.stringify(goals));
        return goal;
    }
    
    updateGoalProgress(id, amount) {
        const goals = this.getGoals();
        const goal = goals.find(g => g.id === id);
        if (goal) {
            goal.progress = Math.min(goal.progress + amount, goal.targetAmount);
            goal.progressPercentage = (goal.progress / goal.targetAmount * 100).toFixed(1);
            localStorage.setItem(this.keys.GOALS, JSON.stringify(goals));
        }
    }
    
    // Insights
    getInsights() {
        return JSON.parse(localStorage.getItem(this.keys.INSIGHTS) || '[]');
    }
    
    saveInsight(insight) {
        const insights = this.getInsights();
        insight.id = Date.now();
        insight.createdAt = new Date().toISOString();
        insights.unshift(insight); // Add to beginning
        if (insights.length > 10) insights.pop(); // Keep only 10
        localStorage.setItem(this.keys.INSIGHTS, JSON.stringify(insights));
        return insight;
    }
    
    // Settings
    getSettings() {
        return JSON.parse(localStorage.getItem(this.keys.SETTINGS) || '{}');
    }
    
    saveSettings(settings) {
        localStorage.setItem(this.keys.SETTINGS, JSON.stringify(settings));
    }
    
    // Sample Data
    setSampleData() {
        const sampleTransactions = [
            {
                id: 1,
                description: "Grocery Shopping",
                amount: 2500,
                category: "food",
                type: "expense",
                date: new Date().toISOString()
            },
            {
                id: 2,
                description: "Salary",
                amount: 50000,
                category: "salary",
                type: "income",
                date: new Date().toISOString()
            },
            {
                id: 3,
                description: "Netflix Subscription",
                amount: 649,
                category: "entertainment",
                type: "expense",
                date: new Date().toISOString()
            }
        ];
        
        const sampleBudgets = [
            {
                id: 1,
                name: "Monthly Food",
                category: "food",
                amount: 10000,
                period: "monthly",
                spent: 2500
            }
        ];
        
        const sampleGoals = [
            {
                id: 1,
                name: "Emergency Fund",
                targetAmount: 100000,
                targetDate: "2024-12-31",
                currentAmount: 25000,
                progress: 25
            }
        ];
        
        localStorage.setItem(this.keys.TRANSACTIONS, JSON.stringify(sampleTransactions));
        localStorage.setItem(this.keys.BUDGETS, JSON.stringify(sampleBudgets));
        localStorage.setItem(this.keys.GOALS, JSON.stringify(sampleGoals));
    }
    
    // Clear all data
    clearAllData() {
        localStorage.removeItem(this.keys.TRANSACTIONS);
        localStorage.removeItem(this.keys.BUDGETS);
        localStorage.removeItem(this.keys.GOALS);
        localStorage.removeItem(this.keys.INSIGHTS);
        this.initializeStorage();
        location.reload();
    }
    
    // Export data
    exportData() {
        const data = {
            transactions: this.getTransactions(),
            budgets: this.getBudgets(),
            goals: this.getGoals(),
            insights: this.getInsights(),
            settings: this.getSettings(),
            exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `finance-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Import data
    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.transactions) {
                    localStorage.setItem(this.keys.TRANSACTIONS, JSON.stringify(data.transactions));
                }
                if (data.budgets) {
                    localStorage.setItem(this.keys.BUDGETS, JSON.stringify(data.budgets));
                }
                if (data.goals) {
                    localStorage.setItem(this.keys.GOALS, JSON.stringify(data.goals));
                }
                
                alert('Data imported successfully!');
                location.reload();
            } catch (error) {
                alert('Error importing data: Invalid file format');
            }
        };
        reader.readAsText(file);
    }
}