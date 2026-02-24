/* Navbar Skeleton Loader */
.navbar-skeleton {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: var(--bg-primary, #1a1a1a);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
}

.skeleton-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

.skeleton-logo {
  width: 120px;
  height: 40px;
  background: rgba(128, 128, 128, 0.2);
  border-radius: 8px;
}

.skeleton-nav {
  display: flex;
  gap: 2rem;
}

.skeleton-link {
  width: 80px;
  height: 24px;
  background: rgba(128, 128, 128, 0.2);
  border-radius: 4px;
}

.skeleton-profile {
  width: 40px;
  height: 40px;
  background: rgba(128, 128, 128, 0.2);
  border-radius: 50%;
}

/* Error state */
.navbar-error {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ff4444;
  color: white;
  padding: 1rem;
  text-align: center;
}

.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.error-retry-btn {
  background: white;
  color: #ff4444;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.3s ease;
}

.error-retry-btn:hover {
  opacity: 0.9;
}

/* Mobile menu */
@media (max-width: 768px) {
  .navbar-links {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--bg-primary, #1a1a1a);
    backdrop-filter: blur(10px);
    padding: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
  }
  
  .navbar-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  
  body.menu-open {
    overflow: hidden;
  }
  
  .skeleton-nav {
    display: none;
  }
}

/* Animations */
@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* Accessibility */
.navbar-link:focus-visible,
#profileIconBtn:focus-visible,
#darkModeToggleBtn:focus-visible {
  outline: 2px solid var(--accent-color, #4a9eff);
  outline-offset: 2px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}