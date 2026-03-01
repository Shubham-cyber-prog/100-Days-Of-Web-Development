// AI Engine for Financial Insights
class AIEngine {
    constructor(storage) {
        this.storage = storage;
        this.categories = {
            food: ['grocery', 'restaurant', 'food', 'lunch', 'dinner', 'breakfast'],
            transportation: ['fuel', 'uber', 'taxi', 'bus', 'train', 'flight'],
            entertainment: ['movie', 'netflix', 'spotify', 'game', 'concert'],
            shopping: ['clothes', 'electronics', 'amazon', 'flipkart'],
            bills: ['electricity', 'water', 'internet', 'phone'],
            salary: ['salary', 'paycheck', 'income'],
            investment: ['stocks', 'mutual fund', 'bitcoin'],
            health: ['medicine', 'doctor', 'hospital', 'gym']
        };
    }
    
    // Categorize transaction based on description
    categorizeTransaction(description) {
        const desc = description.toLowerCase();
        
        for (const [category, keywords] of Object.entries(this.categories)) {
            if (keywords.some(keyword => desc.includes(keyword))) {
                return category;
            }
        }
        
        // Use ML-like prediction (simple keyword matching)
        if (desc.includes('rent') || desc.includes('mortgage')) return 'housing';
        if (desc.includes('coffee') || desc.includes('cafe')) return 'food';
        if (desc.includes('book')) return 'education';
        
        return 'other';
    }
    
    // Generate spending insights
    generateSpendingInsights(transactions) {
        const insights = [];
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        // Filter current month transactions
        const monthlyExpenses = transactions.filter(t => {
            const date = new Date(t.date);
            return t.type === 'expense' && 
                   date.getMonth() === currentMonth &&
                   date.getFullYear() === currentYear;
        });
        
        // Calculate category spending
        const categorySpending = {};
        monthlyExpenses.forEach(t => {
            categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
        });
        
        // Find top spending category
        const topCategory = Object.entries(categorySpending)
            .sort(([,a], [,b]) => b - a)[0];
        
        if (topCategory) {
            insights.push({
                type: 'spending_pattern',
                title: 'Top Spending Category',
                message: `You spent ₹${topCategory[1]} on ${topCategory[0]} this month. Consider setting a budget for this category.`,
                icon: 'fas fa-chart-pie',
                priority: 'high'
            });
        }
        
        // Compare with previous month
        const prevMonthExpenses = transactions.filter(t => {
            const date = new Date(t.date);
            return t.type === 'expense' && 
                   date.getMonth() === currentMonth - 1 &&
                   date.getFullYear() === currentYear;
        });
        
        const currentTotal = monthlyExpenses.reduce((sum, t) => sum + t.amount, 0);
        const prevTotal = prevMonthExpenses.reduce((sum, t) => sum + t.amount, 0);
        
        if (prevTotal > 0) {
            const change = ((currentTotal - prevTotal) / prevTotal * 100).toFixed(1);
            if (Math.abs(change) > 10) {
                insights.push({
                    type: 'spending_trend',
                    title: 'Spending Trend Alert',
                    message: `Your spending ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(change)}% compared to last month.`,
                    icon: change > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down',
                    priority: 'medium'
                });
            }
        }
        
        // Budget alerts
        const budgets = this.storage.getBudgets();
        budgets.forEach(budget => {
            const spent = monthlyExpenses
                .filter(t => t.category === budget.category)
                .reduce((sum, t) => sum + t.amount, 0);
            
            const percentage = (spent / budget.amount * 100);
            
            if (percentage > 80 && percentage < 100) {
                insights.push({
                    type: 'budget_alert',
                    title: 'Budget Alert',
                    message: `You've used ${percentage.toFixed(1)}% of your ${budget.name} budget.`,
                    icon: 'fas fa-exclamation-triangle',
                    priority: 'medium'
                });
            } else if (percentage >= 100) {
                insights.push({
                    type: 'budget_exceeded',
                    title: 'Budget Exceeded!',
                    message: `You've exceeded your ${budget.name} budget by ${(percentage - 100).toFixed(1)}%.`,
                    icon: 'fas fa-times-circle',
                    priority: 'high'
                });
            }
        });
        
        // Savings opportunity
        const monthlyIncome = transactions
            .filter(t => t.type === 'income' && new Date(t.date).getMonth() === currentMonth)
            .reduce((sum, t) => sum + t.amount, 0);
        
        if (monthlyIncome > 0) {
            const savingsRate = ((monthlyIncome - currentTotal) / monthlyIncome * 100).toFixed(1);
            
            if (savingsRate < 20) {
                insights.push({
                    type: 'savings_tip',
                    title: 'Savings Opportunity',
                    message: `Your savings rate is ${savingsRate}%. Try to save at least 20% of your income.`,
                    icon: 'fas fa-piggy-bank',
                    priority: 'low'
                });
            }
        }
        
        return insights;
    }
    
    // Predict next month spending
    predictNextMonthSpending(transactions) {
        const predictions = [];
        const last6Months = [];
        const now = new Date();
        
        // Collect last 6 months data
        for (let i = 0; i < 6; i++) {
            const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthlyExpenses = transactions.filter(t => {
                const date = new Date(t.date);
                return t.type === 'expense' &&
                       date.getMonth() === month.getMonth() &&
                       date.getFullYear() === month.getFullYear();
            });
            
            const total = monthlyExpenses.reduce((sum, t) => sum + t.amount, 0);
            last6Months.push(total);
        }
        
        // Simple moving average prediction
        const avg = last6Months.reduce((sum, val) => sum + val, 0) / last6Months.length;
        predictions.push({
            category: 'overall',
            predicted: Math.round(avg),
            confidence: 'medium'
        });
        
        return predictions;
    }
    
    // Generate financial health score
    calculateFinancialHealth(transactions, budgets, goals) {
        let score = 100;
        
        // Factor 1: Emergency fund (max 25 points)
        const savingsGoals = goals.filter(g => g.name.toLowerCase().includes('emergency'));
        if (savingsGoals.length > 0) {
            const goal = savingsGoals[0];
            const progress = (goal.progress / goal.targetAmount) * 100;
            score += Math.min(progress * 0.25, 25);
        }
        
        // Factor 2: Budget adherence (max 25 points)
        const currentMonth = new Date().getMonth();
        const monthlyExpenses = transactions.filter(t => 
            t.type === 'expense' && new Date(t.date).getMonth() === currentMonth
        );
        
        let budgetScore = 0;
        budgets.forEach(budget => {
            const spent = monthlyExpenses
                .filter(t => t.category === budget.category)
                .reduce((sum, t) => sum + t.amount, 0);
            
            const percentage = (spent / budget.amount) * 100;
            if (percentage <= 100) {
                budgetScore += (100 - percentage) / 100 * 25;
            }
        });
        
        score += Math.min(budgetScore / budgets.length, 25);
        
        // Factor 3: Debt-to-income ratio (max 25 points)
        const monthlyIncome = transactions
            .filter(t => t.type === 'income' && new Date(t.date).getMonth() === currentMonth)
            .reduce((sum, t) => sum + t.amount, 0);
        
        if (monthlyIncome > 0) {
            const savingsRate = ((monthlyIncome - monthlyExpenses.reduce((s, t) => s + t.amount, 0)) / monthlyIncome) * 100;
            score += Math.min(savingsRate, 25);
        }
        
        // Factor 4: Spending diversity (max 25 points)
        const categories = new Set(monthlyExpenses.map(t => t.category));
        const diversityScore = (categories.size / 8) * 25; // 8 is max expected categories
        score += Math.min(diversityScore, 25);
        
        return Math.min(Math.round(score), 100);
    }
    
    // Chatbot response
    generateChatResponse(message) {
        const lowerMsg = message.toLowerCase();
        const transactions = this.storage.getTransactions();
        const budgets = this.storage.getBudgets();
        const currentMonth = new Date().getMonth();
        
        if (lowerMsg.includes('spent') || lowerMsg.includes('spending')) {
            const monthlyExpenses = transactions.filter(t => 
                t.type === 'expense' && new Date(t.date).getMonth() === currentMonth
            );
            const total = monthlyExpenses.reduce((sum, t) => sum + t.amount, 0);
            return `You've spent ₹${total} this month. Your top category is ${this.getTopCategory(monthlyExpenses)}.`;
        }
        
        if (lowerMsg.includes('budget') || lowerMsg.includes('limit')) {
            const budgetStatus = budgets.map(b => {
                const spent = transactions
                    .filter(t => t.category === b.category && new Date(t.date).getMonth() === currentMonth)
                    .reduce((sum, t) => sum + t.amount, 0);
                return `${b.name}: ₹${spent} of ₹${b.amount}`;
            }).join(', ');
            return `Your budget status: ${budgetStatus || 'No budgets set yet.'}`;
        }
        
        if (lowerMsg.includes('save') || lowerMsg.includes('savings')) {
            const monthlyIncome = transactions
                .filter(t => t.type === 'income' && new Date(t.date).getMonth() === currentMonth)
                .reduce((sum, t) => sum + t.amount, 0);
            const monthlyExpenses = transactions.filter(t => 
                t.type === 'expense' && new Date(t.date).getMonth() === currentMonth
            ).reduce((sum, t) => sum + t.amount, 0);
            
            if (monthlyIncome > 0) {
                const savings = monthlyIncome - monthlyExpenses;
                const rate = ((savings / monthlyIncome) * 100).toFixed(1);
                return `You're saving ₹${savings} per month (${rate}% of income).`;
            }
        }
        
        if (lowerMsg.includes('tip') || lowerMsg.includes('advice')) {
            const tips = [
                "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
                "Automate your savings to build wealth effortlessly.",
                "Review subscriptions monthly to cut unnecessary expenses.",
                "Build an emergency fund covering 6 months of expenses.",
                "Invest in index funds for long-term growth."
            ];
            return tips[Math.floor(Math.random() * tips.length)];
        }
        
        return "I can help you with spending analysis, budget tracking, and savings tips. Ask me about your finances!";
    }
    
    getTopCategory(transactions) {
        const categorySpending = {};
        transactions.forEach(t => {
            categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
        });
        
        const top = Object.entries(categorySpending)
            .sort(([,a], [,b]) => b - a)[0];
        
        return top ? top[0] : 'No spending data';
    }
}