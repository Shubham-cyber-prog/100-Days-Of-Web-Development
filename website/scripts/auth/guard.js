
/**
 * Auth Guard v4.0 - UNIFIED AUTHENTICATION
 * Enhanced authentication protection using centralized App Core
 * Falls back to local storage when App Core is unavailable
 */

(function () {
    console.log('🔐 Auth Guard v4.0 loaded (App Core + Local Mode)');

    // Reference to App Core (will be loaded dynamically)
    let App = window.App || null;
    let Notify = window.Notify || null;

    // Load App Core dynamically
    async function loadAppCore() {
        try {
            // Determine correct path based on current location
            const path = window.location.pathname;
            let basePath = '../core/app.js';
            let notifyPath = '../core/Notify.js';
            
            if (path.endsWith('/') || path.includes('index.html')) {
                basePath = 'website/scripts/core/app.js';
                notifyPath = 'website/scripts/core/Notify.js';
            } else if (!path.includes('/pages/')) {
                basePath = '/website/scripts/core/app.js';
                notifyPath = '/website/scripts/core/Notify.js';
            }

            if (!App && !window.App) {
                const appModule = await import(basePath);
                App = appModule.App || appModule.default;
                window.App = App;
                console.log('✅ App Core loaded via Guard');
            } else {
                App = window.App;
            }

            if (!Notify && !window.Notify) {
                const notifyModule = await import(notifyPath);
                Notify = notifyModule.Notify || notifyModule.default;
                window.Notify = Notify;
                console.log('✅ Notify loaded via Guard');
            } else {
                Notify = window.Notify;
            }
        } catch (e) {
            console.warn('⚠️ Could not load App Core modules, using legacy auth:', e.message);
        }
    }

    // Determine correct path for auth-service.js based on current location
    function getAuthServicePath() {
        const path = window.location.pathname;
        if (path.includes('/pages/')) {
            return '../scripts/auth/auth-service.js';
        }
        if (path.endsWith('/') || path.includes('index.html')) {
            return 'website/scripts/auth/auth-service.js';
        }
        // Fallback for other locations
        return '/website/scripts/auth/auth-service.js';
    }

    // Load AuthService if not already loaded (legacy fallback)
    if (!window.AuthService) {
        const script = document.createElement('script');
        script.src = getAuthServicePath();
        script.onload = () => {
            console.log('🔐 AuthService loaded via Guard');
            initGuard();
        };
        script.onerror = () => {
            console.error('❌ Failed to load AuthService from:', script.src);
            initGuard(); // Still try to run with App Core
        };
        document.head.appendChild(script);
    } else {
        initGuard();
    }

    // Initialize guard after loading dependencies
    async function initGuard() {
        await loadAppCore();
        runAuthGuard();
    }

    // Protected routes (require authentication)
    const protectedRoutes = [
        'dashboard.html',
        'projects.html',
        'about.html',
        'contributors.html',
        'structure.html',
        'profile.html',
        '404.html',
        'api-status.html',
        'documentation.html',
        'system-logic.html'
    ];

    // Public routes (always accessible)
    const publicRoutes = [
        'index.html',
        ''
    ];

    // Get current path
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    console.log('📍 Current page:', currentPage);
    console.log('📍 Current path:', currentPath);

    // Check authentication status - App Core first, then legacy
    function checkAuthStatus() {
        // Try App Core first (unified auth)
        if (App && typeof App.isAuthenticated === 'function') {
            const isAuthenticated = App.isAuthenticated();
            const user = App.getUser ? App.getUser() : null;
            const isGuest = user?.isGuest || false;
            
            console.log('🔍 App Core auth check:', { isAuthenticated, isGuest, user: user?.email || 'none' });
            
            return { isAuthenticated, isGuest, user };
        }

        // Try AuthService (legacy local auth)
        const auth = window.AuthService;

        if (auth) {
            const isAuthenticated = auth.isAuthenticated();
            const isGuest = auth.isGuest();
            const user = auth.getCurrentUser();

            console.log('🔍 AuthService auth check:', { isAuthenticated, isGuest, user: user?.email || 'none' });

            return { isAuthenticated, isGuest, user };
        }

        // Final fallback - check storage directly
        console.warn('⚠️ No auth service available, checking storage directly');
        const sessionAuth = sessionStorage.getItem('authToken') === 'true';
        const localAuth = localStorage.getItem('isLoggedIn') === 'true' || 
                          localStorage.getItem('isAuthenticated') === 'true';
        const isGuest = localStorage.getItem('isGuest') === 'true';
        
        return { 
            isAuthenticated: sessionAuth || localAuth || isGuest, 
            isGuest, 
            user: null 
        };
    }

    /* ==========================================
       FIREBASE AUTH CHECK - COMMENTED OUT
       ==========================================
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
    ========================================== */

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

    // Get correct home path
    function getHomePath() {
        // Check if we're in pages directory
        if (currentPath.includes('/pages/')) {
            return '../index.html';
        }

        // Check if we're in root
        if (currentPath.endsWith('/') || currentPath.includes('index.html')) {
            return 'index.html';
        }

        // Default (relative to current location)
        return '../index.html';
    }

    // Get correct dashboard path
    function getDashboardPath() {
        if (currentPath.includes('/pages/')) {
            return 'dashboard.html';
        }
        return 'pages/dashboard.html';
    }

    // Main guard logic
    function runAuthGuard() {
        // Check if any auth service is available
        if (!window.AuthService && !App) {
            console.log('⏳ Waiting for auth services to load...');
            return;
        }

        const authStatus = checkAuthStatus();
        console.log('🛡️ Auth status:', authStatus);

        const { isAuthenticated, isGuest } = authStatus;

        // Determine if current page needs protection
        const needsProtection = isProtectedRoute(currentPage);
        const isPublicPage = isPublicRoute(currentPage);

        console.log('📊 Page analysis:', {
            currentPage,
            needsProtection,
            isPublicPage,
            isAuthenticated,
            isGuest
        });

        // Case 1: User not authenticated and trying to access protected page → redirect to home
        if (!isAuthenticated && !isGuest && needsProtection) {
            console.log('❌ Unauthenticated access to protected page, redirecting to home');
            const homePath = getHomePath();

            // Clear any stale auth data
            if (App && App.logout) {
                App.logout();
            } else if (window.AuthService) {
                window.AuthService.logout();
            }

            // Show notification if available
            if (Notify) {
                Notify.warning('Please authenticate to access this page');
            }

            window.location.href = homePath;
            return;
        }

        // Case 3: Guest user trying to access protected page → allow but show notification
        if (isGuest && needsProtection) {
            console.log('👤 Guest user accessing protected page');
            showGuestNotification();
            return;
        }

        // Case 4: User authenticated on protected page → allow access
        if (isAuthenticated && needsProtection) {
            console.log('✅ Authenticated user accessing protected page');
            return;
        }

        // Case 5: User on public page → always allow
        if (isPublicPage) {
            console.log('🌐 Public page, allowing access');
            return;
        }

        // Default: Allow access but log
        console.log('ℹ️ Default case, allowing access');
    }

    // Run the guard - REMOVED to prevent race condition. 
    // It is triggered by script.onload or the check at the top.
    // runAuthGuard();

    // Show guest notification
    function showGuestNotification() {
        // Only show once per session
        if (!sessionStorage.getItem('guestNotificationShown')) {
            sessionStorage.setItem('guestNotificationShown', 'true');
            
            // Use Notify if available
            if (Notify) {
                Notify.warning('You\'re in Guest Mode. Some features may be limited.', {
                    duration: 5000,
                    icon: '👤'
                });
                return;
            }
            
            // Fallback to local notification
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

            // Redirect to home page
            window.location.href = getHomePath();
        },
        getHomePath,
        getDashboardPath
    };
})();
