/**
 * Sidebar Loader Component - Premium Version
 * Loads sidebar HTML with advanced state management and smooth interactions
 */

// ==================== SIDEBAR CONFIGURATION ====================
const SIDEBAR_CONFIG = {
    STORAGE_KEY: 'sidebarCollapsed',
    MOBILE_BREAKPOINT: 640,
    ANIMATION_DURATION: 300,
    RETRY_DELAY: 100,
    MAX_RETRIES: 3
};

// ==================== SIDEBAR STATE MANAGER ====================
const SidebarState = {
    isCollapsed: false,
    isMobileOpen: false,
    isMobile: false,
    retryCount: 0,

    init() {
        this.isMobile = window.innerWidth <= SIDEBAR_CONFIG.MOBILE_BREAKPOINT;
        this.loadSavedState();
        return this;
    },

    loadSavedState() {
        if (!this.isMobile) {
            const saved = localStorage.getItem(SIDEBAR_CONFIG.STORAGE_KEY);
            this.isCollapsed = saved === 'true';
        } else {
            this.isCollapsed = false;
            this.isMobileOpen = false;
        }
    },

    saveState() {
        if (!this.isMobile) {
            localStorage.setItem(SIDEBAR_CONFIG.STORAGE_KEY, this.isCollapsed);
        }
    },

    toggle() {
        if (this.isMobile) {
            this.isMobileOpen = !this.isMobileOpen;
        } else {
            this.isCollapsed = !this.isCollapsed;
            this.saveState();
        }
        this.applyState();
    },

    open() {
        if (this.isMobile) {
            this.isMobileOpen = true;
        } else {
            this.isCollapsed = false;
            this.saveState();
        }
        this.applyState();
    },

    close() {
        if (this.isMobile) {
            this.isMobileOpen = false;
        } else {
            this.isCollapsed = true;
            this.saveState();
        }
        this.applyState();
    },

    applyState() {
        const sidebar = document.querySelector('.sidebar-fixed');
        if (!sidebar) return;

        if (this.isMobile) {
            sidebar.classList.toggle('mobile-open', this.isMobileOpen);
            document.body.classList.toggle('sidebar-mobile-open', this.isMobileOpen);
            // Disable body scroll when sidebar is open on mobile
            document.body.style.overflow = this.isMobileOpen ? 'hidden' : '';
        } else {
            sidebar.classList.toggle('sidebar-collapsed', this.isCollapsed);
            document.body.classList.toggle('sidebar-collapsed', this.isCollapsed);
        }

        // Update toggle buttons
        this.updateToggleButtons();
    },

    updateToggleButtons() {
        const closeBtn = document.getElementById('sidebar-close-btn');
        const openBtn = document.getElementById('sidebar-open-btn');
        const toggleBtn = document.getElementById('sidebar-toggle-btn');

        if (closeBtn) {
            closeBtn.style.display = (this.isMobile && this.isMobileOpen) || (!this.isMobile && !this.isCollapsed) ? 'flex' : 'none';
        }
        
        if (openBtn) {
            openBtn.style.display = (this.isMobile && !this.isMobileOpen) || (!this.isMobile && this.isCollapsed) ? 'flex' : 'none';
        }

        if (toggleBtn) {
            toggleBtn.setAttribute('aria-expanded', this.isMobile ? this.isMobileOpen : !this.isCollapsed);
        }
    },

    checkMobile() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= SIDEBAR_CONFIG.MOBILE_BREAKPOINT;

        if (wasMobile !== this.isMobile) {
            // Reset states on breakpoint change
            if (this.isMobile) {
                this.isCollapsed = false;
                this.isMobileOpen = false;
            } else {
                this.isMobileOpen = false;
                this.loadSavedState();
            }
            this.applyState();
        }
    }
};

// ==================== SIDEBAR LOADER ====================
async function loadSidebar() {
    try {
        const response = await fetch('../components/sidebar.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const sidebarHTML = await response.text();
        
        // Remove any existing sidebar
        const existingSidebar = document.querySelector('.sidebar-fixed');
        if (existingSidebar) {
            existingSidebar.remove();
        }
        
        // Insert sidebar with animation
        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
        
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            initializeSidebar();
        }, 50);

    } catch (error) {
        console.error('❌ Error loading sidebar:', error);
        
        // Retry logic
        if (SidebarState.retryCount < SIDEBAR_CONFIG.MAX_RETRIES) {
            SidebarState.retryCount++;
            console.log(`🔄 Retrying sidebar load (${SidebarState.retryCount}/${SIDEBAR_CONFIG.MAX_RETRIES})...`);
            setTimeout(loadSidebar, SIDEBAR_CONFIG.RETRY_DELAY * SidebarState.retryCount);
        } else {
            // Fallback: Create minimal sidebar
            createFallbackSidebar();
        }
    }
}

// ==================== FALLBACK SIDEBAR ====================
function createFallbackSidebar() {
    console.log('⚠️ Creating fallback sidebar');
    
    const fallbackHTML = `
    <div class="sidebar-fixed">
        <div class="sidebar-header">
            <a href="index.html" class="sidebar-logo">
                <span class="sidebar-logo-text">100 Days</span>
            </a>
            <button class="sidebar-close-btn" id="sidebar-close-btn">✕</button>
        </div>
        <nav class="sidebar-nav">
            <a href="index.html" class="sidebar-link">Home</a>
            <a href="website/pages/dashboard.html" class="sidebar-link">Dashboard</a>
            <a href="website/pages/projects.html" class="sidebar-link">Projects</a>
        </nav>
    </div>
    <button class="sidebar-open-btn" id="sidebar-open-btn">☰</button>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', fallbackHTML);
    initializeSidebar();
}

// ==================== SIDEBAR INITIALIZATION ====================
function initializeSidebar() {
    // Initialize state
    SidebarState.init();
    
    // Set active links
    setActiveLinks();
    
    // Setup event listeners
    setupSidebarEvents();
    
    // Update theme icon
    updateSidebarThemeIcon();
    
    // Apply initial state
    SidebarState.applyState();
    
    // Add resize observer
    setupResizeObserver();
    
    // Add keyboard navigation
    setupKeyboardNav();
    
    console.log('✅ Sidebar initialized successfully');
}

// ==================== ACTIVE LINKS ====================
function setActiveLinks() {
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    // Remove all active classes first
    sidebarLinks.forEach(link => link.classList.remove('active'));
    
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        const dataPage = link.getAttribute('data-page');
        
        // Check for exact match or inclusion
        if (href && (
            currentPath.endsWith(href) || 
            currentPath.includes(href.replace('.html', '')) ||
            (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html')))
        )) {
            link.classList.add('active');
        } else if (dataPage && currentPath.includes(dataPage)) {
            link.classList.add('active');
        }
        
        // Add click handler for mobile
        link.addEventListener('click', () => {
            if (SidebarState.isMobile) {
                setTimeout(() => {
                    SidebarState.close();
                }, 100);
            }
        });
    });
}

// ==================== EVENT LISTENERS ====================
function setupSidebarEvents() {
    const sidebar = document.querySelector('.sidebar-fixed');
    const closeBtn = document.getElementById('sidebar-close-btn');
    const openBtn = document.getElementById('sidebar-open-btn');
    const themeBtn = document.getElementById('theme-toggle-sidebar');
    const overlay = createOverlay();

    // Close button
    closeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Add click animation
        closeBtn.style.transform = 'scale(0.9)';
        setTimeout(() => closeBtn.style.transform = '', 150);
        
        SidebarState.close();
    });

    // Open button
    openBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Add click animation
        openBtn.style.transform = 'scale(0.9)';
        setTimeout(() => openBtn.style.transform = '', 150);
        
        SidebarState.open();
    });

    // Theme toggle
    themeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Add rotation animation
        themeBtn.style.transform = 'rotate(180deg)';
        setTimeout(() => themeBtn.style.transform = '', 300);
        
        // Call global theme toggle
        if (typeof window.toggleTheme === 'function') {
            window.toggleTheme();
        }
    });

    // Click outside to close (mobile only)
    document.addEventListener('click', (e) => {
        if (SidebarState.isMobile && SidebarState.isMobileOpen) {
            if (!sidebar?.contains(e.target) && !openBtn?.contains(e.target)) {
                SidebarState.close();
            }
        }
    });

    // Overlay click
    overlay?.addEventListener('click', () => {
        SidebarState.close();
    });

    // Prevent clicks inside sidebar from closing
    sidebar?.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// ==================== CREATE OVERLAY ====================
function createOverlay() {
    let overlay = document.querySelector('.sidebar-overlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }
    
    return overlay;
}

// ==================== RESIZE OBSERVER ====================
function setupResizeObserver() {
    let resizeTimeout;
    
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            SidebarState.checkMobile();
        }, 150);
    };

    window.addEventListener('resize', handleResize);
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        window.removeEventListener('resize', handleResize);
    });
}

// ==================== KEYBOARD NAVIGATION ====================
function setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        // Escape key closes sidebar
        if (e.key === 'Escape') {
            if (SidebarState.isMobile && SidebarState.isMobileOpen) {
                SidebarState.close();
            } else if (!SidebarState.isMobile && !SidebarState.isCollapsed) {
                SidebarState.close();
            }
        }
        
        // Ctrl+B toggles sidebar
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            SidebarState.toggle();
        }
    });
}

// ==================== THEME ICON UPDATE ====================
function updateSidebarThemeIcon() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const themeBtn = document.getElementById('theme-toggle-sidebar');
    
    if (!themeBtn) return;
    
    // Add fade animation
    themeBtn.style.opacity = '0';
    
    setTimeout(() => {
        if (currentTheme === 'light') {
            themeBtn.innerHTML = `
                <svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                <span>Light Mode</span>
            `;
        } else {
            themeBtn.innerHTML = `
                <svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <span>Dark Mode</span>
            `;
        }
        
        themeBtn.style.opacity = '1';
    }, 150);
}

// ==================== SWIPE GESTURES FOR MOBILE ====================
function setupSwipeGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        const sidebar = document.querySelector('.sidebar-fixed');
        
        if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
            if (swipeDistance > 0 && touchStartX < 50) { // Swipe right from left edge
                SidebarState.open();
            } else if (swipeDistance < 0 && sidebar?.classList.contains('mobile-open')) { // Swipe left
                SidebarState.close();
            }
        }
    }
}

// ==================== PAGE TRANSITION HANDLER ====================
function handlePageTransition() {
    // For SPAs or Turbo links
    document.addEventListener('turbo:load', () => {
        setTimeout(() => {
            setActiveLinks();
        }, 50);
    });
    
    // For HTMX
    document.addEventListener('htmx:afterSwap', () => {
        setTimeout(() => {
            setActiveLinks();
        }, 50);
    });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Load sidebar
    loadSidebar();
    
    // Setup swipe gestures for mobile
    setupSwipeGestures();
    
    // Handle page transitions
    handlePageTransition();
});

// ==================== EXPORT FOR GLOBAL USE ====================
window.SidebarAPI = {
    open: () => SidebarState.open(),
    close: () => SidebarState.close(),
    toggle: () => SidebarState.toggle(),
    updateTheme: updateSidebarThemeIcon,
    refresh: () => {
        setActiveLinks();
        updateSidebarThemeIcon();
    }
};

// Update theme icon when theme changes
window.addEventListener('themeChanged', (e) => {
    updateSidebarThemeIcon();
});

// Listen for navigation changes (for SPAs)
window.addEventListener('popstate', () => {
    setTimeout(() => {
        setActiveLinks();
    }, 50);
});

// ==================== ADD REQUIRED CSS ====================
const style = document.createElement('style');
style.textContent = `
    /* Sidebar Overlay */
    .sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .sidebar-mobile-open .sidebar-overlay {
        opacity: 1;
        visibility: visible;
    }
    
    /* Toggle Button Animation */
    #sidebar-close-btn,
    #sidebar-open-btn,
    #theme-toggle-sidebar {
        transition: all 0.3s cubic-bezier(0.2, 0.9, 0.3, 1);
    }
    
    #sidebar-close-btn:active,
    #sidebar-open-btn:active,
    #theme-toggle-sidebar:active {
        transform: scale(0.9);
    }
    
    /* Smooth transitions */
    .sidebar-fixed {
        transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1),
                    opacity 0.3s ease,
                    box-shadow 0.3s ease;
    }
    
    /* Disable body scroll on mobile when sidebar open */
    .sidebar-mobile-open {
        overflow: hidden !important;
        position: fixed;
        width: 100%;
    }
    
    /* Loading animation */
    .sidebar-fixed.loading {
        opacity: 0.5;
        pointer-events: none;
    }
    
    .sidebar-fixed.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 30px;
        height: 30px;
        border: 2px solid var(--flame);
        border-top-color: transparent;
        border-radius: 50%;
        animation: sidebarSpin 1s linear infinite;
    }
    
    @keyframes sidebarSpin {
        to { transform: rotate(360deg); }
    }
`;

document.head.appendChild(style);