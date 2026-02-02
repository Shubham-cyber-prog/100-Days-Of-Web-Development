/**
 * App Core - Centralized State Management Engine
 * Single source of truth for User Session, Theme State, and Global Configuration
 * Implements Observer pattern (Event Bus) for reactive state updates
 * 
 * @version 2.0.0
 * @author 100 Days of Web Dev Team
 */

import { Arena } from './arenaService.js';
import { Notify } from './Notify.js';

class AppCore {
    constructor() {
        // State containers
        this._state = {
            user: null,
            theme: 'dark',
            isAuthenticated: false,
            isGuest: false,
            isInitialized: false
        };

        // Event listeners storage (Observer pattern)
        this._listeners = new Map();

        // Configuration
        this.config = {
            storageKeys: {
                theme: 'app_theme',
                user: 'current_user',
                session: 'session_token',
                guest: 'is_guest',
                authenticated: 'isAuthenticated'
            },
            defaultTheme: 'dark',
            protectedRoutes: [
                'dashboard.html',
                'projects.html',
                'about.html',
                'contributors.html',
                'structure.html',
                'profile.html',
                'contact.html',
                '404.html',
                'api-status.html',
                'documentation.html',
                'system-logic.html',
                'leaderboard.html'
            ],
            publicRoutes: [
                'index.html',
                ''
            ]
        };

        // Bind methods
        this.init = this.init.bind(this);
        this.setState = this.setState.bind(this);
        this.getState = this.getState.bind(this);

        console.log('🚀 AppCore: Initialized');
    }

    /**
     * Initialize the application core
     * Loads persisted state from localStorage
     */
    async init() {
        try {
            // Load theme
            const savedTheme = localStorage.getItem(this.config.storageKeys.theme);
            this._state.theme = savedTheme || this.config.defaultTheme;
            this.applyTheme(this._state.theme);

            // Load user session
            await this.loadUserSession();

            // Initialize Global Arena & Presence if authenticated
            if (this.isAuthenticated()) {
                this.initArena();
            }

            // Mark as initialized
            this._state.isInitialized = true;
            this.emit('app:initialized', this._state);

            console.log('✅ AppCore: Ready', {
                theme: this._state.theme,
                authenticated: this._state.isAuthenticated,
                user: this._state.user?.email || 'none'
            });

            return this._state;
        } catch (error) {
            console.error('❌ AppCore: Initialization failed', error);
            throw error;
        }
    }

    // ========================================
    // STATE MANAGEMENT
    // ========================================

    /**
     * Get current state or specific property
     * @param {string} key - Optional key to get specific state property
     * @returns {any} State value
     */
    getState(key = null) {
        if (key) {
            return this._state[key];
        }
        return { ...this._state };
    }

    /**
     * Update state and notify listeners
     * @param {Object} updates - State properties to update
     */
    setState(updates) {
        const prevState = { ...this._state };

        Object.keys(updates).forEach(key => {
            if (this._state.hasOwnProperty(key)) {
                this._state[key] = updates[key];
            }
        });

        // Emit state change event
        this.emit('state:changed', { prev: prevState, current: this._state, updates });
    }

    // ========================================
    // EVENT BUS (Observer Pattern)
    // ========================================

    /**
     * Subscribe to an event
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    on(event, callback) {
        if (!this._listeners.has(event)) {
            this._listeners.set(event, new Set());
        }
        this._listeners.get(event).add(callback);

        // Return unsubscribe function
        return () => this.off(event, callback);
    }

    /**
     * Unsubscribe from an event
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    off(event, callback) {
        if (this._listeners.has(event)) {
            this._listeners.get(event).delete(callback);
        }
    }

    /**
     * Emit an event to all subscribers
     * @param {string} event - Event name
     * @param {any} data - Event data
     */
    emit(event, data = null) {
        if (this._listeners.has(event)) {
            this._listeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }
    }

    /**
     * Subscribe to an event once (auto-unsubscribe after first trigger)
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    once(event, callback) {
        const unsubscribe = this.on(event, (data) => {
            unsubscribe();
            callback(data);
        });
    }

    // ========================================
    // USER SESSION MANAGEMENT
    // ========================================

    /**
     * Load user session from storage
     */
    async loadUserSession() {
        try {
            const sessionToken = sessionStorage.getItem(this.config.storageKeys.session) ||
                sessionStorage.getItem('authToken');
            const isGuest = sessionStorage.getItem(this.config.storageKeys.guest) === 'true' ||
                sessionStorage.getItem('authGuest') === 'true';
            const localAuth = localStorage.getItem(this.config.storageKeys.authenticated) === 'true';
            const storedUser = localStorage.getItem(this.config.storageKeys.user);

            if (storedUser) {
                try {
                    this._state.user = JSON.parse(storedUser);
                } catch (e) {
                    this._state.user = null;
                }
            }

            // Determine authentication state
            if (sessionToken || localAuth) {
                this._state.isAuthenticated = true;
                this._state.isGuest = false;

                // Load user details if not in state
                if (!this._state.user) {
                    this._state.user = {
                        id: localStorage.getItem('user_id'),
                        email: localStorage.getItem('user_email') || localStorage.getItem('user_name'),
                        name: localStorage.getItem('user_name') || 'User'
                    };
                }
            } else if (isGuest) {
                this._state.isAuthenticated = false;
                this._state.isGuest = true;
                this._state.user = { name: 'Guest Pilot', email: 'guest@zenith.dev' };
            } else {
                this._state.isAuthenticated = false;
                this._state.isGuest = false;
                this._state.user = null;
            }

            return this._state;
        } catch (error) {
            console.error('Failed to load user session:', error);
            return this._state;
        }
    }

    /**
     * Login user
     * @param {Object} user - User data
     * @param {boolean} remember - Persist session
     */
    async login(user, remember = false) {
        const sessionToken = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

        // Update state
        this._state.user = user;
        this._state.isAuthenticated = true;
        this._state.isGuest = false;

        // Persist to storage
        sessionStorage.setItem(this.config.storageKeys.session, sessionToken);
        sessionStorage.setItem('authToken', 'true');
        localStorage.setItem(this.config.storageKeys.authenticated, 'true');
        localStorage.setItem(this.config.storageKeys.user, JSON.stringify(user));
        localStorage.setItem('user_name', user.name || user.email?.split('@')[0]);
        localStorage.setItem('user_email', user.email);
        localStorage.setItem('user_id', user.id);

        if (remember) {
            localStorage.setItem('remember_me', 'true');
        }

        // Emit login event
        this.emit('auth:login', { user, sessionToken });
        this.emit('user:changed', user);

        console.log('✅ User logged in:', user.email);
        return { success: true, user };
    }

    /**
     * Login as guest
     */
    async loginAsGuest() {
        const guestUser = {
            id: 'guest_' + Date.now(),
            name: 'Guest Pilot',
            email: 'guest@zenith.dev',
            isGuest: true
        };

        // Update state
        this._state.user = guestUser;
        this._state.isAuthenticated = false;
        this._state.isGuest = true;

        // Persist to session
        sessionStorage.setItem(this.config.storageKeys.guest, 'true');
        sessionStorage.setItem('authGuest', 'true');

        // Emit event
        this.emit('auth:guest', guestUser);
        this.emit('user:changed', guestUser);

        console.log('✅ Guest mode activated');
        return { success: true, user: guestUser };
    }

    /**
     * Logout user
     */
    async logout() {
        const prevUser = this._state.user;

        // Clear state
        this._state.user = null;
        this._state.isAuthenticated = false;
        this._state.isGuest = false;

        // Clear storage
        sessionStorage.removeItem(this.config.storageKeys.session);
        sessionStorage.removeItem(this.config.storageKeys.guest);
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('authGuest');
        localStorage.removeItem(this.config.storageKeys.authenticated);
        localStorage.removeItem(this.config.storageKeys.user);

        // Emit logout event
        this.emit('auth:logout', { prevUser });
        this.emit('user:changed', null);

        console.log('✅ User logged out');
        return { success: true };
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this._state.isAuthenticated || this._state.isGuest;
    }

    /**
     * Check if current user is guest
     */
    isGuest() {
        return this._state.isGuest;
    }

    /**
     * Get current user
     */
    getCurrentUser() {
        return this._state.user;
    }

    // ========================================
    // THEME MANAGEMENT
    // ========================================

    /**
     * Get current theme
     * @returns {string} Current theme ('dark' or 'light')
     */
    getTheme() {
        return this._state.theme;
    }

    /**
     * Set theme
     * @param {string} theme - Theme name ('dark' or 'light')
     */
    setTheme(theme) {
        if (theme !== 'dark' && theme !== 'light') {
            console.warn('Invalid theme:', theme);
            return;
        }

        this._state.theme = theme;
        this.applyTheme(theme);
        localStorage.setItem(this.config.storageKeys.theme, theme);

        // Emit theme change event
        this.emit('theme:changed', theme);
    }

    /**
     * Toggle theme between dark and light
     * @returns {string} New theme
     */
    toggleTheme() {
        const newTheme = this._state.theme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        return newTheme;
    }

    /**
     * Apply theme to DOM
     * @param {string} theme - Theme to apply
     */
    applyTheme(theme) {
        const html = document.documentElement;
        const body = document.body;

        // Apply to html element (for data-theme attribute)
        html.setAttribute('data-theme', theme);

        // Apply to body (for class-based theming)
        if (theme === 'light') {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        } else {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        }

        // Update theme-color meta tag for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#f8f9fa');
        }
    }

    // ========================================
    // ROUTE PROTECTION
    // ========================================

    /**
     * Check if current page requires authentication
     * @returns {boolean}
     */
    isProtectedRoute() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        return this.config.protectedRoutes.includes(currentPage);
    }

    /**
     * Check if current page is public
     * @returns {boolean}
     */
    isPublicRoute() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        return this.config.publicRoutes.includes(currentPage);
    }

    /**
     * Redirect to home if not authenticated
     */
    requireAuth() {
        if (!this.isAuthenticated() && this.isProtectedRoute()) {
            console.log('🔒 Auth required, redirecting to home');
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }

    /**
     * Redirect to dashboard if already authenticated
     */
    redirectIfAuthenticated() {
        if (this.isAuthenticated() && this.isPublicRoute()) {
            console.log('✅ Already authenticated, redirecting to dashboard');
            window.location.href = 'dashboard.html';
            return true;
        }
        return false;
    }

    // ========================================
    // UTILITY METHODS
    // ========================================

    /**
     * Get user display name
     * @returns {string}
     */
    getUserDisplayName() {
        if (this._state.user) {
            return this._state.user.name ||
                this._state.user.email?.split('@')[0] ||
                'User';
        }
        return 'Guest';
    }

    /**
     * Get user avatar URL or initials
     * @returns {Object} { type: 'url' | 'initials', value: string }
     */
    getUserAvatar() {
        if (this._state.user?.avatar) {
            return { type: 'url', value: this._state.user.avatar };
        }
        const name = this.getUserDisplayName();
        const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        return { type: 'initials', value: initials };
    }

    /**
     * Debug: Print current state
     */
    /**
     * Initialize Global Arena Presence and SOS Relay
     */
    async initArena() {
        try {
            console.log('🌐 Arena: Initializing Global Relay...');

            // Register for SOS Alerts globally
            Arena.onSOSReceived((alerts) => {
                this.handleGlobalSOS(alerts);
            });

            // Start presence tracking
            // Use current day from progress if available
            let currentDay = 1;
            try {
                const progress = localStorage.getItem('completedDays');
                if (progress) {
                    currentDay = Math.max(...JSON.parse(progress), 0) + 1;
                }
            } catch (e) { }

            await Arena.updateStatus('online', { currentDay });

        } catch (error) {
            console.warn('Arena initialization failed:', error);
        }
    }

    /**
     * Handle incoming SOS alerts globally
     */
    handleGlobalSOS(alerts) {
        // Only show alerts created in the last 60 seconds that we haven't seen
        const now = Date.now();
        const freshAlerts = alerts.filter(a => {
            const time = typeof a.createdAt === 'number' ? a.createdAt : (a.createdAt?.toMillis?.() || now);
            return (now - time) < 60000 && a.userId !== this._state.user?.id;
        });

        freshAlerts.forEach(alert => {
            // Check if user is a "Senior" (Day > 50) to offer help
            const myDay = this.getState('currentDay') || 0;
            const isSenior = myDay > 50;

            Notify.show({
                type: 'warning',
                title: `🆘 SOS: Day ${alert.dayNumber}`,
                message: `${alert.userName} is stuck: "${alert.problemDescription.substring(0, 50)}..."`,
                actions: [
                    {
                        label: isSenior ? '👑 Offer Mentorship' : '💬 View in Arena',
                        primary: true,
                        onClick: () => window.location.href = `arena.html?sos=${alert.id}`
                    }
                ],
                duration: 10000
            });
        });
    }

    debug() {
        console.table({
            'Initialized': this._state.isInitialized,
            'Theme': this._state.theme,
            'Authenticated': this._state.isAuthenticated,
            'Is Guest': this._state.isGuest,
            'User': this._state.user?.email || 'None',
            'Current Page': window.location.pathname.split('/').pop()
        });
    }
}

// Create singleton instance
const App = new AppCore();

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Export for modules
export { App, AppCore };

// Attach to window for non-module scripts
window.App = App;
window.AppCore = AppCore;

// Legacy support - expose commonly used methods globally
window.toggleTheme = () => App.toggleTheme();
window.getTheme = () => App.getTheme();
window.isAuthenticated = () => App.isAuthenticated();
window.getCurrentUser = () => App.getCurrentUser();

console.log('🎮 AppCore: Module loaded');
