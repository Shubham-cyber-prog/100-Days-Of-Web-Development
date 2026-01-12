// Sample data for portfolio projects
const portfolioProjects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A fully responsive e-commerce website with shopping cart and payment integration.",
        category: "web",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        title: "Fitness Tracking App",
        description: "Mobile application for tracking workouts and nutrition with progress charts.",
        category: "mobile",
        tags: ["React Native", "Firebase", "Chart.js"],
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        title: "Travel Blog Platform",
        description: "Content management system for travel bloggers with photo galleries and maps.",
        category: "web",
        tags: ["WordPress", "PHP", "JavaScript", "Google Maps"],
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        title: "Task Management Dashboard",
        description: "Web application for team collaboration and project management.",
        category: "app",
        tags: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        title: "Recipe Sharing App",
        description: "Social platform for sharing and discovering new recipes.",
        category: "mobile",
        tags: ["Flutter", "Firebase", "Cloud Storage"],
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        title: "Portfolio Website",
        description: "Minimalist portfolio website with dark mode and animations.",
        category: "web",
        tags: ["HTML/CSS", "JavaScript", "GSAP", "Sass"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];

// Sample data for blog posts
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with React Hooks",
        excerpt: "Learn how to use React Hooks to simplify your functional components and manage state effectively.",
        category: "React",
        date: "2024-03-15",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        title: "Responsive Design Best Practices",
        excerpt: "Essential techniques for creating websites that work perfectly on all devices.",
        category: "CSS",
        date: "2024-03-10",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        title: "JavaScript Performance Tips",
        excerpt: "Optimize your JavaScript code for better performance and faster loading times.",
        category: "JavaScript",
        date: "2024-03-05",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        title: "Building REST APIs with Node.js",
        excerpt: "Step-by-step guide to creating robust RESTful APIs using Express.js.",
        category: "Backend",
        date: "2024-02-28",
        readTime: "10 min read",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        title: "CSS Grid vs Flexbox",
        excerpt: "When to use CSS Grid and when to stick with Flexbox for your layouts.",
        category: "CSS",
        date: "2024-02-20",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        title: "Introduction to TypeScript",
        excerpt: "Learn how TypeScript can help you write more reliable JavaScript code.",
        category: "TypeScript",
        date: "2024-02-15",
        readTime: "9 min read",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];

// DOM Elements
const portfolioGrid = document.querySelector('.portfolio-grid');
const blogGrid = document.querySelector('.blog-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('loadMore');
const backToTopBtn = document.getElementById('backToTop');
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolioProjects('all');
    renderBlogPosts();
    setupEventListeners();
});

// Render Portfolio Projects
function renderPortfolioProjects(filter = 'all') {
    portfolioGrid.innerHTML = '';
    
    const filteredProjects = filter === 'all' 
        ? portfolioProjects 
        : portfolioProjects.filter(project => project.category === filter);
    
    filteredProjects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'portfolio-item';
        projectElement.dataset.category = project.category;
        
        projectElement.innerHTML = `
            <div class="portfolio-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="portfolio-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="portfolio-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        portfolioGrid.appendChild(projectElement);
    });
}

// Render Blog Posts
let visiblePosts = 3;
function renderBlogPosts() {
    blogGrid.innerHTML = '';
    
    const postsToShow = blogPosts.slice(0, visiblePosts);
    
    postsToShow.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'blog-card';
        
        postElement.innerHTML = `
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-category">${post.category}</span>
                    <span>${post.date} • ${post.readTime}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="#" class="read-more">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        blogGrid.appendChild(postElement);
    });
    
    // Show/hide load more button
    loadMoreBtn.style.display = visiblePosts >= blogPosts.length ? 'none' : 'block';
}

// Setup Event Listeners
function setupEventListeners() {
    // Portfolio Filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            const filter = button.dataset.filter;
            renderPortfolioProjects(filter);
        });
    });
    
    // Load More Blog Posts
    loadMoreBtn.addEventListener('click', () => {
        visiblePosts += 3;
        renderBlogPosts();
    });
    
    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Back to Top Button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Contact Form Submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 5px 10px rgba(0,0,0,0.1);
        }
        
        .nav-links li {
            margin: 10px 0;
        }
        
        .nav-links.active {
            display: flex;
        }
    }
`;
document.head.appendChild(style);

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});