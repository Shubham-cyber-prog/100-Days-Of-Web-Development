
class Dashboard {
    constructor() {
        this.currentUser = null;
        this.transactions = [];
        this.init();
    }

    init(user = null) {
        if (user) {
            this.currentUser = user;
        } else {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                this.currentUser = JSON.parse(storedUser);
            }
        }

        if (this.currentUser) {
            this.loadTransactions();
            this.bindEvents();
            this.updateDashboard();
            this.updateDate();
            this.loadAllTransactions();
        }
    }

    bindEvents() {
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(link.getAttribute('href').substring(1));
            });
        });

        document.getElementById('home-logo')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchSection('overview');
        });


        
        document.getElementById('balance-toggle')?.addEventListener('click', this.toggleBalance.bind(this));

        
        document.getElementById('quick-transfer')?.addEventListener('click', () => {
            this.switchSection('transfer');
        });

        document.getElementById('quick-deposit')?.addEventListener('click', () => {
            this.showDepositModal();
        });

        document.getElementById('quick-payment')?.addEventListener('click', () => {
            this.switchSection('payments');
        });

        
        document.getElementById('transfer-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processTransfer('quick');
        });

        document.getElementById('new-transfer-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processTransfer('full');
        });

        
        document.getElementById('deposit-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processDeposit();
        });

        
        document.getElementById('bill-payment-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processBillPayment();
        });

        
        document.getElementById('add-account-btn')?.addEventListener('click', () => {
            this.addNewAccount();
        });

        
        document.getElementById('transaction-filter')?.addEventListener('change', () => {
            this.filterTransactions();
        });

        
        document.getElementById('spending-period')?.addEventListener('change', () => {
            this.updateSpendingChart();
        });

        
        document.querySelectorAll('.close-modal').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                this.closeAllModals();
            });
        });

        
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeAllModals();
            }
        });

        
        document.querySelector('.notifications')?.addEventListener('click', () => {
            this.showNotifications();
        });
    }

    switchSection(sectionId) {
        
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });

        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        
        switch(sectionId) {
            case 'accounts':
                this.loadAccounts();
                break;
            case 'transactions':
                this.loadAllTransactions();
                break;
            case 'transfer':
                this.populateAccountSelects();
                break;
            case 'payments':
                this.loadBills();
                break;
        }
    }

    updateDashboard() {
        if (!this.currentUser) return;

        
        const totalBalance = Object.values(this.currentUser.accounts)
            .reduce((sum, account) => sum + account.balance, 0);

        document.getElementById('total-balance').textContent = totalBalance.toFixed(2);
        document.getElementById('checking-balance').textContent = 
            this.currentUser.accounts.checking?.balance.toFixed(2) || '0.00';
        document.getElementById('savings-balance').textContent = 
            this.currentUser.accounts.savings?.balance.toFixed(2) || '0.00';

        
        this.updateRecentTransactions();

        
        this.updateSpendingChart();

        
        this.populateAccountSelects();
    }

    updateDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', options);
        document.getElementById('current-date').textContent = dateString;
    }

    toggleBalance() {
        const balanceElements = document.querySelectorAll('.amount');
        const toggleIcon = document.getElementById('balance-toggle');

        balanceElements.forEach(el => {
            if (!el.dataset.original) {
                el.dataset.original = el.textContent;
            }

            if (el.textContent === '••••••') {
                el.textContent = el.dataset.original;
                toggleIcon.className = 'fas fa-eye';
            } else {
                el.textContent = '••••••';
                toggleIcon.className = 'fas fa-eye-slash';
            }
        });
    }

    loadTransactions() {
        const storedTransactions = localStorage.getItem(`transactions_${this.currentUser.username}`);
        if (storedTransactions) {
            this.transactions = JSON.parse(storedTransactions);
        } else {
           
            this.transactions = this.createSampleTransactions();
            this.saveTransactions();
        }
    }

    createSampleTransactions() {
        const categories = ['Shopping', 'Food & Dining', 'Bills', 'Entertainment', 'Transport'];
        const merchants = ['Amazon', 'Starbucks', 'Netflix', 'Uber', 'Walmart', 'Apple', 'Spotify'];
        
        const transactions = [];
        const now = new Date();

        for (let i = 0; i < 10; i++) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            
            const amount = -(Math.random() * 200 + 10).toFixed(2);
            const category = categories[Math.floor(Math.random() * categories.length)];
            const merchant = merchants[Math.floor(Math.random() * merchants.length)];

            transactions.push({
                id: `trans_${Date.now()}_${i}`,
                type: 'expense',
                amount: parseFloat(amount),
                description: `${merchant} Purchase`,
                category: category,
                date: date.toISOString(),
                account: 'checking',
                status: 'completed'
            });
        }

        
        transactions.push({
            id: `trans_${Date.now()}_income`,
            type: 'income',
            amount: 2500.00,
            description: 'Monthly Salary',
            category: 'Income',
            date: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
            account: 'checking',
            status: 'completed'
        });

        return transactions;
    }

    updateRecentTransactions() {
        const container = document.getElementById('recent-transactions');
        if (!container) return;

       
        const recent = [...this.transactions]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        if (recent.length === 0) {
            container.innerHTML = '<div class="transaction-item placeholder"><p>No transactions yet</p></div>';
            return;
        }

        container.innerHTML = recent.map(transaction => `
            <div class="transaction-item">
                <div class="transaction-icon ${transaction.category.toLowerCase().replace(' & ', '-').replace(' ', '-')}">
                    <i class="fas fa-${this.getTransactionIcon(transaction.category)}"></i>
                </div>
                <div class="transaction-details">
                    <div class="transaction-title">${transaction.description}</div>
                    <div class="transaction-date">${this.formatDate(transaction.date)}</div>
                </div>
                <div class="transaction-amount ${transaction.type === 'income' ? 'positive' : 'negative'}">
                    ${transaction.type === 'income' ? '+' : '-'}$${Math.abs(transaction.amount).toFixed(2)}
                </div>
            </div>
        `).join('');
    }

    loadAllTransactions() {
        const tableBody = document.getElementById('transactions-table-body');
        if (!tableBody) return;

        const filteredTransactions = this.filterTransactions();
        
        tableBody.innerHTML = filteredTransactions.map(transaction => `
            <tr>
                <td>${this.formatDate(transaction.date, true)}</td>
                <td>
                    <div class="transaction-title">${transaction.description}</div>
                    <div class="transaction-account">${this.currentUser.accounts[transaction.account]?.name || transaction.account}</div>
                </td>
                <td>
                    <span class="transaction-category">${transaction.category}</span>
                </td>
                <td class="${transaction.type === 'income' ? 'positive' : 'negative'}">
                    ${transaction.type === 'income' ? '+' : '-'}$${Math.abs(transaction.amount).toFixed(2)}
                </td>
                <td>
                    <span class="status-badge status-${transaction.status}">${transaction.status}</span>
                </td>
            </tr>
        `).join('');
    }

    filterTransactions() {
        const filter = document.getElementById('transaction-filter')?.value || 'all';
        const monthFilter = document.getElementById('transaction-month')?.value;
        
        let filtered = this.transactions;
        
        if (filter !== 'all') {
            filtered = filtered.filter(t => t.type === filter);
        }
        
        if (monthFilter) {
            const [year, month] = monthFilter.split('-');
            filtered = filtered.filter(t => {
                const date = new Date(t.date);
                return date.getFullYear() === parseInt(year) && 
                       date.getMonth() + 1 === parseInt(month);
            });
        }
        
        return filtered;
    }

    processTransfer(type) {
        const fromAccount = type === 'quick' ? 'checking' : document.getElementById('from-account').value;
        const toAccount = type === 'quick' ? 
            document.getElementById('transfer-to').value : 
            document.getElementById('to-account').value;
        const amount = parseFloat(type === 'quick' ? 
            document.getElementById('transfer-amount').value : 
            document.getElementById('transfer-amount-full').value);
        const description = type === 'quick' ?
            document.getElementById('transfer-description').value || 'Transfer' :
            document.getElementById('transfer-description-full').value;

        
        if (!fromAccount || !toAccount || isNaN(amount) || amount <= 0) {
            window.Auth.showToast('Please fill in all fields correctly', 'error');
            return;
        }

        if (!this.currentUser.accounts[fromAccount]) {
            window.Auth.showToast('Invalid from account', 'error');
            return;
        }

        if (amount > this.currentUser.accounts[fromAccount].balance) {
            window.Auth.showToast('Insufficient funds', 'error');
            return;
        }

        
        this.currentUser.accounts[fromAccount].balance -= amount;
        
        if (toAccount === 'external') {
            
            window.Auth.showToast(`Transfer of $${amount.toFixed(2)} to external account initiated`, 'success');
        } else if (this.currentUser.accounts[toAccount]) {
            
            this.currentUser.accounts[toAccount].balance += amount;
            window.Auth.showToast(`Transfer of $${amount.toFixed(2)} completed successfully`, 'success');
        }

        
        const transaction = {
            id: `trans_${Date.now()}`,
            type: 'transfer',
            amount: -amount,
            description: description || 'Transfer',
            category: 'Transfer',
            date: new Date().toISOString(),
            account: fromAccount,
            status: 'completed',
            toAccount: toAccount
        };

        this.transactions.push(transaction);

        
        this.saveUserData();
        this.saveTransactions();
        
        
        this.updateDashboard();
        
       
        if (type === 'quick') {
            document.getElementById('transfer-form').reset();
        } else {
            document.getElementById('new-transfer-form').reset();
        }

        
        this.addNotification(`Transfer of $${amount.toFixed(2)} completed`, 'success');
    }

    processDeposit() {
        const account = document.getElementById('deposit-account').value;
        const amount = parseFloat(document.getElementById('deposit-amount').value);
        const description = document.getElementById('deposit-description').value || 'Deposit';

        if (!account || isNaN(amount) || amount <= 0) {
            window.Auth.showToast('Please fill in all fields correctly', 'error');
            return;
        }

        if (!this.currentUser.accounts[account]) {
            window.Auth.showToast('Invalid account', 'error');
            return;
        }

        
        this.currentUser.accounts[account].balance += amount;

        
        const transaction = {
            id: `trans_${Date.now()}`,
            type: 'income',
            amount: amount,
            description: description,
            category: 'Deposit',
            date: new Date().toISOString(),
            account: account,
            status: 'completed'
        };

        this.transactions.push(transaction);

        
        this.saveUserData();
        this.saveTransactions();
        
       
        this.updateDashboard();
        
        
        this.closeAllModals();
        
        
        document.getElementById('deposit-form').reset();

        window.Auth.showToast(`Deposit of $${amount.toFixed(2)} completed successfully`, 'success');
        
        
        this.addNotification(`Deposit of $${amount.toFixed(2)} received`, 'success');
    }

    processBillPayment() {
        const billType = document.getElementById('bill-type').value;
        const amount = parseFloat(document.getElementById('bill-amount').value);
        const dueDate = document.getElementById('bill-due-date').value;

        if (!billType || isNaN(amount) || amount <= 0 || !dueDate) {
            window.Auth.showToast('Please fill in all fields correctly', 'error');
            return;
        }

        
        const account = 'checking';

        if (amount > this.currentUser.accounts[account].balance) {
            window.Auth.showToast('Insufficient funds', 'error');
            return;
        }

        
        this.currentUser.accounts[account].balance -= amount;

        
        const transaction = {
            id: `trans_${Date.now()}`,
            type: 'expense',
            amount: -amount,
            description: `${billType.charAt(0).toUpperCase() + billType.slice(1)} Bill Payment`,
            category: 'Bills',
            date: new Date().toISOString(),
            account: account,
            status: 'completed'
        };

        this.transactions.push(transaction);

        
        this.saveUserData();
        this.saveTransactions();
        
       
        this.updateDashboard();
        
       
        document.getElementById('bill-payment-form').reset();

        window.Auth.showToast(`Bill payment of $${amount.toFixed(2)} completed successfully`, 'success');
        
       
        this.addNotification(`Bill payment of $${amount.toFixed(2)} processed`, 'success');
    }

    loadAccounts() {
        const container = document.querySelector('.accounts-grid');
        if (!container) return;

        container.innerHTML = Object.values(this.currentUser.accounts).map(account => `
            <div class="balance-card ${account.type}">
                <h3>${account.name}</h3>
                <div class="balance-amount">
                    <span class="currency">$</span>
                    <span class="amount">${account.balance.toFixed(2)}</span>
                </div>
                <div class="account-details">
                    <p>Account Number: •••• ${account.number}</p>
                    <p>Type: ${account.type.charAt(0).toUpperCase() + account.type.slice(1)}</p>
                    <p>Created: ${this.formatDate(account.createdAt)}</p>
                </div>
                <div class="account-actions">
                    <button class="btn-secondary" onclick="Dashboard.showAccountDetails('${account.id}')">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="btn-secondary" onclick="Dashboard.transferFromAccount('${account.id}')">
                        <i class="fas fa-paper-plane"></i> Transfer
                    </button>
                </div>
            </div>
        `).join('');
    }

    addNewAccount() {
        const accountName = prompt('Enter account name:');
        if (!accountName) return;

        const accountType = prompt('Enter account type (checking/savings/credit):');
        if (!['checking', 'savings', 'credit'].includes(accountType)) {
            window.Auth.showToast('Invalid account type', 'error');
            return;
        }

        const initialDeposit = parseFloat(prompt('Enter initial deposit:') || '0');

       
        const accountNumber = Math.floor(1000 + Math.random() * 9000).toString();

        const accountId = `acc_${Date.now()}`;
        const newAccount = {
            id: accountId,
            name: accountName,
            type: accountType,
            balance: initialDeposit,
            number: accountNumber,
            createdAt: new Date().toISOString()
        };

        
        this.currentUser.accounts[accountId] = newAccount;

        
        this.saveUserData();

        
        this.loadAccounts();

        window.Auth.showToast('Account created successfully', 'success');
        
       
        if (initialDeposit > 0) {
            const transaction = {
                id: `trans_${Date.now()}`,
                type: 'income',
                amount: initialDeposit,
                description: 'Initial Deposit',
                category: 'Deposit',
                date: new Date().toISOString(),
                account: accountId,
                status: 'completed'
            };

            this.transactions.push(transaction);
            this.saveTransactions();
        }
    }

    showAccountDetails(accountId) {
        const account = this.currentUser.accounts[accountId];
        if (!account) return;

        const details = `
            Account Name: ${account.name}
            Type: ${account.type}
            Balance: $${account.balance.toFixed(2)}
            Account Number: •••• ${account.number}
            Created: ${this.formatDate(account.createdAt)}
        `;

        alert(details);
    }

    transferFromAccount(accountId) {
        this.switchSection('transfer');
        document.getElementById('from-account').value = accountId;
    }

    populateAccountSelects() {
        const selects = document.querySelectorAll('select[id$="account"]');
        
        selects.forEach(select => {
            const currentValue = select.value;
            select.innerHTML = '<option value="">Select account</option>';
            
            Object.entries(this.currentUser.accounts).forEach(([id, account]) => {
                const option = document.createElement('option');
                option.value = id;
                option.textContent = `${account.name} ($${account.balance.toFixed(2)})`;
                select.appendChild(option);
            });
            
            
            if (this.currentUser.accounts[currentValue]) {
                select.value = currentValue;
            }
        });
    }

    updateSpendingChart() {
        const chartBars = document.querySelectorAll('.chart-bar');
        const period = document.getElementById('spending-period')?.value || 'This Month';
        
        
        const percentages = {
            'Shopping': Math.floor(Math.random() * 30) + 50,
            'Food & Dining': Math.floor(Math.random() * 40) + 30,
            'Bills': Math.floor(Math.random() * 20) + 70,
            'Entertainment': Math.floor(Math.random() * 50) + 20,
            'Transport': Math.floor(Math.random() * 35) + 40
        };

        chartBars.forEach(bar => {
            const category = bar.dataset.category;
            const percent = percentages[category] || 50;
            bar.dataset.percent = percent;
            bar.style.setProperty('--data-percent', `${percent}%`);
        });
    }

    loadBills() {
        const container = document.querySelector('.bills-list');
        if (!container) return;

        
        const bills = [
            { name: 'Electricity', amount: 120.50, dueDate: '2023-11-05', status: 'pending' },
            { name: 'Internet', amount: 89.99, dueDate: '2023-11-10', status: 'pending' },
            { name: 'Credit Card', amount: 450.00, dueDate: '2023-11-15', status: 'pending' },
            { name: 'Water', amount: 65.25, dueDate: '2023-11-03', status: 'paid' }
        ];

        container.innerHTML = bills.map(bill => `
            <div class="bill-item ${bill.status}">
                <div class="bill-info">
                    <div class="bill-name">${bill.name}</div>
                    <div class="bill-due">Due: ${this.formatDate(bill.dueDate)}</div>
                </div>
                <div class="bill-amount">$${bill.amount.toFixed(2)}</div>
                <div class="bill-actions">
                    <button class="btn-secondary" onclick="Dashboard.payBill('${bill.name}', ${bill.amount})" 
                            ${bill.status === 'paid' ? 'disabled' : ''}>
                        ${bill.status === 'paid' ? 'Paid' : 'Pay Now'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    payBill(billName, amount) {
        if (amount > this.currentUser.accounts.checking.balance) {
            window.Auth.showToast('Insufficient funds', 'error');
            return;
        }

        this.currentUser.accounts.checking.balance -= amount;

        
        const transaction = {
            id: `trans_${Date.now()}`,
            type: 'expense',
            amount: -amount,
            description: `${billName} Bill Payment`,
            category: 'Bills',
            date: new Date().toISOString(),
            account: 'checking',
            status: 'completed'
        };

        this.transactions.push(transaction);

       
        this.saveUserData();
        this.saveTransactions();
        
       
        this.updateDashboard();
        this.loadBills();

        window.Auth.showToast(`${billName} bill paid successfully`, 'success');
    }

    showDepositModal() {
        document.getElementById('deposit-modal').classList.add('active');
    }

    showNotifications() {
        const modal = document.getElementById('notification-modal');
        const container = modal.querySelector('.notification-list');
        
        
        const notifications = [
            { id: 1, message: 'Your transfer of $500 was completed', time: '2 hours ago', type: 'success' },
            { id: 2, message: 'New login detected from a different device', time: '1 day ago', type: 'warning' },
            { id: 3, message: 'Your savings account reached $10,000!', time: '3 days ago', type: 'info' },
            { id: 4, message: 'Monthly account statement is ready', time: '5 days ago', type: 'info' }
        ];
        
        container.innerHTML = notifications.map(notif => `
            <div class="notification-item ${notif.type}">
                <div class="notification-message">${notif.message}</div>
                <div class="notification-time">${notif.time}</div>
            </div>
        `).join('');
        
        modal.classList.add('active');
    }

    addNotification(message, type = 'info') {
        
        console.log(`Notification: ${message} (${type})`);
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    saveUserData() {
       
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        if (users[this.currentUser.username]) {
            users[this.currentUser.username].accounts = this.currentUser.accounts;
            localStorage.setItem('users', JSON.stringify(users));
        }

        
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }

    saveTransactions() {
        localStorage.setItem(`transactions_${this.currentUser.username}`, JSON.stringify(this.transactions));
    }

    
    formatDate(dateString, short = false) {
        const date = new Date(dateString);
        if (short) {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    getTransactionIcon(category) {
        const icons = {
            'Shopping': 'shopping-bag',
            'Food & Dining': 'utensils',
            'Bills': 'file-invoice-dollar',
            'Entertainment': 'film',
            'Transport': 'car',
            'Income': 'money-bill-wave',
            'Deposit': 'piggy-bank',
            'Transfer': 'exchange-alt'
        };
        return icons[category] || 'receipt';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    window.Dashboard = new Dashboard();
});