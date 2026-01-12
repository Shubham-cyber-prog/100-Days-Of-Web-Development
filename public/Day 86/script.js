// Sample Data
const categories = [
    {
        id: 1,
        name: 'Web Development',
        icon: 'fas fa-code',
        description: 'Website & web app development',
        jobs: 1250
    },
    {
        id: 2,
        name: 'Graphic Design',
        icon: 'fas fa-paint-brush',
        description: 'Logo, brand identity & UI/UX design',
        jobs: 890
    },
    {
        id: 3,
        name: 'Writing & Translation',
        icon: 'fas fa-pen',
        description: 'Content writing, editing & translation',
        jobs: 1120
    },
    {
        id: 4,
        name: 'Digital Marketing',
        icon: 'fas fa-chart-line',
        description: 'SEO, social media & marketing strategy',
        jobs: 760
    },
    {
        id: 5,
        name: 'Video & Animation',
        icon: 'fas fa-video',
        description: 'Video editing & animation services',
        jobs: 540
    },
    {
        id: 6,
        name: 'Business Consulting',
        icon: 'fas fa-briefcase',
        description: 'Business strategy & consulting',
        jobs: 430
    }
];

const freelancers = [
    {
        id: 1,
        name: 'Alex Johnson',
        title: 'Full Stack Developer',
        rating: 4.9,
        reviews: 127,
        skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
        rate: '$85/hr',
        location: 'New York, USA'
    },
    {
        id: 2,
        name: 'Sarah Miller',
        title: 'UI/UX Designer',
        rating: 4.8,
        reviews: 89,
        skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
        rate: '$65/hr',
        location: 'London, UK'
    },
    {
        id: 3,
        name: 'David Chen',
        title: 'Content Writer',
        rating: 5.0,
        reviews: 203,
        skills: ['SEO Writing', 'Blog Posts', 'Copywriting', 'Editing'],
        rate: '$45/hr',
        location: 'Toronto, Canada'
    },
    {
        id: 4,
        name: 'Maria Garcia',
        title: 'Digital Marketer',
        rating: 4.7,
        reviews: 156,
        skills: ['Social Media', 'Google Ads', 'Analytics', 'Strategy'],
        rate: '$75/hr',
        location: 'Madrid, Spain'
    }
];

// DOM Elements
let menuToggle, navMenu;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    menuToggle = document.querySelector('.menu-toggle');
    navMenu = document.querySelector('.nav-menu');
    
    // Load initial data
    loadCategories();
    loadFreelancers();
    
    // Setup event listeners
    setupEventListeners();
    
    // Check authentication status
    checkAuth();
});

// Setup all event listeners
function setupEventListeners() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Login button click
    document.querySelectorAll('.login-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal('loginModal');
        });
    });
    
    // Signup button click
    document.querySelectorAll('.signup-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal('signupModal');
        });
    });
    
    // Form submissions
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    document.getElementById('signupForm')?.addEventListener('submit', handleSignup);
}

// Load categories into the grid
function loadCategories() {
    const grid = document.getElementById('categoryGrid');
    if (!grid) return;
    
    grid.innerHTML = categories.map(category => `
        <div class="category-card" onclick="searchCategory('${category.name}')">
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <p><small>${category.jobs.toLocaleString()} jobs available</small></p>
        </div>
    `).join('');
}

// Load freelancers into the grid
function loadFreelancers() {
    const grid = document.getElementById('freelancerGrid');
    if (!grid) return;
    
    grid.innerHTML = freelancers.map(freelancer => `
        <div class="freelancer-card">
            <div class="freelancer-header">
                <div class="freelancer-avatar">
                    ${freelancer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3>${freelancer.name}</h3>
                <p>${freelancer.title}</p>
                <div class="rating">
                    ${'★'.repeat(Math.floor(freelancer.rating))}${'☆'.repeat(5-Math.floor(freelancer.rating))}
                    <span>(${freelancer.reviews})</span>
                </div>
            </div>
            <div class="freelancer-info">
                <p><i class="fas fa-map-marker-alt"></i> ${freelancer.location}</p>
                <div class="skills">
                    ${freelancer.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="freelancer-footer">
                <span class="hourly-rate">${freelancer.rate}</span>
                <button class="hire-btn" onclick="hireFreelancer(${freelancer.id})">
                    <i class="fas fa-briefcase"></i> Hire
                </button>
            </div>
        </div>
    `).join('');
}

// Search functions
function searchServices() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        alert(`Searching for: ${query}\nIn a real application, this would show search results.`);
        // Implement actual search functionality here
    }
}

function searchTag(tag) {
    document.getElementById('searchInput').value = tag;
    searchServices();
}

function searchCategory(category) {
    alert(`Showing jobs in: ${category}\nIn a real application, this would filter the job listings.`);
}

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
}

function showSignupModal() {
    closeModal('loginModal');
    showModal('signupModal');
}

function selectSignupType(type) {
    const options = document.querySelectorAll('.signup-option');
    options.forEach(opt => opt.classList.remove('active'));
    
    const selected = document.querySelector(`[onclick="selectSignupType('${type}')"]`);
    if (selected) {
        selected.classList.add('active');
        const form = document.getElementById('signupForm');
        if (form) {
            form.style.display = 'block';
        }
    }
}

function showSignup(type) {
    showModal('signupModal');
    setTimeout(() => selectSignupType(type), 100);
}

// Form handlers
function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // In a real app, you would make an API call here
    console.log('Login attempt:', { email, password });
    alert('Login functionality would be implemented with backend API');
    
    closeModal('loginModal');
    // Clear form
    e.target.reset();
}

function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    
    // In a real app, you would make an API call here
    console.log('Signup attempt:', { name, email, password });
    alert('Signup functionality would be implemented with backend API');
    
    closeModal('signupModal');
    // Clear form
    e.target.reset();
}

// Freelancer functions
function hireFreelancer(id) {
    const freelancer = freelancers.find(f => f.id === id);
    if (freelancer) {
        const confirmed = confirm(`Hire ${freelancer.name} as your freelancer?`);
        if (confirmed) {
            alert(`You have successfully requested to hire ${freelancer.name}! They will contact you soon.`);
        }
    }
}

// Auth functions
function checkAuth() {
    // Check if user is logged in (in a real app, check localStorage/cookies)
    const isLoggedIn = localStorage.getItem('freelancehub_user') !== null;
    
    if (isLoggedIn) {
        // Update UI for logged in user
        const loginBtn = document.querySelector('.login-btn');
        const signupBtn = document.querySelector('.signup-btn');
        
        if (loginBtn && signupBtn) {
            loginBtn.textContent = 'Dashboard';
            signupBtn.textContent = 'Logout';
            
            signupBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('freelancehub_user');
                location.reload();
            });
        }
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        e.target.classList.remove('active');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key closes modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            closeModal(modal.id);
        });
    }
    
    // Ctrl/Cmd + K focuses search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput')?.focus();
    }
});

// Export data for potential use
window.freelanceHub = {
    categories,
    freelancers,
    searchServices,
    showSignup,
    hireFreelancer
};

console.log('FreelanceHub initialized successfully!');