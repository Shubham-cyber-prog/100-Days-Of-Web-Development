/**
 * Navigation Component - Premium Version
 * Handles Mobile Menu, User Dropdown, Logout, and Theme Toggling
 * With Smart Features, Animations, and Error Handling
 */

// ==================== CONFIGURATION ====================
const NAV_CONFIG = {
    ANIMATION_DURATION: 300,
    MOBILE_BREAKPOINT: 768,
    DEFAULT_THEME: 'dark',
    STORAGE_KEYS: {
        THEME: 'theme',
        AUTH: 'isAuthenticated',
        USER: 'current_user',
        GUEST: 'is_guest'
    }
};

// ==================== STATE MANAGEMENT ====================
const NavigationState = {
    isMenuOpen: false,
    currentTheme: localStorage.getItem(NAV_CONFIG.STORAGE_KEYS.THEME) || NAV_CONFIG.DEFAULT_THEME,
    isAuthenticated: localStorage.getItem(NAV_CONFIG.STORAGE_KEYS.AUTH) === 'true',
    
    setMenuState(open) {
        this.isMenuOpen = open;
        document.body.style.overflow = open ? 'hidden' : '';
    }
};

// ==================== MOBILE MENU WITH ANIMATIONS ====================
class MobileMenu {
    constructor() {
        this.navLinks = document.querySelector('.nav-links');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.overlay = null;
        this.init();
    }

    init() {
        if (!this.navLinks) return;
        
        this.createOverlay();
        this.setupEventListeners();
        this.setupResizeHandler();
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'menu-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 98;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(this.overlay);
    }

    setupEventListeners() {
        // Menu toggle button
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            });
        }

        // Close on overlay click
        this.overlay?.addEventListener('click', () => this.close());

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && NavigationState.isMenuOpen) {
                this.close();
            }
        });

        // Close on nav link click
        this.navLinks?.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.close());
        });
    }

    setupResizeHandler() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > NAV_CONFIG.MOBILE_BREAKPOINT && NavigationState.isMenuOpen) {
                    this.close();
                }
            }, 250);
        });
    }

    toggle() {
        NavigationState.isMenuOpen ? this.close() : this.open();
    }

    open() {
        if (!this.navLinks) return;
        
        NavigationState.setMenuState(true);
        this.navLinks.classList.add('open');
        this.overlay.style.opacity = '1';
        this.overlay.style.visibility = 'visible';
        this.menuToggle?.classList.add('active');
        
        // Animate menu items
        gsap?.fromTo('.nav-links li', 
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
        );
    }

    close() {
        if (!this.navLinks) return;
        
        NavigationState.setMenuState(false);
        this.navLinks.classList.remove('open');
        this.overlay.style.opacity = '0';
        this.overlay.style.visibility = 'hidden';
        this.menuToggle?.classList.remove('active');
    }
}

// ==================== DROPDOWN MANAGER ====================
class DropdownManager {
    constructor() {
        this.activeDropdown = null;
        this.init();
    }

    init() {
        this.setupFeaturesDropdown();
        this.setupUserMenu();
        this.setupClickOutside();
    }

    setupFeaturesDropdown() {
        const dropdown = document.querySelector('.nav-dropdown');
        if (!dropdown) return;

        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (!trigger || !menu) return;

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (this.activeDropdown === dropdown) {
                this.closeDropdown(dropdown);
            } else {
                if (this.activeDropdown) {
                    this.closeDropdown(this.activeDropdown);
                }
                this.openDropdown(dropdown);
            }
        });

        // Handle dropdown items
        menu.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                this.closeDropdown(dropdown);
            });
        });

        // Add hover effect for desktop
        if (window.innerWidth > NAV_CONFIG.MOBILE_BREAKPOINT) {
            dropdown.addEventListener('mouseenter', () => {
                if (this.activeDropdown !== dropdown) {
                    this.openDropdown(dropdown);
                }
            });
            
            dropdown.addEventListener('mouseleave', () => {
                this.closeDropdown(dropdown);
            });
        }
    }

    setupUserMenu() {
        const wrapper = document.querySelector('.user-avatar-wrapper');
        const dropdown = document.querySelector('.user-menu');
        
        if (!wrapper || !dropdown) return;

        const avatar = wrapper.querySelector('.user-avatar');
        
        avatar?.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (this.activeDropdown === dropdown) {
                this.closeDropdown(dropdown);
            } else {
                if (this.activeDropdown) {
                    this.closeDropdown(this.activeDropdown);
                }
                this.openDropdown(dropdown);
            }
        });

        // Add animation to user menu items
        dropdown.querySelectorAll('.user-menu-item').forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                gsap?.to(item, { x: 5, duration: 0.2 });
            });
            item.addEventListener('mouseleave', () => {
                gsap?.to(item, { x: 0, duration: 0.2 });
            });
        });
    }

    setupClickOutside() {
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-dropdown') && 
                !e.target.closest('.user-avatar-wrapper')) {
                if (this.activeDropdown) {
                    this.closeDropdown(this.activeDropdown);
                }
            }
        });
    }

    openDropdown(dropdown) {
        this.activeDropdown = dropdown;
        dropdown.classList.add('active');
        
        // Animate dropdown
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
            gsap?.fromTo(menu,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
        }
    }

    closeDropdown(dropdown) {
        dropdown.classList.remove('active');
        if (this.activeDropdown === dropdown) {
            this.activeDropdown = null;
        }
    }
}

// ==================== THEME MANAGER ====================
class ThemeManager {
    constructor() {
        this.theme = NavigationState.currentTheme;
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        this.setupThemeToggle();
        this.setupSystemThemeListener();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(NAV_CONFIG.STORAGE_KEYS.THEME, theme);
        this.theme = theme;
        
        this.updateThemeIcon();
        this.notifyComponents();
        
        // Add smooth transition
        document.documentElement.style.transition = 'background-color 0.3s, color 0.3s';
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        
        // Animate theme change
        gsap?.to('body', {
            opacity: 0.8,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                this.applyTheme(newTheme);
            }
        });
    }

    updateThemeIcon() {
        const btn = document.getElementById('theme-toggle-btn');
        if (!btn) return;

        const isLight = this.theme === 'light';
        
        btn.innerHTML = isLight ? `
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
        ` : `
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;

        // Add animation
        gsap?.fromTo(btn, 
            { rotate: -90, opacity: 0 },
            { rotate: 0, opacity: 1, duration: 0.3 }
        );
    }

    setupThemeToggle() {
        const btn = document.getElementById('theme-toggle-btn');
        btn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleTheme();
        });
    }

    setupSystemThemeListener() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(NAV_CONFIG.STORAGE_KEYS.THEME)) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    notifyComponents() {
        // Notify other components about theme change
        const event = new CustomEvent('themeChanged', { detail: { theme: this.theme } });
        window.dispatchEvent(event);
        
        // Update sidebar if function exists
        if (typeof window.updateSidebarThemeIcon === 'function') {
            window.updateSidebarThemeIcon();
        }
    }
}

// ==================== AUTH MANAGER ====================
class AuthManager {
    constructor() {
        this.isAuthenticated = NavigationState.isAuthenticated;
        this.init();
    }

    init() {
        this.setupAvatar();
        this.setupLogout();
    }

    setupAvatar() {
        if (sessionStorage.getItem('authGuest') === 'true') {
            this.setGuestAvatar();
        }
    }

    setGuestAvatar() {
        const avatarImg = document.querySelector('.user-avatar img');
        if (!avatarImg) return;

        const isPages = window.location.pathname.includes('/pages/');
        avatarImg.src = isPages ? 
            '../assets/images/pilot_avatar.png' : 
            'website/assets/images/pilot_avatar.png';
        avatarImg.style.padding = '0';
        
        // Add fallback
        avatarImg.onerror = () => {
            avatarImg.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIgZmlsbD0iIzAwZTVmZiIvPjx0ZXh0IHg9IjQwIiB5PSI1MCIgZm9udC1zaXplPSIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5HPC90ZXh0Pjwvc3ZnPg==';
        };
    }

    setupLogout() {
        const logoutBtn = document.getElementById('logout-btn') || 
                         document.querySelector('[data-action="logout"]');
        
        logoutBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogout();
        });
    }

    handleLogout() {
        // Show confirmation modal
        this.showLogoutModal();
    }

    showLogoutModal() {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'logout-modal';
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-surface);
            padding: 32px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            text-align: center;
            border: 1px solid var(--border);
            backdrop-filter: blur(10px);
            max-width: 400px;
            width: 90%;
        `;

        modal.innerHTML = `
            <h3 style="margin-bottom: 16px; font-size: 1.5rem;">🚪 Abort Mission?</h3>
            <p style="margin-bottom: 24px; color: var(--text-secondary);">Are you sure you want to logout?</p>
            <div style="display: flex; gap: 12px; justify-content: center;">
                <button class="btn-secondary" id="cancel-logout">Cancel</button>
                <button class="btn-primary" id="confirm-logout">Yes, Logout</button>
            </div>
        `;

        // Add overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(5px);
            z-index: 9999;
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(modal);

        // Animate modal
        gsap?.fromTo(modal,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out' }
        );

        // Handle buttons
        document.getElementById('cancel-logout')?.addEventListener('click', () => {
            gsap?.to(modal, {
                scale: 0.8,
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    modal.remove();
                    overlay.remove();
                }
            });
        });

        document.getElementById('confirm-logout')?.addEventListener('click', () => {
            this.performLogout();
        });
    }

    performLogout() {
        console.log('🚪 Logout initiated...');

        // Use AuthService if available
        if (window.AuthService) {
            window.AuthService.logout();
        } else {
            // Fallback: Clear all auth data
            sessionStorage.clear();
            localStorage.removeItem(NAV_CONFIG.STORAGE_KEYS.AUTH);
            localStorage.removeItem(NAV_CONFIG.STORAGE_KEYS.USER);
            localStorage.removeItem(NAV_CONFIG.STORAGE_KEYS.GUEST);
            localStorage.removeItem('guestSession');
        }

        // Show success message
        this.showLogoutSuccess();
    }

    showLogoutSuccess() {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-core);
            color: white;
            padding: 12px 24px;
            border-radius: 30px;
            box-shadow: 0 4px 20px rgba(0,229,255,0.3);
            z-index: 10001;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = '✅ Logged out successfully!';

        document.body.appendChild(toast);

        setTimeout(() => {
            gsap?.to(toast, {
                x: 100,
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    toast.remove();
                    // Redirect
                    const homePath = window.location.pathname.includes('/pages/')
                        ? '../index.html'
                        : 'index.html';
                    window.location.href = homePath;
                }
            });
        }, 1000);
    }
}

// ==================== NAVIGATION ACTIVE STATE ====================
class ActiveStateManager {
    constructor() {
        this.init();
    }

    init() {
        this.setActiveLinks();
        this.setupScrollSpy();
    }

    setActiveLinks() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.nav-link');

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href)) {
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Animate active indicator
                gsap?.fromTo(link,
                    { scale: 1 },
                    { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1 }
                );
            }
        });

        // Special case for leaderboard
        if (currentPath.includes('leaderboard.html')) {
            const leaderboardLink = document.querySelector('a[href="leaderboard.html"]');
            if (leaderboardLink) {
                links.forEach(l => l.classList.remove('active'));
                leaderboardLink.classList.add('active');
            }
        }
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (correspondingLink) {
                        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                        correspondingLink.classList.add('active');
                    }
                }
            });
        });
    }
}

// ==================== PWA INSTALL HANDLER ====================
class PWAInstallHandler {
    constructor() {
        this.deferredPrompt = null;
        this.init();
    }

    init() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });
    }

    showInstallButton() {
        const installBtn = document.getElementById('pwa-install-btn');
        if (!installBtn) return;

        installBtn.style.display = 'flex';
        
        gsap?.fromTo(installBtn,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out' }
        );

        installBtn.addEventListener('click', async () => {
            if (!this.deferredPrompt) return;

            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                console.log('✅ PWA installed');
                gsap?.to(installBtn, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        installBtn.style.display = 'none';
                    }
                });
            }
            
            this.deferredPrompt = null;
        });
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    try {
        new MobileMenu();
        new DropdownManager();
        new ThemeManager();
        new AuthManager();
        new ActiveStateManager();
        new PWAInstallHandler();

        console.log('✅ Navigation initialized successfully');
    } catch (error) {
        console.error('❌ Navigation initialization failed:', error);
        
        // Fallback: Basic functionality
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const mobileMenu = document.querySelector('.nav-links');
                mobileMenu?.classList.remove('open');
            });
        });
    }
});

// ==================== UTILITY FUNCTIONS ====================
// Export for global use
window.Navigation = {
    toggleTheme: () => window.themeManager?.toggleTheme(),
    handleLogout: () => window.authManager?.handleLogout(),
    closeMobileMenu: () => window.mobileMenu?.close()
};

// ==================== ADD REQUIRED STYLES ====================
const style = document.createElement('style');
style.textContent = `
    /* Mobile Menu Toggle */
    .menu-toggle {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 30px;
        height: 21px;
        cursor: pointer;
        z-index: 100;
    }

    .menu-toggle span {
        width: 100%;
        height: 3px;
        background: var(--text-primary);
        transition: all 0.3s ease;
        border-radius: 3px;
    }

    .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }

    @media (max-width: 768px) {
        .menu-toggle {
            display: flex;
        }
        
        .nav-links {
            position: fixed;
            top: 0;
            left: -100%;
            width: 80%;
            max-width: 300px;
            height: 100vh;
            background: var(--bg-glass);
            backdrop-filter: blur(20px);
            padding: 80px 20px 20px;
            transition: left 0.3s ease;
            z-index: 99;
            flex-direction: column;
            align-items: flex-start;
        }
        
        .nav-links.open {
            left: 0;
        }
    }

    /* Dropdown Animations */
    .dropdown-menu {
        transform-origin: top;
        transition: opacity 0.3s, transform 0.3s;
    }
    
    .nav-dropdown.active .dropdown-menu {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
    }
    
    /* Toast Animation */
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);