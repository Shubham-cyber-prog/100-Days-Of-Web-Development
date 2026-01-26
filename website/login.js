/**
 * Local Authentication System
 * Firebase code commented out for future use
 */
// done all the issues 
/* ==========================================
   FIREBASE CODE - COMMENTED OUT FOR FUTURE USE
   ==========================================
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Your Firebase configuration - REPLACE WITH YOUR ACTUAL CONFIG
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
========================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔐 Local Auth System loaded');
    
    // Load AuthService
    const script = document.createElement('script');
    script.src = '../scripts/auth/auth-service.js';
    script.onload = () => initAuth();
    document.head.appendChild(script);
});

function initAuth() {
    const auth = window.AuthService;
    
    // Check if already authenticated
    if (auth.isAuthenticated()) {
        console.log('✅ User already authenticated, redirecting...');
        window.location.href = 'pages/dashboard.html';
        return;
    }
    
    console.log('🔓 Not authenticated, showing login form');
    
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
    const rememberMeCheckbox = document.getElementById('rememberMe');

    // --- State ---
    let isLogin = true;

    /* ==========================================
       FIREBASE AUTH CHECK - COMMENTED OUT
       ==========================================
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('User already logged in:', user.email);
            window.location.href = 'dashboard.html';
        }
    });
    ========================================== */

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
    `;
    document.head.appendChild(style);

    // --- Form Submission ---
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';
        const rememberMe = rememberMeCheckbox ? rememberMeCheckbox.checked : false;

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
            if (isLogin) {
                // === LOCAL LOGIN ===
                console.log('🔐 Attempting local login...');
                const result = await auth.login(email, password, rememberMe);
                
                if (result.success) {
                    console.log('✅ Login successful:', result.user.email);
                    // Show success and redirect
                    showSuccess('Welcome back! Redirecting...');
                    setTimeout(() => {
                        window.location.href = 'pages/dashboard.html';
                    }, 500);
                } else {
                    showError(emailInput, result.message);
                }
                
                /* ==========================================
                   FIREBASE LOGIN - COMMENTED OUT
                   ==========================================
                await signInWithEmailAndPassword(auth, email, password);
                console.log('Login successful');
                window.location.href = 'dashboard.html';
                ========================================== */
            } else {
                // === LOCAL REGISTRATION ===
                console.log('📝 Attempting local registration...');
                const result = await auth.register(email, password);
                
                if (result.success) {
                    console.log('✅ Registration successful:', result.user.email);
                    // Show success message
                    showSuccess('Account created! Logging you in...');
                    
                    // Auto-login after registration
                    setTimeout(async () => {
                        const loginResult = await auth.login(email, password, rememberMe);
                        if (loginResult.success) {
                            window.location.href = 'pages/dashboard.html';
                        }
                    }, 1000);
                } else {
                    showError(emailInput, result.message);
                }
                
                /* ==========================================
                   FIREBASE REGISTRATION - COMMENTED OUT
                   ==========================================
                await createUserWithEmailAndPassword(auth, email, password);
                console.log('Registration successful');
                alert('Account created successfully! Redirecting to dashboard...');
                window.location.href = 'dashboard.html';
                ========================================== */
            }
        } catch (error) {
            console.error('Auth error:', error);
            showError(emailInput, 'An unexpected error occurred. Please try again.');
            
            /* ==========================================
               FIREBASE ERROR HANDLING - COMMENTED OUT
               ==========================================
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
            
            showError(emailInput, errorMessage);
            ========================================== */
        } finally {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });

    // === Add success message function ===
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-msg';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            text-align: center;
            margin-top: 16px;
            font-weight: 500;
        `;
        authForm.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 3000);
    }

    /* ==========================================
       SOCIAL AUTHENTICATION - COMMENTED OUT (Firebase required)
       ==========================================
    // --- Social Authentication ---
    if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
            try {
                const provider = new GoogleAuthProvider();
                googleBtn.disabled = true;
                googleBtn.textContent = 'Connecting...';
                
                const result = await signInWithPopup(auth, provider);
                console.log('Google sign-in successful:', result.user.email);
                window.location.href = 'dashboard.html';
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
                
                showError(emailInput, errorMessage);
                googleBtn.disabled = false;
                googleBtn.textContent = 'Continue with Google';
            }
        });
    }

    if (githubBtn) {
        githubBtn.addEventListener('click', async () => {
            try {
                const provider = new GithubAuthProvider();
                githubBtn.disabled = true;
                githubBtn.textContent = 'Connecting...';
                
                const result = await signInWithPopup(auth, provider);
                console.log('GitHub sign-in successful:', result.user.email);
                window.location.href = 'dashboard.html';
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
                
                showError(emailInput, errorMessage);
                githubBtn.disabled = false;
                githubBtn.textContent = 'Continue with GitHub';
            }
        });
    }
    ========================================== */

    // Disable social auth buttons (Firebase not configured)
    if (googleBtn) {
        googleBtn.disabled = true;
        googleBtn.textContent = 'Google Sign-in (Coming Soon)';
        googleBtn.style.opacity = '0.5';
    }
    
    if (githubBtn) {
        githubBtn.disabled = true;
        githubBtn.textContent = 'GitHub Sign-in (Coming Soon)';
        githubBtn.style.opacity = '0.5';
    }

    // === Guest Login - LOCAL VERSION ===
    if (guestBtn) {
        guestBtn.addEventListener('click', () => {
            if (confirm('Continue as guest? Some features may be limited.')) {
                console.log('🎭 Guest login initiated...');
                const result = auth.loginAsGuest();
                
                if (result.success) {
                    console.log('✅ Guest login successful');
                    showSuccess('Welcome, Guest! Redirecting...');
                    setTimeout(() => {
                        window.location.href = 'pages/dashboard.html';
                    }, 500);
                } else {
                    showError(emailInput, 'Guest login failed. Please try again.');
                }
            }
        });
    }

    /* ==========================================
       OLD GUEST LOGIN - COMMENTED OUT
       ==========================================
    if (guestBtn) {
        guestBtn.addEventListener('click', () => {
            if (confirm('Continue as guest? Some features may be limited.')) {
                localStorage.setItem('isGuest', 'true');
                localStorage.setItem('guestSession', Date.now().toString());
                localStorage.setItem('guestName', 'Guest User');
                
                console.log('Guest login successful');
                window.location.href = 'dashboard.html';
            }
        });
    }
    ========================================== */

    /* ==========================================
       FORGOT PASSWORD - COMMENTED OUT (Firebase required)
       ==========================================
    // --- Forgot Password ---
    if (forgotPasswordAction) {
        forgotPasswordAction.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (!email) {
                showError(emailInput, 'Please enter your email address first.');
                return;
            }
            
            if (!validateEmail(email)) {
                showError(emailInput, 'Please enter a valid email address.');
                return;
            }

            try {
                forgotPasswordAction.textContent = 'Sending...';
                forgotPasswordAction.disabled = true;
                
                await sendPasswordResetEmail(auth, email);
                
                alert(`Password reset email sent to ${email}. Please check your inbox.`);
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
                
                showError(emailInput, errorMessage);
            } finally {
                forgotPasswordAction.textContent = 'Forgot Password?';
                forgotPasswordAction.disabled = false;
            }
        });
    }
    ========================================== */

    // Forgot password - Local version (demo only)
    if (forgotPasswordAction) {
        forgotPasswordAction.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Password reset is not available in local mode.\n\nFor demo purposes:\n- Create a new account\n- Or use existing credentials\n\nNote: All data is stored locally in your browser.');
        });
    }
}

/* ==========================================
   DEMO LOGIN SETUP - COMMENTED OUT
   ==========================================
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
                if (confirm('Use demo account? Email: demo@example.com, Password: demo123')) {
                    // Simulate successful login without Firebase authentication
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', 'demo@example.com');
                    localStorage.setItem('userId', 'demo_' + Date.now());
                    localStorage.setItem('userName', 'Demo User');

                    console.log('Demo login successful');
                    alert('Demo login successful! Redirecting...');

                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                }
            });
            
            authForm.parentNode.insertBefore(demoBtn, authForm.nextSibling);
        }
    }

    // Only enable demo in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setupDemoLogin();
    }
});
========================================== */
