/**
 * Liquid Cursor Trail - Enhanced Version
 * Ultra-smooth fluid trail with particle effects and beautiful animations
 */

(function initLiquidTrail() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    function isTouchDevice() {
        return ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0) || 
               (navigator.msMaxTouchPoints > 0);
    }
    
    if (prefersReducedMotion || isTouchDevice()) return;
    
    // Remove existing instance if any
    const existing = document.getElementById('liquid-cursor-container');
    if (existing) existing.remove();
    
    // Create main container
    const container = document.createElement('div');
    container.id = 'liquid-cursor-container';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(container);
    
    // Add custom styles
    const style = document.createElement('style');
    style.textContent = `
        .cursor-dot {
            position: absolute;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
            transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .cursor-ring {
            position: absolute;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: 
                width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                border-color 0.3s ease,
                opacity 0.3s ease;
        }
        
        .trail-segment {
            position: absolute;
            width: 24px;
            height: 24px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            pointer-events: none;
            filter: blur(4px);
            opacity: 0.8;
            transform-origin: center;
            z-index: 9998;
            will-change: transform, opacity;
        }
        
        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            z-index: 9997;
            will-change: transform, opacity;
        }
        
        .sparkle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            filter: blur(1px);
            z-index: 9996;
        }
        
        /* Heat gradient classes for trail segments */
        .heat-0 { background: linear-gradient(135deg, #ff6b6b, #ffa726); opacity: 0.9; }
        .heat-1 { background: linear-gradient(135deg, #ffa726, #4ecdc4); opacity: 0.8; }
        .heat-2 { background: linear-gradient(135deg, #4ecdc4, #45b7d1); opacity: 0.7; }
        .heat-3 { background: linear-gradient(135deg, #45b7d1, #96ceb4); opacity: 0.6; }
        .heat-4 { background: linear-gradient(135deg, #96ceb4, #feca57); opacity: 0.5; }
        
        /* Interactive states */
        .cursor-interactive .cursor-dot {
            transform: scale(1.5);
            background: linear-gradient(135deg, #ff6b6b, #ffa726);
        }
        
        .cursor-interactive .cursor-ring {
            width: 60px;
            height: 60px;
            border-color: rgba(255, 107, 107, 0.5);
            border-width: 1px;
        }
        
        .cursor-interactive .trail-segment {
            filter: blur(2px);
            opacity: 0.6;
        }
        
        .cursor-clicking .cursor-dot {
            transform: scale(0.8);
        }
        
        .cursor-clicking .cursor-ring {
            width: 50px;
            height: 50px;
            border-color: rgba(255, 107, 107, 0.8);
            border-width: 3px;
        }
    `;
    document.head.appendChild(style);
    
    // Configuration
    const SEGMENT_COUNT = 15;
    const MAX_PARTICLES = 50;
    const MAX_SPARKLES = 20;
    
    // State
    const segments = [];
    const particles = [];
    const sparkles = [];
    let mouse = { x: -100, y: -100, vx: 0, vy: 0, prevX: -100, prevY: -100 };
    let isActive = false;
    let lastParticleTime = 0;
    let lastSparkleTime = 0;
    
    // Create cursor dot
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    container.appendChild(cursorDot);
    
    // Create cursor ring
    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    container.appendChild(cursorRing);
    
    // Initialize trail segments
    for (let i = 0; i < SEGMENT_COUNT; i++) {
        const seg = document.createElement('div');
        seg.className = 'trail-segment';
        
        // Apply heat gradient
        const heatLevel = Math.min(4, Math.floor((i / SEGMENT_COUNT) * 5));
        seg.classList.add(`heat-${heatLevel}`);
        
        container.appendChild(seg);
        
        segments.push({
            element: seg,
            x: -100,
            y: -100,
            size: 24 - (i * 1.2),
            drag: 0.1 + (i * 0.04)
        });
    }
    
    // Initialize particles
    for (let i = 0; i < MAX_PARTICLES; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        container.appendChild(particle);
        
        particles.push({
            element: particle,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            life: 0,
            maxLife: 0
        });
    }
    
    // Initialize sparkles
    for (let i = 0; i < MAX_SPARKLES; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        container.appendChild(sparkle);
        
        sparkles.push({
            element: sparkle,
            x: 0,
            y: 0,
            life: 0,
            maxLife: 0
        });
    }
    
    // Mouse tracking with velocity calculation
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        
        // Calculate velocity
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        const deltaTime = now - (mouse.lastTime || now);
        if (deltaTime > 0 && mouse.lastTime) {
            mouse.vx = (mouse.x - mouse.prevX) / deltaTime * 16;
            mouse.vy = (mouse.y - mouse.prevY) / deltaTime * 16;
        }
        mouse.lastTime = now;
        
        if (!isActive) {
            isActive = true;
            container.style.opacity = '1';
        }
    }, { passive: true });
    
    // Interactive elements
    const interactiveSelectors = 'a, button, input, textarea, select, .card, .project-card, [role="button"], .clickable, .interactive';
    
    document.body.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelectors)) {
            container.classList.add('cursor-interactive');
        }
    }, { passive: true });
    
    document.body.addEventListener('mouseout', (e) => {
        const related = e.relatedTarget;
        if (!related || !related.closest(interactiveSelectors)) {
            container.classList.remove('cursor-interactive');
        }
    }, { passive: true });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        container.classList.add('cursor-clicking');
        
        // Create click ripple
        createRipple(mouse.x, mouse.y);
    }, { passive: true });
    
    document.addEventListener('mouseup', () => {
        container.classList.remove('cursor-clicking');
    }, { passive: true });
    
    // Create ripple effect
    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(102, 126, 234, 0.8);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9995;
            animation: ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        `;
        
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                0% {
                    transform: translate(-50%, -50%) scale(0.5);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(4);
                    opacity: 0;
                }
            }
        `;
        
        document.head.appendChild(rippleStyle);
        container.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
            rippleStyle.remove();
        }, 600);
    }
    
    // Create particle
    function createParticle(x, y) {
        const now = Date.now();
        if (now - lastParticleTime < 16) return; // Limit to ~60fps
        
        lastParticleTime = now;
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            if (p.life <= 0) {
                p.x = x;
                p.y = y;
                p.vx = (Math.random() - 0.5) * 4;
                p.vy = (Math.random() - 0.5) * 4;
                p.life = p.maxLife = 20 + Math.random() * 30;
                p.element.style.opacity = '0.8';
                break;
            }
        }
    }
    
    // Create sparkle
    function createSparkle(x, y) {
        const now = Date.now();
        if (now - lastSparkleTime < 50) return;
        
        lastSparkleTime = now;
        
        for (let i = 0; i < sparkles.length; i++) {
            const s = sparkles[i];
            if (s.life <= 0) {
                s.x = x + (Math.random() - 0.5) * 20;
                s.y = y + (Math.random() - 0.5) * 20;
                s.life = s.maxLife = 10 + Math.random() * 20;
                s.element.style.opacity = '1';
                break;
            }
        }
    }
    
    // Animation loop
    let lastFrameTime = 0;
    const animate = (currentTime) => {
        const deltaTime = Math.min(16, currentTime - lastFrameTime);
        lastFrameTime = currentTime;
        
        if (!isActive) {
            requestAnimationFrame(animate);
            return;
        }
        
        // Update cursor dot (immediate)
        cursorDot.style.left = mouse.x + 'px';
        cursorDot.style.top = mouse.y + 'px';
        
        // Update cursor ring (smooth follow)
        const ringX = parseFloat(cursorRing.style.left || mouse.x);
        const ringY = parseFloat(cursorRing.style.top || mouse.y);
        
        cursorRing.style.left = (ringX + (mouse.x - ringX) * 0.15) + 'px';
        cursorRing.style.top = (ringY + (mouse.y - ringY) * 0.15) + 'px';
        
        // Update trail segments
        let prevX = mouse.x;
        let prevY = mouse.y;
        
        for (let i = 0; i < segments.length; i++) {
            const seg = segments[i];
            
            // Smooth movement with drag
            seg.x += (prevX - seg.x) * seg.drag;
            seg.y += (prevY - seg.y) * seg.drag;
            
            // Calculate distance and angle for rotation
            const dx = prevX - seg.x;
            const dy = prevY - seg.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            
            // Dynamic sizing based on velocity
            const velocity = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
            const stretch = Math.min(velocity * 0.02, 0.3);
            const squeeze = 1 - stretch * 0.5;
            
            // Apply transformation
            seg.element.style.transform = `
                translate3d(${seg.x}px, ${seg.y}px, 0)
                rotate(${angle}deg)
                scale(${1 + stretch}, ${squeeze})
            `;
            
            // Dynamic opacity
            const opacity = 0.8 - (i / segments.length) * 0.6;
            seg.element.style.opacity = opacity.toString();
            
            // Update previous position for next segment
            prevX = seg.x;
            prevY = seg.y;
            
            // Create particles from trailing segments occasionally
            if (i % 3 === 0 && Math.random() > 0.7) {
                createParticle(seg.x, seg.y);
            }
            
            // Create sparkles from faster segments
            if (velocity > 2 && i % 2 === 0 && Math.random() > 0.8) {
                createSparkle(seg.x, seg.y);
            }
        }
        
        // Update particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            if (p.life > 0) {
                p.life--;
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.95;
                p.vy *= 0.95;
                
                p.element.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
                p.element.style.opacity = (p.life / p.maxLife * 0.8).toString();
            }
        }
        
        // Update sparkles
        for (let i = 0; i < sparkles.length; i++) {
            const s = sparkles[i];
            if (s.life > 0) {
                s.life--;
                s.element.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
                s.element.style.opacity = (s.life / s.maxLife).toString();
            }
        }
        
        requestAnimationFrame(animate);
    };
    
    // Window visibility handling
    document.addEventListener('mouseleave', () => {
        container.style.opacity = '0';
        isActive = false;
    });
    
    document.addEventListener('mouseenter', () => {
        container.style.opacity = '1';
        isActive = true;
    });
    
    // Initialize
    requestAnimationFrame(animate);
    
    // Expose API for external control
    window.LiquidCursor = {
        enable: () => {
            container.style.opacity = '1';
            isActive = true;
        },
        disable: () => {
            container.style.opacity = '0';
            isActive = false;
        },
        setColor: (primary, secondary) => {
            document.documentElement.style.setProperty('--cursor-primary', primary);
            document.documentElement.style.setProperty('--cursor-secondary', secondary);
        }
    };
})();
