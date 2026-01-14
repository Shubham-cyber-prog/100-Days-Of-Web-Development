/**
 * Auth Guard
 * Protects routes by checking for a session token.
 * Redirects unauthenticated users to login.html.
 */

(function () {
    const protectedRoutes = [
        'dashboard.html',
        'projects.html',
        'about.html',
        'contributors.html',
        'structure.html'
    ];

    const currentPath = window.location.pathname;
    const isLoginPage = currentPath.includes('login.html');
    const isGuest = sessionStorage.getItem('authGuest') === 'true';
    const isAuthenticated = sessionStorage.getItem('authToken') === 'true' && !isGuest;

    // 1. If not authenticated and trying to access a protected page
    if (!isAuthenticated) {
        const isProtected = protectedRoutes.some(route => currentPath.includes(route));

        // Root path check (index.html or empty)
        const isRoot = currentPath.endsWith('/') || currentPath.endsWith('index.html');

        if (isProtected || isRoot) {
            if (!isLoginPage) {
                // Determine correct path to login.html relative to current location
                // If at root level website/, login is at pages/login.html
                // If in pages/, login is at login.html

                let loginPath = 'pages/login.html';
                if (currentPath.includes('/pages/')) {
                    loginPath = 'login.html';
                } else if (isRoot) {
                    // From root/index.html -> pages/login.html
                    loginPath = 'website/pages/login.html'; // Assuming purely local file structure relative to dev root might be tricky without a server, but let's assume relative links.
                    // A safer bet for local file dev is checking the depth

                    // ACTUALLY: Let's assume standard relative paths
                    if (currentPath.endsWith('website/') || currentPath.endsWith('website/index.html')) {
                        loginPath = 'pages/login.html';
                    }
                }

                // If a guest token exists, force removal to prevent bypass
                if (isGuest) sessionStorage.removeItem('authGuest');
                window.location.href = loginPath;
            }
        }
    }

    // 2. If authenticated and on login page, redirect to home
    if (isAuthenticated && isLoginPage) {
        window.location.href = 'dashboard.html';
    }
})();
