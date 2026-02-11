
class Transactions {
    constructor() {
        this.categories = [
            { id: 'shopping', name: 'Shopping', icon: 'shopping-bag', color: '#8b5cf6' },
            { id: 'food', name: 'Food & Dining', icon: 'utensils', color: '#10b981' },
            { id: 'bills', name: 'Bills', icon: 'file-invoice-dollar', color: '#3b82f6' },
            { id: 'entertainment', name: 'Entertainment', icon: 'film', color: '#f59e0b' },
            { id: 'transport', name: 'Transport', icon: 'car', color: '#ef4444' },
            { id: 'income', name: 'Income', icon: 'money-bill-wave', color: '#10b981' },
            { id: 'transfer', name: 'Transfer', icon: 'exchange-alt', color: '#7c3aed' },
            { id: 'other', name: 'Other', icon: 'receipt', color: '#6b7280' }
        ];
    }

    // Additional transaction-related methods can be added here
    // For example: export transactions, filter by date range, etc.
}


document.addEventListener('DOMContentLoaded', () => {
    window.Transactions = new Transactions();
});