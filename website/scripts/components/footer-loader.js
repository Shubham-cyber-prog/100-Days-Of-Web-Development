/**
 * Footer Component Loader
 * Dynamically loads the footer component
 */

async function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    try {
        const response = await fetch('../components/footer.html');
        if (!response.ok) throw new Error('Failed to load footer');
        
        const footerHTML = await response.text();
        footerPlaceholder.innerHTML = footerHTML;
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Load footer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}
