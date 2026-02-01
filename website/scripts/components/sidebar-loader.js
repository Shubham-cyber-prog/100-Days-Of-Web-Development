/**
 * Sidebar Loader Component
 * Loads the sidebar HTML and initializes active states
 */

document.addEventListener('DOMContentLoaded', () => {
  loadSidebar();
});

async function loadSidebar() {
  try {
    const response = await fetch('../components/sidebar.html');
    if (!response.ok) {
      console.error('Failed to load sidebar');
      return;
    }
    
    const sidebarHTML = await response.text();
    
    // Insert sidebar at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
    
    // Initialize sidebar after it's loaded
    initializeSidebar();
  } catch (error) {
    console.error('Error loading sidebar:', error);
  }
}

function initializeSidebar() {
  // Set active link based on current page
  const currentPath = window.location.pathname;
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    const dataPage = link.getAttribute('data-page');
    
    // Check if current path includes the link's href or data-page
    if (href && currentPath.includes(href)) {
      link.classList.add('active');
    } else if (dataPage && currentPath.includes(dataPage)) {
      link.classList.add('active');
    }
  });
  
  // Update theme icon in sidebar
  updateSidebarThemeIcon();
}

function updateSidebarThemeIcon() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'dark';
  const themeBtn = document.getElementById('theme-toggle-sidebar');
  
  if (!themeBtn) return;
  
  if (currentTheme === 'light') {
    // Sun Icon for light theme
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
      <span>Theme</span>
    `;
  } else {
    // Moon Icon for dark theme
    themeBtn.innerHTML = `
      <svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      <span>Theme</span>
    `;
  }
}

// Export for use in navigation.js
if (typeof window !== 'undefined') {
  window.updateSidebarThemeIcon = updateSidebarThemeIcon;
}
