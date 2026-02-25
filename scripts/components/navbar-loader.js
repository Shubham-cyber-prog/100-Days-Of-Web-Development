/**
 * Navbar Loader Component
 * Loads the glassmorphism navbar HTML and initializes functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();
});

async function loadNavbar() {
  try {
    const response = await fetch('components/navbar.html');
    if (!response.ok) {
      console.error('Failed to load navbar');
      return;
    }
    
    const navbarHTML = await response.text();
    
    // Insert navbar at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    
    // Initialize navbar after it's loaded
    initializeNavbar();
  } catch (error) {
    console.error('Error loading navbar:', error);
  }
}

function initializeNavbar() {
  // Set active link based on current page
  setActiveNavLink();
  
  // Initialize profile dropdown
  initializeProfileDropdown();
  
  // Update dark mode icon
  updateNavbarDarkModeIcon();
  
  // Handle close on outside click
  handleOutsideClick();
  // Initialize search functionality
  initializeSearch();
}

function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const dataPage = link.getAttribute('data-page');
    
    // Remove any existing active class
    link.classList.remove('active');
    
    // For home page, check if we're at root or index.html
    if (dataPage === 'home' && (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath === '/index.html')) {
      link.classList.add('active');
    } 
    // For other pages, check if path ends with the href
    else if (href && currentPath.endsWith(href.split('/').pop())) {
      link.classList.add('active');
    }
  });
}

function initializeProfileDropdown() {
  const profileBtn = document.getElementById('profileIconBtn');
  const profileTray = document.getElementById('profileTray');
  const darkModeBtn = document.getElementById('darkModeToggleBtn');
  
  if (!profileBtn || !profileTray) {
    console.warn('Profile button or tray not found');
    return;
  }
  
  // Toggle profile tray on button click
  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileTray.classList.toggle('open');
  });
  
  // Add dark mode toggle event listener
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Use existing toggleTheme if available, otherwise use fallback
      if (typeof window.toggleTheme === 'function') {
        window.toggleTheme();
      } else {
        navbarToggleTheme();
      }
    });
  }
}

function handleOutsideClick() {
  const profileTray = document.getElementById('profileTray');
  
  if (!profileTray) return;
  
  // Close profile tray when clicking outside
  document.addEventListener('click', (e) => {
    const profileBtn = document.getElementById('profileIconBtn');
    
    if (!profileTray.contains(e.target) && !profileBtn.contains(e.target)) {
      profileTray.classList.remove('open');
    }
  });
}

function updateNavbarDarkModeIcon() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'dark';
  const darkModeIcon = document.getElementById('darkModeIcon');
  
  if (!darkModeIcon) return;
  
  if (currentTheme === 'light') {
    // Sun Icon for light theme
    darkModeIcon.innerHTML = `
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    `;
  } else {
    // Moon Icon for dark theme
    darkModeIcon.innerHTML = `
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    `;
  }
}

// Theme toggle function wrapper for navbar (calls existing toggleTheme if available)
function navbarToggleTheme() {
  // Use existing toggleTheme from navigation.js if available
  if (typeof window.toggleTheme === 'function') {
    window.toggleTheme();
  } else {
    // Fallback implementation
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }
  
  // Update navbar icon
  updateNavbarDarkModeIcon();
  
  // Update sidebar icon if it exists
  if (typeof window.updateSidebarThemeIcon === 'function') {
    window.updateSidebarThemeIcon();
  }
}

// Export for use in other files
window.navbarToggleTheme = navbarToggleTheme;

function initializeSearch() {
  const navSearchInput = document.getElementById('searchInput');
  console.log('Nav search input found:', navSearchInput);
  if (navSearchInput) {
    let pendingValue = '';
    const applySearch = () => {
      const projectSearchInput = document.getElementById('projectSearch');
      console.log('Project search input found:', projectSearchInput);
      if (projectSearchInput && pendingValue !== projectSearchInput.value) {
        projectSearchInput.value = pendingValue;
        projectSearchInput.dispatchEvent(new Event('input', { bubbles: true }));
        // Scroll to projects section
        const projectsSection = document.querySelector('.projects-section') || document.getElementById('project-gallery')?.closest('section');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    navSearchInput.addEventListener('input', (e) => {
      pendingValue = e.target.value.trim();
      applySearch();
    });
    navSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = e.target.value.trim().toLowerCase();
        // Check for day redirect
        const dayMatch = value.match(/^day\s*(\d+)$/i) || value.match(/^(\d+)$/);
        if (dayMatch) {
          const dayNum = parseInt(dayMatch[1]);
          const liveLink = `public/Day ${dayNum.toString().padStart(2, '0')}/index.html`;
          window.location.href = liveLink;
        }
      }
    });
    // Try to apply initial value if any
    setTimeout(applySearch, 100);
    setTimeout(applySearch, 500);
    setTimeout(applySearch, 1000);
  }
}
window.updateNavbarDarkModeIcon = updateNavbarDarkModeIcon;

