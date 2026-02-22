/**
 * Auth Service
 * Handles login simulation.
 */

function handleLogin(provider) {
    console.log(`Authenticating with ${provider}...`);
    // Simulate API delay
    const btn = event.currentTarget;
    const originalText = btn.innerText;
    btn.innerText = 'Connecting...';
    btn.style.opacity = '0.7';

    setTimeout(() => {
        sessionStorage.setItem('authToken', 'true');
        // Redirect
        window.location.href = 'dashboard.html';
    }, 800);
}

function handleEmailLogin(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;

    btn.innerText = 'Verifying Credentials...';
    btn.style.opacity = '0.7';

    setTimeout(() => {
        sessionStorage.setItem('authToken', 'true');
        window.location.href = 'dashboard.html';
    }, 1000);
}

// Guest login removed: no handleGuestLogin() provided to prevent bypass.
