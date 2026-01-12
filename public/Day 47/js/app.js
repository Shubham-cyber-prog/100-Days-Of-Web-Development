// Main Application Module
class App {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all modules
        this.checkAuthState();
        this.bindGlobalEvents();
    }

    checkAuthState() {
        // Check if user is logged in
        const user = localStorage.getItem('currentUser');
        if (user) {
            // User is logged in, ensure dashboard is shown
            setTimeout(() => {
                if (window.Auth && window.Auth.currentUser) {
                    window.Auth.showDashboard();
                }
            }, 100);
        }
    }

    bindGlobalEvents() {
        // Global escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open modals or menus
                if (window.UI) {
                    window.UI.closeAllModals();
                    window.UI.closeMobileMenu();
                }
            }
        });

        // Global click handler to close dropdowns
        document.addEventListener('click', (e) => {
            // Close user dropdown if clicking outside
            const userProfile = document.querySelector('.user-profile');
            if (userProfile && !userProfile.contains(e.target)) {
                const dropdown = userProfile.querySelector('.dropdown-menu');
                if (dropdown) {
                    dropdown.style.opacity = '0';
                    dropdown.style.visibility = 'hidden';
                }
            }
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.App = new App();
});