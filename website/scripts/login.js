/**
 * Login Page - Refactored with AppCore and Notify Integration
 * Uses centralized state management and unified notification system
 * 
 * @version 2.0.0
 * @author 100 Days of Web Dev Team
 */

// Firebase imports (optional - for Firebase auth)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    sendPasswordResetEmail,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Import App Core and Notify (will fallback to window globals if not module)
let App, Notify;

// Your Firebase configuration - REPLACE WITH YOUR ACTUAL CONFIG
const firebaseConfig = (() => {
    const defaultConfig = {
        apiKey: "YOUR_API_KEY_HERE",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    };
    if (typeof __firebase_config === 'object' && __firebase_config !== null) {
        return __firebase_config;
    } else if (typeof __firebase_config === 'string' && __firebase_config.trim()) {
        try {
            return JSON.parse(__firebase_config);
        } catch (e) {
            return defaultConfig;
        }
    } else {
        return defaultConfig;
    }
})();

// Initialize Firebase
let app, auth;
try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);

    // Set persistence to LOCAL
    setPersistence(auth, browserLocalPersistence)
        .then(() => console.log('Auth persistence set to LOCAL'))
        .catch((error) => console.error('Error setting persistence:', error));
} catch (error) {
    console.warn('Firebase not configured, using local auth:', error.message);
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🔐 Auth script loaded');

    // Load App and Notify from window or import
    try {
        const appModule = await import('./core/app.js');
        App = appModule.App;
    } catch (e) {
        App = window.App;
    }

    try {
        const notifyModule = await import('./core/Notify.js');
        Notify = notifyModule.Notify;
    } catch (e) {
        Notify = window.Notify;
    }

    // Check if already authenticated - redirect to dashboard
    if (App && App.isAuthenticated()) {
        if (Notify) Notify.info('Already logged in! Redirecting...');
        setTimeout(() => {
            window.location.href = '/website/pages/dashboard.html';
        }, 500);
        return;
    }

    // Firebase auth state observer (if available)
    if (auth) {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log('User already logged in:', user.email);

                // Login via App Core
                if (App) {
                    await App.login({
                        id: user.uid,
                        email: user.email,
                        name: user.displayName || user.email.split('@')[0]
                    }, true);
                }

                if (Notify) Notify.success('Welcome back! Redirecting...');

                setTimeout(() => {
                    window.location.href = '/website/pages/dashboard.html';
                }, 500);
            }
        });
    }

    // --- Elements ---
    const authForm = document.getElementById('authForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const submitBtn = document.getElementById('submitBtn');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const forgotPasswordAction = document.getElementById('forgotPasswordAction');
    const googleBtn = document.getElementById('googleBtn');
    const githubBtn = document.getElementById('githubBtn');
    const guestBtn = document.getElementById('guestBtn');

    // --- State ---
    let isLogin = true;

    // --- If form elements exist, setup login/register ---
    if (authForm) {
        // --- Toggle between Login and Register ---
        function attachToggleListener() {
            const toggleBtn = document.querySelector('#toggleAuth');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    isLogin = !isLogin;
                    updateUI();
                });
            }
        }

        // Initialize toggle listener
        attachToggleListener();

        function updateUI() {
            // Animate transition
            const headerText = document.querySelector('.auth-header');
            if (headerText) headerText.style.opacity = '0';

            setTimeout(() => {
                if (isLogin) {
                    authTitle.textContent = 'Welcome Back!';
                    authSubtitle.innerHTML = `Don't have an account? <button id="toggleAuth" class="text-link-btn">Create a new account now</button>, it's FREE!`;
                    if (confirmPasswordGroup) confirmPasswordGroup.style.display = 'none';
                    submitBtn.textContent = 'Login Now';
                    if (confirmPasswordInput) confirmPasswordInput.removeAttribute('required');
                    if (forgotPasswordAction) forgotPasswordAction.style.display = 'flex';
                } else {
                    authTitle.textContent = 'Create Account';
                    authSubtitle.innerHTML = `Already have an account? <button id="toggleAuth" class="text-link-btn">Log in instead</button>`;
                    if (confirmPasswordGroup) confirmPasswordGroup.style.display = 'block';
                    submitBtn.textContent = 'Join Now';
                    if (confirmPasswordInput) confirmPasswordInput.setAttribute('required', 'true');
                    if (forgotPasswordAction) forgotPasswordAction.style.display = 'none';
                }

                // Re-attach toggle listener
                attachToggleListener();

                if (headerText) {
                    headerText.style.transition = 'opacity 200ms ease';
                    headerText.style.opacity = '1';
                }

                // Clear previous errors
                clearErrors();
            }, 150);
        }

        // --- Form Validation ---
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function clearErrors() {
            const inputs = document.querySelectorAll('.form-input');
            inputs.forEach(input => {
                input.classList.remove('error');
                const errorMsg = input.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-msg')) {
                    errorMsg.remove();
                }
            });
        }

        function showError(input, message) {
            // Remove existing error
            const existingError = input.nextElementSibling;
            if (existingError && existingError.classList.contains('error-msg')) {
                existingError.remove();
            }

            // Add error class to input
            input.classList.add('error');

            // Create error message element
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-msg';
            errorMsg.textContent = message;
            errorMsg.style.color = '#ef4444';
            errorMsg.style.fontSize = '0.875rem';
            errorMsg.style.marginTop = '0.25rem';

            // Insert after input
            input.parentNode.insertBefore(errorMsg, input.nextSibling);

            // Shake animation
            input.style.animation = 'shake 0.3s ease-in-out';
            setTimeout(() => {
                input.style.animation = '';
            }, 300);
        }

        // Add shake animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            
            .error {
                border-color: #ef4444 !important;
                box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1) !important;
            }
            
            .loading {
                opacity: 0.7;
                cursor: not-allowed;
            }
            
            .text-link-btn {
                background: none;
                border: none;
                color: #3b82f6;
                text-decoration: underline;
                cursor: pointer;
                font-size: inherit;
                padding: 0;
                margin: 0;
            }
            
            .text-link-btn:hover {
                color: #2563eb;
            }
            
            .success-message {
                background: #10b981;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin: 1rem 0;
                text-align: center;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);

        // --- Form Submission ---
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();

            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

            let isValid = true;

            // Email validation
            if (!email) {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }

            // Password validation
            if (!password) {
                showError(passwordInput, 'Password is required');
                isValid = false;
            } else if (password.length < 6) {
                showError(passwordInput, 'Password must be at least 6 characters');
                isValid = false;
            }

            // Confirm password validation (for registration only)
            if (!isLogin) {
                if (!confirmPassword) {
                    showError(confirmPasswordInput, 'Please confirm your password');
                    isValid = false;
                } else if (password !== confirmPassword) {
                    showError(confirmPasswordInput, 'Passwords do not match');
                    isValid = false;
                }
            }

            if (!isValid) return;

            // Show loading state
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            try {
                let userCredential;

                if (isLogin) {
                    // Login
                    userCredential = await signInWithEmailAndPassword(auth, email, password);
                    console.log('Login successful:', userCredential.user.email);

                    // Login via App Core
                    if (App) {
                        await App.login({
                            id: userCredential.user.uid,
                            email: userCredential.user.email,
                            name: userCredential.user.displayName || userCredential.user.email.split('@')[0]
                        }, true);
                    }

                    // Show success notification
                    if (Notify) {
                        Notify.success('Login successful! Redirecting...');
                    } else {
                        showSuccessMessage('Login successful! Redirecting...');
                    }
                } else {
                    // Register
                    userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    console.log('Registration successful:', userCredential.user.email);

                    // Login via App Core
                    if (App) {
                        await App.login({
                            id: userCredential.user.uid,
                            email: userCredential.user.email,
                            name: userCredential.user.email.split('@')[0]
                        }, true);
                    }

                    // Show success notification
                    if (Notify) {
                        Notify.success('Account created successfully! Redirecting...');
                    } else {
                        showSuccessMessage('Account created successfully! Redirecting...');
                    }
                }

                // Legacy storage (for backward compatibility)
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', userCredential.user.email);
                localStorage.setItem('userId', userCredential.user.uid);

                // Wait 1.5 seconds then redirect
                setTimeout(() => {
                    window.location.href = '/website/pages/dashboard.html';
                }, 1500);

            } catch (error) {
                console.error('Auth error:', error);

                let errorMessage = 'An error occurred. Please try again.';

                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'No account found with this email.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Incorrect password.';
                        break;
                    case 'auth/email-already-in-use':
                        errorMessage = 'An account with this email already exists.';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'Password is too weak. Please use at least 6 characters.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Too many attempts. Please try again later.';
                        break;
                    case 'auth/network-request-failed':
                        errorMessage = 'Network error. Please check your connection.';
                        break;
                }

                // Show error via Notify or fallback
                if (Notify) {
                    Notify.error(errorMessage);
                } else {
                    showError(emailInput, errorMessage);
                }

                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        });

        function showSuccessMessage(message) {
            // Remove existing success messages
            const existingSuccess = document.querySelector('.success-message');
            if (existingSuccess) existingSuccess.remove();

            // Create success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
                ${message}
            `;

            // Insert after form
            authForm.parentNode.insertBefore(successMsg, authForm.nextSibling);
        }

        // --- Social Authentication ---
        if (googleBtn) {
            googleBtn.addEventListener('click', async () => {
                try {
                    const provider = new GoogleAuthProvider();
                    googleBtn.disabled = true;
                    googleBtn.textContent = 'Connecting...';
                    googleBtn.classList.add('loading');

                    const userCredential = await signInWithPopup(auth, provider);
                    console.log('Google sign-in successful:', userCredential.user.email);

                    // Login via App Core
                    if (App) {
                        await App.login({
                            id: userCredential.user.uid,
                            email: userCredential.user.email,
                            name: userCredential.user.displayName || 'Google User',
                            provider: 'google'
                        }, true);
                    }

                    // Legacy storage (for backward compatibility)
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', userCredential.user.email);
                    localStorage.setItem('userId', userCredential.user.uid);
                    localStorage.setItem('userName', userCredential.user.displayName);

                    // Show success via Notify or fallback
                    if (Notify) {
                        Notify.success('Google login successful! Redirecting...');
                    } else {
                        showSuccessMessage('Google login successful! Redirecting...');
                    }

                    setTimeout(() => {
                        window.location.href = '/website/pages/dashboard.html';
                    }, 1500);

                } catch (error) {
                    console.error('Google sign-in error:', error);
                    let errorMessage = 'Failed to sign in with Google. ';

                    if (error.code === 'auth/popup-blocked') {
                        errorMessage += 'Popup blocked by browser. Please allow popups for this site.';
                    } else if (error.code === 'auth/popup-closed-by-user') {
                        errorMessage += 'Popup closed. Please try again.';
                    } else {
                        errorMessage += 'Please try again.';
                    }

                    // Show error via Notify or fallback
                    if (Notify) {
                        Notify.error(errorMessage);
                    } else {
                        showError(emailInput, errorMessage);
                    }
                    googleBtn.disabled = false;
                    googleBtn.textContent = 'Continue with Google';
                    googleBtn.classList.remove('loading');
                }
            });
        }

        if (githubBtn) {
            githubBtn.addEventListener('click', async () => {
                try {
                    const provider = new GithubAuthProvider();
                    githubBtn.disabled = true;
                    githubBtn.textContent = 'Connecting...';
                    githubBtn.classList.add('loading');

                    const userCredential = await signInWithPopup(auth, provider);
                    console.log('GitHub sign-in successful:', userCredential.user.email);

                    // Login via App Core
                    if (App) {
                        await App.login({
                            id: userCredential.user.uid,
                            email: userCredential.user.email || 'github-user@github.com',
                            name: userCredential.user.displayName || 'GitHub User',
                            provider: 'github'
                        }, true);
                    }

                    // Legacy storage (for backward compatibility)
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', userCredential.user.email || 'github-user@github.com');
                    localStorage.setItem('userId', userCredential.user.uid);
                    localStorage.setItem('userName', userCredential.user.displayName || 'GitHub User');

                    // Show success via Notify or fallback
                    if (Notify) {
                        Notify.success('GitHub login successful! Redirecting...');
                    } else {
                        showSuccessMessage('GitHub login successful! Redirecting...');
                    }

                    setTimeout(() => {
                        window.location.href = '/website/pages/dashboard.html';
                    }, 1500);

                } catch (error) {
                    console.error('GitHub sign-in error:', error);
                    let errorMessage = 'Failed to sign in with GitHub. ';

                    if (error.code === 'auth/popup-blocked') {
                        errorMessage += 'Popup blocked by browser. Please allow popups for this site.';
                    } else if (error.code === 'auth/popup-closed-by-user') {
                        errorMessage += 'Popup closed. Please try again.';
                    } else if (error.code === 'auth/account-exists-with-different-credential') {
                        errorMessage += 'An account already exists with this email. Try signing in with another method.';
                    } else {
                        errorMessage += 'Please try again.';
                    }

                    // Show error via Notify or fallback
                    if (Notify) {
                        Notify.error(errorMessage);
                    } else {
                        showError(emailInput, errorMessage);
                    }
                    githubBtn.disabled = false;
                    githubBtn.textContent = 'Continue with GitHub';
                    githubBtn.classList.remove('loading');
                }
            });
        }

        // --- Guest Login (Without Firebase Auth) ---
        if (guestBtn) {
            guestBtn.addEventListener('click', async () => {
                // Use Notify for confirmation or fallback to confirm()
                const confirmGuest = () => {
                    return new Promise(resolve => {
                        if (Notify && Notify.confirm) {
                            Notify.confirm('Continue as guest? Some features may be limited.', {
                                onConfirm: () => resolve(true),
                                onCancel: () => resolve(false)
                            });
                        } else {
                            resolve(confirm('Continue as guest? Some features may be limited.'));
                        }
                    });
                };

                const confirmed = await confirmGuest();
                if (!confirmed) return;

                // Guest login via App Core
                const guestUser = {
                    id: 'guest_' + Date.now(),
                    email: 'guest@example.com',
                    name: 'Guest User',
                    isGuest: true
                };

                if (App) {
                    await App.loginAsGuest(); // Use proper guest login method
                }

                // Legacy storage (for backward compatibility)
                localStorage.setItem('isGuest', 'true');
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('guestSession', Date.now().toString());
                localStorage.setItem('userName', 'Guest User');
                localStorage.setItem('userEmail', 'guest@example.com');
                localStorage.setItem('userId', guestUser.id);

                console.log('Guest login successful');

                // Show success via Notify or fallback
                if (Notify) {
                    Notify.success('Welcome Guest! Redirecting...');
                } else {
                    showSuccessMessage('Welcome Guest! Redirecting...');
                }

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            });
        }

        // --- Forgot Password ---
        if (forgotPasswordAction) {
            forgotPasswordAction.addEventListener('click', async (e) => {
                e.preventDefault();

                const email = emailInput.value.trim();

                if (!email) {
                    if (Notify) {
                        Notify.warning('Please enter your email address first.');
                    } else {
                        showError(emailInput, 'Please enter your email address first.');
                    }
                    return;
                }

                if (!validateEmail(email)) {
                    if (Notify) {
                        Notify.warning('Please enter a valid email address.');
                    } else {
                        showError(emailInput, 'Please enter a valid email address.');
                    }
                    return;
                }

                try {
                    forgotPasswordAction.textContent = 'Sending...';
                    forgotPasswordAction.disabled = true;

                    await sendPasswordResetEmail(auth, email);

                    if (Notify) {
                        Notify.success(`Password reset email sent to ${email}. Check your inbox.`);
                    } else {
                        showSuccessMessage(`Password reset email sent to ${email}. Please check your inbox.`);
                    }
                } catch (error) {
                    console.error('Password reset error:', error);

                    let errorMessage = 'Failed to send password reset email. ';

                    if (error.code === 'auth/user-not-found') {
                        errorMessage = 'No account found with this email.';
                    } else if (error.code === 'auth/too-many-requests') {
                        errorMessage = 'Too many attempts. Please try again later.';
                    } else {
                        errorMessage += 'Please try again.';
                    }

                    if (Notify) {
                        Notify.error(errorMessage);
                    } else {
                        showError(emailInput, errorMessage);
                    }
                } finally {
                    forgotPasswordAction.textContent = 'Forgot Password?';
                    forgotPasswordAction.disabled = false;
                }
            });
        }

        // --- Demo Login for Testing (Remove in production) ---
        function setupDemoLogin() {
            // Add demo button if not exists
            if (!document.getElementById('demoBtn')) {
                const demoBtn = document.createElement('button');
                demoBtn.id = 'demoBtn';
                demoBtn.className = 'demo-btn';
                demoBtn.textContent = 'Try Demo Account';
                demoBtn.style.cssText = `
                    background: #10b981;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    margin-top: 20px;
                    font-weight: 500;
                    width: 100%;
                `;

                demoBtn.addEventListener('click', () => {
                    // Auto-fill demo credentials
                    emailInput.value = 'demo@example.com';
                    passwordInput.value = 'demo123';

                    if (confirm('Use demo account? Email: demo@example.com, Password: demo123')) {
                        // Trigger form submission after 1 second
                        setTimeout(() => {
                            authForm.dispatchEvent(new Event('submit'));
                        }, 1000);
                    }
                });

                authForm.parentNode.insertBefore(demoBtn, authForm.nextSibling);
            }
        }

        // Only enable demo in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            setupDemoLogin();
        }
    }
});

// Export auth for other files to use
export { auth };
