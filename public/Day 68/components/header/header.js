export async function loadHeader() {
  try {
    const res = await fetch("./components/header/header.html");
    
    if (!res.ok) {
      throw new Error(`Failed to load header component: ${res.status}`);
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
      throw new Error('Invalid response format for header component');
    }
    
    const html = await res.text();
    const headerEl = document.getElementById("header");
    
    if (!headerEl) {
      console.error('Header element not found in DOM');
      return;
    }
    
    headerEl.innerHTML = html;
    attachMenu();
  } catch (error) {
    console.error('Error loading header:', error);
    const headerEl = document.getElementById("header");
    if (headerEl) {
      headerEl.innerHTML = '<p style="color: #e74c3c; padding: 10px;">Failed to load header. Please refresh the page.</p>';
    }
  }
}

function attachMenu() {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");

  btn.onclick = e => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
  };

  document.onclick = () => menu.classList.add("hidden");
}
