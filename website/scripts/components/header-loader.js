/**
 * Header Component Loader
 * Dynamically loads the header component and sets active navigation state
 */

async function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    try {
        const response = await fetch('../components/header.html');
        if (!response.ok) throw new Error('Failed to load header');
        
        const headerHTML = await response.text();
        headerPlaceholder.innerHTML = headerHTML;

        // Set active nav link based on current page
        setActiveNavLink();

        // Initialize theme on load
        initializeTheme();

        // Setup dropdowns (ensure navigation.js is loaded)
        if (typeof setupFeaturesDropdown === 'function') {
            setupFeaturesDropdown();
        }
        if (typeof setupUserMenuDropdown === 'function') {
            setupUserMenuDropdown();
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

/**
 * Set active class on current page's nav link
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Initialize theme from localStorage
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

/**
 * Update theme toggle icon based on current theme
 */
function updateThemeIcon(theme) {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;

    const iconSVG = theme === 'light' 
        ? `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-secondary)">
             <circle cx="12" cy="12" r="5"></circle>
             <line x1="12" y1="1" x2="12" y2="3"></line>
             <line x1="12" y1="21" x2="12" y2="23"></line>
             <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
             <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
             <line x1="1" y1="12" x2="3" y2="12"></line>
             <line x1="21" y1="12" x2="23" y2="12"></line>
             <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
             <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
           </svg>`
        : `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-secondary)">
             <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
           </svg>`;
    
    btn.innerHTML = iconSVG;
}

// Load header when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}
