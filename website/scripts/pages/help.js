  // Fix light theme text visibility
  function fixHelpPageTheme() {
    const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
    
    if (isLightTheme) {
      document.body.classList.add('light-theme-help');
    } else {
      document.body.classList.remove('light-theme-help');
    }
  }

  // Run on page load
  document.addEventListener('DOMContentLoaded', fixHelpPageTheme);

  // Listen for theme changes
  const themeObserver = new MutationObserver(fixHelpPageTheme);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  // Override theme toggle to trigger fix
  const originalToggleTheme = window.toggleTheme;
  if (originalToggleTheme) {
    window.toggleTheme = function() {
      originalToggleTheme();
      setTimeout(fixHelpPageTheme, 100);
    };
  }