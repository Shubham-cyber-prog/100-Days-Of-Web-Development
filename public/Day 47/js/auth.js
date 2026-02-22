
class Auth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.checkExistingSession();
        this.bindEvents();
    }

    checkExistingSession() {
        const user = localStorage.getItem('currentUser');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.showDashboard();
        }
    }

    bindEvents() {
        
        document.getElementById('login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.login();
        });

        
        document.getElementById('register-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.register();
        });

        
        document.getElementById('show-register')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showRegisterForm();
        });

        
        document.getElementById('show-login')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginForm();
        });

        
        document.getElementById('logout-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
        });

        
        const passwordInput = document.getElementById('register-password');
        if (passwordInput) {
            passwordInput.addEventListener('input', this.updatePasswordStrength.bind(this));
        }

        
        document.getElementById('forgot-password')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.forgotPassword();
        });
    }

    showLoginForm() {
        document.getElementById('login-page').style.display = 'flex';
        document.getElementById('register-page').style.display = 'none';
    }

    showRegisterForm() {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('register-page').style.display = 'flex';
    }

    login() {
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;

        
        const users = JSON.parse(localStorage.getItem('users') || '{}');

        if (users[username] && users[username].password === password) {
            
            this.currentUser = {
                username: username,
                fullName: users[username].fullName,
                accounts: users[username].accounts || this.createDefaultAccounts(users[username].initialDeposit)
            };

            
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

            
            this.showToast('Login successful!', 'success');

           
            this.showDashboard();
        } else {
            
            this.showToast('Invalid username or password', 'error');
        }
    }

    register() {
        const fullName = document.getElementById('register-fullname').value.trim();
        const username = document.getElementById('register-username').value.trim();
        const password = document.getElementById('register-password').value;
        const initialDeposit = parseFloat(document.getElementById('register-initial-deposit').value);

        
        if (!fullName || !username || !password || isNaN(initialDeposit)) {
            this.showToast('Please fill in all fields correctly', 'error');
            return;
        }

        if (password.length < 6) {
            this.showToast('Password must be at least 6 characters long', 'error');
            return;
        }

        
        const users = JSON.parse(localStorage.getItem('users') || '{}');

        
        if (users[username]) {
            this.showToast('Username already exists', 'error');
            return;
        }

        
        const accounts = this.createDefaultAccounts(initialDeposit);

        users[username] = {
            fullName,
            password,
            initialDeposit,
            accounts,
            createdAt: new Date().toISOString()
        };

        
        localStorage.setItem('users', JSON.stringify(users));

        
        this.currentUser = {
            username,
            fullName,
            accounts
        };

        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

       
        this.showToast('Account created successfully!', 'success');

        
        this.showDashboard();
    }

    createDefaultAccounts(initialDeposit) {
        const checkingBalance = initialDeposit * 0.7;
        const savingsBalance = initialDeposit * 0.3;

        return {
            checking: {
                id: 'checking',
                name: 'Checking Account',
                balance: checkingBalance,
                number: '4532',
                type: 'checking',
                createdAt: new Date().toISOString()
            },
            savings: {
                id: 'savings',
                name: 'Savings Account',
                balance: savingsBalance,
                number: '7816',
                type: 'savings',
                createdAt: new Date().toISOString()
            }
        };
    }

    updatePasswordStrength() {
        const password = document.getElementById('register-password').value;
        const strengthBar = document.querySelector('.strength-bar');
        const strengthValue = document.getElementById('strength-value');

        let strength = 0;
        let color = '#ef4444'; 
        let text = 'Weak';

        if (password.length >= 6) strength += 25;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;

        if (strength >= 75) {
            color = '#10b981'; 
            text = 'Strong';
        } else if (strength >= 50) {
            color = '#f59e0b'; 
            text = 'Medium';
        }

        strengthBar.style.width = `${strength}%`;
        strengthBar.style.backgroundColor = color;
        strengthValue.textContent = text;
        strengthValue.style.color = color;
    }

    forgotPassword() {
        const username = prompt('Enter your username to reset password:');
        if (!username) return;

        const users = JSON.parse(localStorage.getItem('users') || '{}');
        if (users[username]) {
            
            alert('Password reset instructions would be sent to your registered email.');
        } else {
            alert('Username not found.');
        }
    }

    showDashboard() {
        
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('register-page').style.display = 'none';

        
        const dashboard = document.getElementById('dashboard');
        dashboard.style.display = 'block';

        if (window.Dashboard) {
            window.Dashboard.init(this.currentUser);
        }

        this.updateUserInfo();


        if (window.UI) {
            window.UI.updateDarkModeUI();
        }
    }

    updateUserInfo() {
        if (!this.currentUser) return;

        const userNameElements = document.querySelectorAll('#dashboard-username, #welcome-name');
        userNameElements.forEach(el => {
            el.textContent = this.currentUser.fullName || this.currentUser.username;
        });

        
        const avatar = document.getElementById('user-avatar');
        if (avatar && this.currentUser.fullName) {
            const initials = this.currentUser.fullName
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .substring(0, 2);
            
            avatar.innerHTML = `<span style="font-weight: 600;">${initials}</span>`;
        }
    }

    logout() {
        
        this.currentUser = null;
        localStorage.removeItem('currentUser');

        
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('login-page').style.display = 'flex';

        
        document.getElementById('login-form').reset();

        this.showToast('Logged out successfully', 'success');
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    window.Auth = new Auth();
});