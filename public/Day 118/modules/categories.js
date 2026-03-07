// Expense Categories Configuration
class CategoryManager {
    constructor() {
        this.categories = [
            {
                id: 'food',
                name: 'Food & Dining',
                icon: 'fas fa-utensils',
                color: '#FF6B6B',
                subcategories: ['Groceries', 'Restaurants', 'Coffee', 'Takeout']
            },
            {
                id: 'transportation',
                name: 'Transportation',
                icon: 'fas fa-car',
                color: '#4ECDC4',
                subcategories: ['Fuel', 'Public Transport', 'Taxi', 'Maintenance']
            },
            {
                id: 'shopping',
                name: 'Shopping',
                icon: 'fas fa-shopping-bag',
                color: '#FFD166',
                subcategories: ['Clothing', 'Electronics', 'Home', 'Online']
            },
            {
                id: 'entertainment',
                name: 'Entertainment',
                icon: 'fas fa-film',
                color: '#06D6A0',
                subcategories: ['Movies', 'Streaming', 'Games', 'Events']
            },
            {
                id: 'bills',
                name: 'Bills & Utilities',
                icon: 'fas fa-file-invoice-dollar',
                color: '#118AB2',
                subcategories: ['Electricity', 'Water', 'Internet', 'Phone']
            },
            {
                id: 'health',
                name: 'Health & Fitness',
                icon: 'fas fa-heartbeat',
                color: '#EF476F',
                subcategories: ['Medicine', 'Doctor', 'Gym', 'Wellness']
            },
            {
                id: 'education',
                name: 'Education',
                icon: 'fas fa-graduation-cap',
                color: '#073B4C',
                subcategories: ['Courses', 'Books', 'Software', 'Workshops']
            },
            {
                id: 'investment',
                name: 'Investments',
                icon: 'fas fa-chart-line',
                color: '#7209B7',
                subcategories: ['Stocks', 'Mutual Funds', 'Crypto', 'Real Estate']
            },
            {
                id: 'income',
                name: 'Income',
                icon: 'fas fa-money-check-alt',
                color: '#2A9D8F',
                subcategories: ['Salary', 'Freelance', 'Dividends', 'Rental']
            },
            {
                id: 'other',
                name: 'Other',
                icon: 'fas fa-ellipsis-h',
                color: '#6C757D',
                subcategories: ['Miscellaneous']
            }
        ];
    }
    
    getCategoryById(id) {
        return this.categories.find(cat => cat.id === id) || this.categories[this.categories.length - 1];
    }
    
    getAllCategories() {
        return this.categories;
    }
    
    getCategoryOptions() {
        return this.categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
    }
    
    getCategoryIcon(id) {
        const cat = this.getCategoryById(id);
        return cat ? cat.icon : 'fas fa-question-circle';
    }
    
    getCategoryColor(id) {
        const cat = this.getCategoryById(id);
        return cat ? cat.color : '#6C757D';
    }
    
    getCategoryName(id) {
        const cat = this.getCategoryById(id);
        return cat ? cat.name : 'Other';
    }
}