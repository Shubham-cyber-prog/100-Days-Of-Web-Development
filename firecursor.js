/**
 * Fire Cursor - Custom animated cursor implementation
 * Initializes and manages the custom cursor behavior
 */
(function() {
  'use strict';

  /**
   * Initialize the fire cursor
   * @returns {void}
   */
  function initFireCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-dot-outline');
    
    if (!cursorDot || !cursorOutline) {
      console.warn('Fire cursor elements not found');
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let isMoving = false;
    let animationId = null;

    // Add enabled class to body
    document.body.classList.add('firecursor-enabled');

    // Mouse movement handler
    const mouseMoveHandler = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;
    };

    // Animation loop
    const animateCursor = () => {
      // Smooth movement for dot
      dotX += (mouseX - dotX) * 0.3;
      dotY += (mouseY - dotY) * 0.3;
      
      // Slower movement for outline
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      
      // Apply transformations
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
      
      // Reset moving state after delay
      if (isMoving) {
        setTimeout(() => {
          isMoving = false;
        }, 100);
      }
      
      animationId = requestAnimationFrame(animateCursor);
    };

    // Click effect
    const clickHandler = () => {
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(0.7)`;
      cursorOutline.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.3)`;
      
      setTimeout(() => {
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
        cursorOutline.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
      }, 150);
    };

    // Hover effect for interactive elements
    const setupHoverEffects = () => {
      const interactiveSelectors = [
        'a',
        'button',
        '.btn',
        '.nav-link',
        '.feature-card',
        '.social-btn',
        'input',
        'textarea',
        'select'
      ];
      
      interactiveSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
          element.addEventListener('mouseenter', () => {
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.5)`;
            cursorOutline.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.5)`;
          });
          
          element.addEventListener('mouseleave', () => {
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
            cursorOutline.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
          });
        });
      });
    };

    // Event listeners
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('click', clickHandler);
    
    // Start animation
    animateCursor();
    
    // Setup hover effects
    setTimeout(setupHoverEffects, 1000);
    
    // Cleanup function
    window.cleanupFireCursor = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('click', clickHandler);
      document.body.classList.remove('firecursor-enabled');
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFireCursor);
  } else {
    initFireCursor();
  }
})();