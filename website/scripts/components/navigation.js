/**
 * Navigation Component
 * Handles Mobile Menu, User Dropdown, Logout, and Theme Toggling
 */

/* Mobile Menu */
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('open');
}

/* Close mobile menu when nav link is clicked */
function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.remove('open');
}


// Features Dropdown (works for dynamically loaded header)
function setupFeaturesDropdown() {
    const navDropdown = document.querySelector('.nav-dropdown');
    const dropdownTrigger = navDropdown?.querySelector('.dropdown-trigger');
    const dropdownMenu = navDropdown?.querySelector('.dropdown-menu');
    if (!navDropdown || !dropdownTrigger || !dropdownMenu) return;

    // Toggle on click
    dropdownTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        navDropdown.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
        if (!navDropdown.contains(e.target)) {
            navDropdown.classList.remove('active');
        }
    });

    // Close on dropdown item click
    const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
    dropdownItems.forEach((item) => {
        item.addEventListener('click', function () {
            navDropdown.classList.remove('active');
        });
    });
}

// User Menu Dropdown (profile)
function toggleUserMenu() {
    const dropdown = document.querySelector('.user-menu');
    if (dropdown) dropdown.classList.toggle('show');
}

function setupUserMenuDropdown() {
    const wrapper = document.querySelector('.user-avatar-wrapper');
    const dropdown = document.querySelector('.user-menu');
    if (!wrapper || !dropdown) return;

    // Toggle on avatar click
    const avatarBtn = wrapper.querySelector('.user-avatar');
    if (avatarBtn) {
        avatarBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
    }

    // Close when clicking outside
    document.addEventListener('click', function (e) {
        if (!wrapper.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
}

/* Theme Logic */
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    updateThemeIcon(newTheme);
    
    // Update sidebar theme icon if available
    if (typeof window.updateSidebarThemeIcon === 'function') {
        window.updateSidebarThemeIcon();
    }
}

function updateThemeIcon(theme) {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;

    // Simple Icon Switch (Sun vs Moon)
    if (theme === 'light') {
        // Sun Icon
        btn.innerHTML = `
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-core);">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        `;
    } else {
        // Moon Icon
        btn.innerHTML = `
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-secondary);">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;
    }
}

// Initialize Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Active State
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        if (currentPath.includes(link.getAttribute('href'))) {
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
        
        // Add click event to close mobile menu
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Handle leaderboard page active state
    if (currentPath.includes('leaderboard.html')) {
        const leaderboardLink = document.querySelector('a[href="leaderboard.html"]');
        if (leaderboardLink) {
            links.forEach(l => l.classList.remove('active'));
            leaderboardLink.classList.add('active');
        }
    }

    // 2. Avatar Logic (Guest checks)
    if (sessionStorage.getItem('authGuest') === 'true') {
        const avatarImg = document.querySelector('.user-avatar img');
        if (avatarImg) {
            // Use the NEW Pilot Avatar
            // Check path depth
            const isPages = currentPath.includes('/pages/');
            // If in /pages/, go up to ../assets/images/pilot_avatar.png
            // If at root, go to assets/images/pilot_avatar.png
            avatarImg.src = isPages ? '../assets/images/pilot_avatar.png' : 'website/assets/images/pilot_avatar.png';
            avatarImg.style.padding = '0';
        }
    }

    // 3. Theme Init
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default dark
    // Apply immediately to avoid flash
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // 6. Setup Features Dropdown and User Menu Dropdown (after header is loaded)
    setTimeout(() => {
        setupFeaturesDropdown();
        setupUserMenuDropdown();
    }, 0);

    // 4. Connection Status Init
    import('./ConnectionStatus.js').then(({ ConnectionStatus }) => {
        new ConnectionStatus();
    }).catch(e => console.warn('ConnectionStatus component not loaded:', e));

    // 5. PWA Install Prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        // Show install button if it exists
        const installBtn = document.getElementById('pwa-install-btn');
        if (installBtn) {
            installBtn.style.display = 'flex';
            installBtn.addEventListener('click', () => {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    }
                    deferredPrompt = null;
                    installBtn.style.display = 'none';
                });
            });
        }
    });
});

/* Logout Logic - Using Local Auth Service */
function handleLogout() {
    if (confirm('Abort mission and logout?')) {
        console.log('🚪 Logout initiated...');

        // Use AuthService if available
        if (window.AuthService) {
            window.AuthService.logout();
        } else {
            // Fallback: Clear all auth data manually
            sessionStorage.clear();
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('current_user');
            localStorage.removeItem('is_guest');
            localStorage.removeItem('guestSession');
        }

        // Redirect to home page after logout
        console.log('✅ Logged out, redirecting to home');
        const homePath = window.location.pathname.includes('/pages/')
            ? '../index.html'
            : 'index.html';
        window.location.href = homePath;
    }
}
