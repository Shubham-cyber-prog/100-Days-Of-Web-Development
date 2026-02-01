/**
 * Enhanced Dashboard Animations v1.0
 * Adds interactive animations and visual enhancements to the dashboard
 */

document.addEventListener('DOMContentLoaded', () => {
    initDashboardAnimations();
});

function initDashboardAnimations() {
    // Initialize all animation components
    initScrollAnimations();
    initCounterAnimations();
    initCardHoverEffects();
    initParticleEffects();
    initStatsPulse();
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    // Observe all elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach((el) => {
        observer.observe(el);
    });
}

/**
 * Animated number counters for statistics
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-counter');
    
    counters.forEach((counter) => {
        const target = parseInt(counter.dataset.target || counter.textContent);
        const duration = parseInt(counter.dataset.duration || 2000);
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when visible
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        
        observer.observe(counter);
    });
}

/**
 * Enhanced card hover effects with 3D tilt
 */
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .contributor-card, .feature-card');
    
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

/**
 * Floating particle effects on hover
 */
function initParticleEffects() {
    const particleContainers = document.querySelectorAll('.particle-container');
    
    particleContainers.forEach((container) => {
        container.addEventListener('mouseenter', (e) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }
            
            createParticles(e.currentTarget, 10);
        });
    });
}

/**
 * Create floating particles
 */
function createParticles(container, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const x = Math.random() * 100 - 50;
        const y = Math.random() * -150 - 50;
        particle.style.setProperty('--float-x', x);
        particle.style.setProperty('--float-y', y);
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        container.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
}

/**
 * Pulse animation for statistics
 */
function initStatsPulse() {
    const stats = document.querySelectorAll('.stat-value');
    
    stats.forEach((stat) => {
        const pulseAnimation = () => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }
            
            stat.style.animation = 'none';
            requestAnimationFrame(() => {
                stat.style.animation = 'gentlePulse 1s ease-in-out';
            });
        };
        
        // Use IntersectionObserver to only animate when visible
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    pulseAnimation();
                    const interval = setInterval(() => {
                        if (entries[0].isIntersecting) {
                            pulseAnimation();
                        }
                    }, 5000);
                    
                    // Store interval for cleanup
                    stat.dataset.pulseInterval = interval;
                } else {
                    // Clear interval when not visible
                    if (stat.dataset.pulseInterval) {
                        clearInterval(parseInt(stat.dataset.pulseInterval));
                        delete stat.dataset.pulseInterval;
                    }
                }
            },
            { threshold: 0.1 }
        );
        
        observer.observe(stat);
    });
}

/**
 * Add smooth scroll behavior
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Progress bar animation for contributions
 */
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach((bar) => {
        const targetWidth = bar.dataset.progress || '0';
        
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    bar.style.width = `${targetWidth}%`;
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        
        observer.observe(bar);
    });
}

// Initialize progress bars
document.addEventListener('DOMContentLoaded', animateProgressBars);

/**
 * Sparkle effect on button click
 */
document.querySelectorAll('.btn-sparkle').forEach((button) => {
    button.addEventListener('click', function (e) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-effect';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        
        this.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    });
});

/**
 * Typewriter effect for hero text
 */
function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typewriter to elements with data-typewriter attribute
document.querySelectorAll('[data-typewriter]').forEach((el) => {
    const text = el.dataset.typewriter || el.textContent;
    const speed = parseInt(el.dataset.speed || 50);
    
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                typewriterEffect(el, text, speed);
                observer.disconnect();
            }
        },
        { threshold: 0.5 }
    );
    
    observer.observe(el);
});

/**
 * Ripple effect on card click
 */
document.querySelectorAll('.card-ripple').forEach((card) => {
    card.addEventListener('click', function (e) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
    window.DashboardAnimations = {
        initScrollAnimations,
        initCounterAnimations,
        initCardHoverEffects,
        createParticles,
        typewriterEffect
    };
}
