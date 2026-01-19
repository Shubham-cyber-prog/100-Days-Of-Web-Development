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

document.addEventListener('DOMContentLoaded', () => {
    console.log('Auth script loaded');
    
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

    // --- Check if user is already logged in ---
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('User already logged in:', user.email);
            // Redirect to dashboard if already logged in
            window.location.href = 'dashboard.html';
        }
    });

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
                // Login
                await signInWithEmailAndPassword(auth, email, password);
                console.log('Login successful');
                window.location.href = 'dashboard.html';
            } else {
                // Register
                await createUserWithEmailAndPassword(auth, email, password);
                console.log('Registration successful');
                // Show success message and auto login
                alert('Account created successfully! Redirecting to dashboard...');
                window.location.href = 'dashboard.html';
            }
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
            
            showError(emailInput, errorMessage);
        } finally {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });

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

    // --- Guest Login (Without Firebase Auth) ---
    if (guestBtn) {
        guestBtn.addEventListener('click', () => {
            if (confirm('Continue as guest? Some features may be limited.')) {
                // Store guest session in localStorage
                localStorage.setItem('isGuest', 'true');
                localStorage.setItem('guestSession', Date.now().toString());
                localStorage.setItem('guestName', 'Guest User');
                
                console.log('Guest login successful');
                window.location.href = 'dashboard.html';
            }
        });
    }

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
});
