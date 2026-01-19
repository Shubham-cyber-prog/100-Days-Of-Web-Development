
/**
 * Auth Guard v2.0
 * Enhanced authentication protection with Firebase integration
 * Protects routes by checking Firebase auth state and session tokens
 */

(function () {
    console.log('Auth Guard loaded');
    
    // Protected routes (require authentication)
    const protectedRoutes = [
        'dashboard.html',
        'projects.html',
        'about.html',
        'contributors.html',
        'structure.html'
    ];
    
    // Public routes (always accessible)
    const publicRoutes = [
        'login.html',
        'index.html',
        ''
    ];

    // Get current path
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    console.log('Current page:', currentPage);
    console.log('Current path:', currentPath);

    // Check authentication status
    function checkAuthStatus() {
        // Check Firebase auth first (if available)
        if (typeof auth !== 'undefined') {
            return new Promise((resolve) => {
                import('https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js')
                    .then(({ getAuth, onAuthStateChanged }) => {
                        const firebaseAuth = getAuth();
                        onAuthStateChanged(firebaseAuth, (user) => {
                            if (user) {
                                console.log('Firebase user authenticated:', user.email);
                                resolve({
                                    isAuthenticated: true,
                                    isGuest: false,
                                    user: user
                                });
                            } else {
                                // Check session/local storage as fallback
                                const sessionAuth = sessionStorage.getItem('authToken') === 'true';
                                const localAuth = localStorage.getItem('isLoggedIn') === 'true';
                                const isGuest = localStorage.getItem('isGuest') === 'true';
                                
                                resolve({
                                    isAuthenticated: sessionAuth || localAuth,
                                    isGuest: isGuest,
                                    user: null
                                });
                            }
                        });
                    })
                    .catch(() => {
                        // Firebase not available, use session storage
                        resolve(checkLegacyAuth());
                    });
            });
        } else {
            // Firebase not loaded, use legacy auth
            return Promise.resolve(checkLegacyAuth());
        }
    }

    // Legacy auth check (session/local storage)
    function checkLegacyAuth() {
        // Check session storage first
        const sessionAuth = sessionStorage.getItem('authToken') === 'true';
        const sessionGuest = sessionStorage.getItem('authGuest') === 'true';
        
        // Check local storage
        const localAuth = localStorage.getItem('isLoggedIn') === 'true';
        const localGuest = localStorage.getItem('isGuest') === 'true';
        
        // Combine checks (session takes priority)
        const isAuthenticated = sessionAuth || localAuth;
        const isGuest = sessionGuest || localGuest;
        
        console.log('Legacy auth check:', { isAuthenticated, isGuest });
        
        // Clean up inconsistent states
        if (isGuest && isAuthenticated) {
            console.log('Cleaning inconsistent auth state');
            localStorage.removeItem('isGuest');
            sessionStorage.removeItem('authGuest');
            return { isAuthenticated: true, isGuest: false, user: null };
        }
        
        return { isAuthenticated, isGuest, user: null };
    }

    // Check if current route is protected
    function isProtectedRoute(page) {
        return protectedRoutes.some(route => 
            page === route || 
            page.includes(route) ||
            (page === '' && route === 'dashboard.html') // Default redirect
        );
    }

    // Check if current route is public
    function isPublicRoute(page) {
        return publicRoutes.some(route => 
            page === route || 
            page.includes(route) ||
            page === '' // Empty path (root)
        );
    }

    // Get correct login path
    function getLoginPath() {
        // Check if we're in pages directory
        if (currentPath.includes('/pages/')) {
            return 'login.html';
        }
        
        // Check if we're in root
        if (currentPath.endsWith('/') || currentPath.includes('index.html')) {
            return 'pages/login.html';
        }
        
        // Default (relative to current location)
        return '../login.html';
    }

    // Get correct dashboard path
    function getDashboardPath() {
        if (currentPath.includes('/pages/')) {
            return 'dashboard.html';
        }
        return 'pages/dashboard.html';
    }

    // Main guard logic
    async function runAuthGuard() {
        const authStatus = await checkAuthStatus();
        console.log('Auth status:', authStatus);
        
        const { isAuthenticated, isGuest } = authStatus;
        
        // Determine if current page needs protection
        const needsProtection = isProtectedRoute(currentPage);
        const isPublicPage = isPublicRoute(currentPage);
        const isLoginPage = currentPage === 'login.html' || currentPage.includes('login');
        
        console.log('Page analysis:', {
            currentPage,
            needsProtection,
            isPublicPage,
            isLoginPage
        });

        // Case 1: User is authenticated but on login page → redirect to dashboard
        if ((isAuthenticated || isGuest) && isLoginPage) {
            console.log('Authenticated user on login page, redirecting to dashboard');
            const dashboardPath = getDashboardPath();
            setTimeout(() => {
                window.location.href = dashboardPath;
            }, 500);
            return;
        }

        // Case 2: User not authenticated and trying to access protected page → redirect to login
        if (!isAuthenticated && !isGuest && needsProtection) {
            console.log('Unauthenticated access to protected page, redirecting to login');
            const loginPath = getLoginPath();
            
            // Clear any stale auth data
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('authGuest');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('isGuest');
            
            setTimeout(() => {
                window.location.href = loginPath;
            }, 500);
            return;
        }

        // Case 3: Guest user trying to access protected page → allow but log
        if (isGuest && needsProtection) {
            console.log('Guest user accessing protected page, allowing with limitations');
            // Show guest notification if needed
            showGuestNotification();
            return;
        }

        // Case 4: User authenticated on protected page → allow access
        if (isAuthenticated && needsProtection) {
            console.log('Authenticated user accessing protected page, allowing access');
            return;
        }

        // Case 5: User on public page → always allow
        if (isPublicPage) {
            console.log('Public page, allowing access');
            return;
        }

        // Default: Allow access but log
        console.log('Default case, allowing access');
    }

    // Show guest notification
    function showGuestNotification() {
        // Only show once per session
        if (!sessionStorage.getItem('guestNotificationShown')) {
            setTimeout(() => {
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #f59e0b;
                    color: #000;
                    padding: 12px 20px;
                    border-radius: 8px;
                    z-index: 9999;
                    font-weight: 500;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    animation: slideIn 0.3s ease;
                `;
                notification.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span>👤</span>
                        <span>You're in Guest Mode. Some features may be limited.</span>
                    </div>
                `;
                document.body.appendChild(notification);
                
                // Auto remove after 5 seconds
                setTimeout(() => {
                    notification.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => notification.remove(), 300);
                }, 5000);
                
                sessionStorage.setItem('guestNotificationShown', 'true');
            }, 1000);
        }
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Initialize guard
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, running auth guard');
        setTimeout(runAuthGuard, 100); // Small delay to ensure everything is loaded
    });

    // Also run guard when page becomes visible (tab switch)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            console.log('Page became visible, checking auth');
            runAuthGuard();
        }
    });

    // Export functions for manual triggering
    window.AuthGuard = {
        checkAuth: checkAuthStatus,
        logout: () => {
            // Clear all auth data
            sessionStorage.clear();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('isGuest');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            
            // Redirect to login
            window.location.href = getLoginPath();
        },
        getLoginPath,
        getDashboardPath
    };
})();
