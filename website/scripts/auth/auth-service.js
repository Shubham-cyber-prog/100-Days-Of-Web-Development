/**
 * Local Authentication Service
 * Pure JavaScript authentication system using localStorage
 * No external dependencies - perfect for open-source demos
 * 
 * Features:
 * - User registration with email/password
 * - Login with credential verification
 * - Guest mode support
 * - Password hashing (SHA-256)
 * - Session management
 * - Remember me functionality
 */

class AuthService {
    constructor() {
        this.USERS_KEY = 'app_users';
        this.CURRENT_USER_KEY = 'current_user';
        this.SESSION_KEY = 'session_token';
        this.REMEMBER_KEY = 'remember_me';
        this.GUEST_KEY = 'is_guest';
    }

    /**
     * Hash password using SHA-256
     */
    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    /**
     * Generate unique session token
     */
    generateSessionToken() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Get all registered users from localStorage
     */
    getUsers() {
        try {
            const users = localStorage.getItem(this.USERS_KEY);
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error('Error reading users:', error);
            return [];
        }
    }

    /**
     * Save users to localStorage
     */
    saveUsers(users) {
        try {
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
            return true;
        } catch (error) {
            console.error('Error saving users:', error);
            return false;
        }
    }

    /**
     * Validate email format
     */
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Validate password strength
     */
    validatePassword(password) {
        if (password.length < 6) {
            return { valid: false, message: 'Password must be at least 6 characters long' };
        }
        return { valid: true, message: '' };
    }

    /**
     * Check if email already exists
     */
    emailExists(email) {
        const users = this.getUsers();
        return users.some(user => user.email.toLowerCase() === email.toLowerCase());
    }

    /**
     * Register new user
     */
    async register(email, password, name = '') {
        try {
            // Validate email
            if (!this.validateEmail(email)) {
                return { success: false, message: 'Invalid email format' };
            }

            // Validate password
            const passwordValidation = this.validatePassword(password);
            if (!passwordValidation.valid) {
                return { success: false, message: passwordValidation.message };
            }

            // Check if user already exists
            if (this.emailExists(email)) {
                return { success: false, message: 'Email already registered' };
            }

            // Hash password
            const hashedPassword = await this.hashPassword(password);

            // Create user object
            const newUser = {
                id: 'user_' + Date.now(),
                email: email.toLowerCase(),
                password: hashedPassword,
                name: name || email.split('@')[0],
                createdAt: new Date().toISOString(),
                lastLogin: null
            };

            // Save user
            const users = this.getUsers();
            users.push(newUser);

            if (!this.saveUsers(users)) {
                return { success: false, message: 'Failed to save user data' };
            }

            console.log('✅ User registered successfully:', email);
            return {
                success: true,
                message: 'Registration successful!',
                user: { id: newUser.id, email: newUser.email, name: newUser.name }
            };

        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Registration failed. Please try again.' };
        }
    }

    /**
     * Login with email and password
     */
    async login(email, password, rememberMe = false) {
        try {
            // Validate inputs
            if (!email || !password) {
                return { success: false, message: 'Email and password are required' };
            }

            if (!this.validateEmail(email)) {
                return { success: false, message: 'Invalid email format' };
            }

            // Hash password for comparison
            const hashedPassword = await this.hashPassword(password);

            // Find user
            const users = this.getUsers();
            const user = users.find(u =>
                u.email.toLowerCase() === email.toLowerCase() &&
                u.password === hashedPassword
            );

            if (!user) {
                return { success: false, message: 'Invalid email or password' };
            }

            // Update last login
            user.lastLogin = new Date().toISOString();
            this.saveUsers(users);

            // Create session
            const sessionToken = this.generateSessionToken();
            const userData = {
                id: user.id,
                email: user.email,
                name: user.name,
                loginTime: Date.now()
            };

            // Store session
            sessionStorage.setItem(this.SESSION_KEY, sessionToken);
            sessionStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userData));
            sessionStorage.setItem('isAuthenticated', 'true');

            // Store in localStorage if remember me
            if (rememberMe) {
                localStorage.setItem(this.REMEMBER_KEY, 'true');
                localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userData));
                localStorage.setItem('isAuthenticated', 'true');
            } else {
                localStorage.removeItem(this.REMEMBER_KEY);
                localStorage.removeItem(this.CURRENT_USER_KEY);
                localStorage.removeItem('isAuthenticated');
            }

            // Clear guest mode
            this.clearGuestMode();

            console.log('✅ Login successful:', email);
            return {
                success: true,
                message: 'Login successful!',
                user: userData
            };

        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Login failed. Please try again.' };
        }
    }

    /**
     * Guest login (no registration required)
     */
    loginAsGuest() {
        try {
            const guestData = {
                id: 'guest_' + Date.now(),
                email: 'guest@local.app',
                name: 'Guest User',
                isGuest: true,
                loginTime: Date.now()
            };

            // Store guest session
            sessionStorage.setItem(this.GUEST_KEY, 'true');
            sessionStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(guestData));
            sessionStorage.setItem('isAuthenticated', 'true');

            localStorage.setItem(this.GUEST_KEY, 'true');
            localStorage.setItem('guestSession', Date.now().toString());

            console.log('✅ Guest login successful');
            return {
                success: true,
                message: 'Welcome, Guest!',
                user: guestData
            };

        } catch (error) {
            console.error('Guest login error:', error);
            return { success: false, message: 'Guest login failed' };
        }
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        // Check session storage first
        const sessionAuth = sessionStorage.getItem('isAuthenticated') === 'true';
        if (sessionAuth) {
            return true;
        }

        // Check localStorage if remember me was set
        const rememberMe = localStorage.getItem(this.REMEMBER_KEY) === 'true';
        const localAuth = localStorage.getItem('isAuthenticated') === 'true';

        if (rememberMe && localAuth) {
            // Restore session from localStorage
            const userData = localStorage.getItem(this.CURRENT_USER_KEY);
            if (userData) {
                sessionStorage.setItem('isAuthenticated', 'true');
                sessionStorage.setItem(this.CURRENT_USER_KEY, userData);
                return true;
            }
        }

        return false;
    }

    /**
     * Check if current user is guest
     */
    isGuest() {
        const sessionGuest = sessionStorage.getItem(this.GUEST_KEY);
        return sessionGuest !== null ? sessionGuest === 'true' : localStorage.getItem(this.GUEST_KEY) === 'true';
    }

    /**
     * Get current user data
     */
    getCurrentUser() {
        try {
            // Try session storage first
            let userData = sessionStorage.getItem(this.CURRENT_USER_KEY);

            // Fallback to localStorage if remember me
            if (!userData && localStorage.getItem(this.REMEMBER_KEY) === 'true') {
                userData = localStorage.getItem(this.CURRENT_USER_KEY);
            }

            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    /**
     * Clear guest mode
     */
    clearGuestMode() {
        sessionStorage.removeItem(this.GUEST_KEY);
        localStorage.removeItem(this.GUEST_KEY);
        localStorage.removeItem('guestSession');
        localStorage.removeItem('guestName');
    }

    /**
     * Logout user
     */
    logout() {
        try {
            // Clear session storage
            sessionStorage.removeItem(this.SESSION_KEY);
            sessionStorage.removeItem(this.CURRENT_USER_KEY);
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem(this.GUEST_KEY);
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('authGuest');

            // Clear localStorage unless remember me (but still clear current session)
            if (localStorage.getItem(this.REMEMBER_KEY) !== 'true') {
                localStorage.removeItem(this.CURRENT_USER_KEY);
                localStorage.removeItem('isAuthenticated');
            }

            // Always clear guest data
            this.clearGuestMode();

            console.log('✅ Logout successful');
            return { success: true, message: 'Logged out successfully' };

        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, message: 'Logout failed' };
        }
    }

    /**
     * Get all users (for admin purposes - demo only)
     */
    getAllUsers() {
        const users = this.getUsers();
        // Return without passwords
        return users.map(user => ({
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin
        }));
    }

    /**
     * Clear all data (for testing/demo purposes)
     */
    clearAllData() {
        if (confirm('⚠️ This will delete all user data. Continue?')) {
            localStorage.removeItem(this.USERS_KEY);
            localStorage.removeItem(this.CURRENT_USER_KEY);
            localStorage.removeItem(this.REMEMBER_KEY);
            localStorage.removeItem('isAuthenticated');
            this.clearGuestMode();
            this.logout();
            console.log('🗑️ All data cleared');
            return true;
        }
        return false;
    }
}

// Create and export singleton instance
const authService = new AuthService();

// Make available globally for easy access
window.AuthService = authService;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = authService;
}
