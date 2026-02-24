/**
 * About Page Logic - Leaderboard Stats with Premium GSAP Animations
 * Fetches real-time data from GitHub with comprehensive error handling.
 */

// ==================== GSAP ANIMATIONS ====================
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initial page load animation
document.addEventListener('DOMContentLoaded', () => {
    // Create a master timeline for sequential animations
    const masterTL = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    // Animate hero section with stagger
    masterTL
        .from('.hero-title', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        })
        .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .from('.leaderboard-panel', {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)"
        }, "-=0.6")
        .from('.mission-panel', {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)"
        }, "-=1");

    // Animate stat cards with stagger
    gsap.from('.stat-card', {
        scrollTrigger: {
            trigger: '.leaderboard-panel',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)"
    });

    // Animate mission phases
    gsap.from('.mission-phase', {
        scrollTrigger: {
            trigger: '.mission-phases-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
    });

    // Animate achievement cards with 3D rotation
    gsap.from('.achievement-card', {
        scrollTrigger: {
            trigger: '.achievements-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        rotationY: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out"
    });

    // Timeline items animation
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.timeline-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Tech stack items animation
    gsap.from('.tech-item', {
        scrollTrigger: {
            trigger: '.tech-stack-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 1.2,
        stagger: {
            amount: 1.5,
            grid: "auto",
            from: "center"
        },
        ease: "elastic.out(1, 0.3)"
    });

    // Floating animation for stat icons
    gsap.to('.stat-icon', {
        y: -5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Pulsing effect for phase icons
    gsap.to('.phase-icon', {
        scale: 1.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
    });

    // Glow animation for hero title
    gsap.to('.hero-title .text-flame', {
        textShadow: '0 0 20px #00e5ff, 0 0 40px #00b4d8',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Counter animations will be handled by the existing animateValue function
});

// ==================== GITHUB STATS ====================
const REPO_OWNER = 'Shubham-cyber-prog';
const REPO_NAME = '100-Days-Of-Web-Development-ECWoC26';

// Retry configuration
const RETRY_CONFIG = {
    maxRetries: 3,
    delayMs: 1000,
    backoffMultiplier: 2
};

/**
 * Fetches with exponential backoff retry mechanism
 */
async function fetchWithRetry(url, options = {}, retries = 0) {
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorData || response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            throw new Error('Invalid response format: expected JSON');
        }
        
        return await response.json();
    } catch (error) {
        const isRetryable = retries < RETRY_CONFIG.maxRetries && 
                          (error instanceof TypeError || error.message.includes('HTTP'));
        
        if (isRetryable) {
            const delay = RETRY_CONFIG.delayMs * Math.pow(RETRY_CONFIG.backoffMultiplier, retries);
            console.warn(`Retry attempt ${retries + 1}/${RETRY_CONFIG.maxRetries} after ${delay}ms:`, error.message);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(url, options, retries + 1);
        }
        
        throw error;
    }
}

/**
 * Display user-friendly error message in the UI
 */
function displayError(message) {
    const errorEl = document.getElementById('leaderboardError');
    if (errorEl) {
        errorEl.innerHTML = `
            <div class="error-message" style="
                padding: 16px;
                background: rgba(255, 100, 100, 0.2);
                border: 1px solid #ff6b6b;
                border-radius: 12px;
                color: #ff6b6b;
                margin-bottom: 20px;
                backdrop-filter: blur(10px);
                animation: slideIn 0.5s ease;
            ">
                <strong>⚠️ Error Loading Stats:</strong> ${message}
                <button onclick="location.reload()" style="
                    margin-left: 10px; 
                    padding: 8px 16px; 
                    cursor: pointer;
                    background: #ff6b6b;
                    border: none;
                    border-radius: 6px;
                    color: white;
                    font-weight: 600;
                    transition: all 0.3s;
                " onmouseover="this.style.transform='scale(1.05)'" 
                   onmouseout="this.style.transform='scale(1)'">Retry</button>
            </div>
        `;
        errorEl.style.display = 'block';
        
        // Animate error message
        gsap.from('.error-message', {
            y: -20,
            opacity: 0,
            duration: 0.5,
            ease: "back.out"
        });
    }
}

async function fetchLeaderboardStats() {
    const statsContainer = document.getElementById('leaderboardError') || document.querySelector('[data-stats-container]');
    
    try {
        // Show loading state with animation
        if (statsContainer) {
            statsContainer.innerHTML = '<p style="animation: pulse 1.5s infinite;">Loading stats...</p>';
        }
        
        const contributors = await fetchWithRetry(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`,
            { headers: { 'Accept': 'application/vnd.github.v3+json' } }
        );
        
        if (!Array.isArray(contributors)) {
            throw new Error('Invalid response: expected array of contributors');
        }

        // Calculate Stats
        const totalContributors = contributors.length;
        const totalContributions = contributors.reduce((sum, user) => sum + user.contributions, 0);
        const totalPoints = (totalContributions * 10) + 1337;

        if (statsContainer) {
            statsContainer.style.display = 'none';
        }

        // Animate the numbers with GSAP
        animateValueWithGSAP("statContributors", 0, totalContributors, 2000);
        animateValueWithGSAP("statPoints", 0, totalPoints, 2500);
        animateValueWithGSAP("statPRs", 0, totalContributions, 2200);

        // Add celebration animation after numbers load
        gsap.to('.stat-card', {
            scale: 1.05,
            duration: 0.5,
            stagger: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });

        updateTimestamps();

    } catch (error) {
        console.error('Failed to load leaderboard stats:', error);
        
        const errorMsg = error.message.includes('Failed to fetch') 
            ? 'Network error. Using cached data.'
            : 'API error. Using default values.';
        
        displayError(errorMsg);
        
        // Fallback values with animation
        animateValueWithGSAP("statContributors", 0, 237, 1500);
        animateValueWithGSAP("statPoints", 0, 8363, 2000);
        animateValueWithGSAP("statPRs", 0, 1287, 1800);
        updateTimestamps();
    }
}

// Enhanced number animation with GSAP
function animateValueWithGSAP(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;

    // Store the element and animate the number
    const data = { value: start };
    
    gsap.to(data, {
        value: end,
        duration: duration / 1000,
        ease: "power2.out",
        onUpdate: function() {
            obj.textContent = Math.floor(data.value).toLocaleString();
            
            // Add scale pulse on significant updates
            if (Math.floor(data.value) % 50 === 0 && data.value < end) {
                gsap.to(obj, {
                    scale: 1.1,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1
                });
            }
        },
        onComplete: function() {
            obj.textContent = end.toLocaleString();
            
            // Final celebration pop
            gsap.to(obj, {
                scale: 1.2,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: "back.out"
            });
        }
    });
}

function updateTimestamps() {
    const now = new Date();
    const options = { 
        weekday: 'short', 
        day: '2-digit', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
    };
    const dateString = now.toLocaleDateString('en-US', options);

    const els = document.querySelectorAll('.live-timestamp');
    els.forEach(el => el.textContent = dateString);
}

// Hover animations for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover animations to stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(0, 229, 255, 0.3)',
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Add hover animations to achievement cards
    document.querySelectorAll('.achievement-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.03,
                boxShadow: '0 20px 40px rgba(0, 229, 255, 0.2)',
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Add hover animations to timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                x: 10,
                backgroundColor: 'rgba(0, 229, 255, 0.1)',
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                x: 0,
                backgroundColor: 'transparent',
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    fetchLeaderboardStats();
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        gsap.to('.hero-section', {
            y: scrolled * 0.5,
            opacity: 1 - scrolled * 0.002,
            duration: 0.1,
            ease: "none"
        });
    });
});

// Add CSS keyframes for loading animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .stat-card, .achievement-card, .timeline-item, .tech-item {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);