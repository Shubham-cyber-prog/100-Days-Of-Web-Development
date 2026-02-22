// Chart Manager
class ChartManager {
    constructor() {
        this.categoryChart = null;
        this.trendChart = null;
    }
    
    initializeCharts() {
        this.destroyCharts();
        this.renderCategoryChart();
        this.renderTrendChart();
    }
    
    destroyCharts() {
        if (this.categoryChart) {
            this.categoryChart.destroy();
        }
        if (this.trendChart) {
            this.trendChart.destroy();
        }
    }
    
    renderCategoryChart(transactions) {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        
        // Calculate category totals
        const categoryTotals = {};
        transactions.forEach(t => {
            if (t.type === 'expense') {
                categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
            }
        });
        
        const categories = Object.keys(categoryTotals);
        const amounts = Object.values(categoryTotals);
        const colors = categories.map(cat => this.getCategoryColor(cat));
        
        this.categoryChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: categories.map(cat => this.getCategoryName(cat)),
                datasets: [{
                    data: amounts,
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: '#FFFFFF'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    }
                },
                cutout: '70%'
            }
        });
    }
    
    renderTrendChart(transactions) {
        const ctx = document.getElementById('trendChart').getContext('2d');
        const now = new Date();
        
        // Get last 6 months data
        const months = [];
        const expenses = [];
        
        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = date.toLocaleDateString('en-US', { month: 'short' });
            months.push(monthName);
            
            const monthExpenses = transactions.filter(t => {
                const tDate = new Date(t.date);
                return t.type === 'expense' && 
                       tDate.getMonth() === date.getMonth() &&
                       tDate.getFullYear() === date.getFullYear();
            });
            
            const total = monthExpenses.reduce((sum, t) => sum + t.amount, 0);
            expenses.push(total);
        }
        
        this.trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Monthly Expenses',
                    data: expenses,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: true,
                            color: 'rgba(0,0,0,0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    getCategoryColor(categoryId) {
        const categoryManager = new CategoryManager();
        return categoryManager.getCategoryColor(categoryId);
    }
    
    getCategoryName(categoryId) {
        const categoryManager = new CategoryManager();
        return categoryManager.getCategoryName(categoryId);
    }
}