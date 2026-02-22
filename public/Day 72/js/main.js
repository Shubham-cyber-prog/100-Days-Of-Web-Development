// Main JS for Navigation and Shared Functionality

document.addEventListener('DOMContentLoaded', function() {
    highlightActiveNav();
    setupHamburgerMenu();
    setupLogout();
});

function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

function setupLogout() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        });
    }
}

function checkAuth() {
    const user = localStorage.getItem('user');
    const currentPage = window.location.pathname.split('/').pop();

    if (!user && currentPage === 'dashboard.html') {
        window.location.href = 'login.html';
    }

    if (user && (currentPage === 'login.html' || currentPage === 'signup.html')) {
        const userName = JSON.parse(user).name;
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            userMenu.innerHTML = `<span>Welcome, <strong>${userName}</strong></span> <button class="logout-btn">Logout</button>`;
            setupLogout();
        }
    }
}

window.addEventListener('load', checkAuth);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
