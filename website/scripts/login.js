/**
 * Login Form Validation & Authentication
 * Handles user authentication with consistent validation and security
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== DOM Elements ====================
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    const signupLink = document.getElementById('signupLink');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');

    // Error Messages
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Social Auth Buttons
    const googleLoginBtn = document.getElementById('googleLogin');
    const githubLoginBtn = document.getElementById('githubLogin');

    // ==================== Validation Functions ====================

    /**
     * Validate email format
     */
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    /**
     * Check if user exists in registered users
     */
    const userExists = (email) => {
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        return users.some(user => user.email.toLowerCase() === email.toLowerCase());
    };

    /**
     * Verify password for user
     */
    const verifyPassword = (email, password) => {
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (!user) return false;
        
        // Demo: Simple base64 comparison (NOT for production)
        return user.password === btoa(password);
    };

    // ==================== UI Functions ====================

    /**
     * Show error message
     */
    const showError = (input, errorElement, message) => {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        input.parentElement.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(0)' }
        ], { duration: 300 });
    };

    /**
     * Clear error state
     */
    const clearError = (input, errorElement) => {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    };

    /**
     * Reset all errors
     */
    const resetErrors = () => {
        document.querySelectorAll('.error-message').forEach(el => {
            el.classList.remove('show');
            el.textContent = '';
        });
        document.querySelectorAll('.form-input').forEach(input => {
            input.classList.remove('error');
        });
    };

    // ==================== Real-time Validation ====================

    /**
     * Email validation on blur
     */
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();

        if (!email) {
            clearError(emailInput, emailError);
            return;
        }

        if (!validateEmail(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address.');
        } else if (!userExists(email)) {
            showError(emailInput, emailError, 'This email is not registered. Please sign up first.');
        } else {
            clearError(emailInput, emailError);
        }
    });

    /**
     * Password validation on blur
     */
    passwordInput.addEventListener('blur', () => {
        const password = passwordInput.value;

        if (!password) {
            clearError(passwordInput, passwordError);
            return;
        }

        if (password.length < 6) {
            showError(passwordInput, passwordError, 'Password must be at least 6 characters.');
        } else {
            clearError(passwordInput, passwordError);
        }
    });

    // ==================== Form Submission ====================

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear all previous errors
        resetErrors();

        // Get form values
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        let isValid = true;

        // ==================== Validation ====================

        // Validate email
        if (!email) {
            showError(emailInput, emailError, 'Email is required.');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address.');
            isValid = false;
        } else if (!userExists(email)) {
            showError(emailInput, emailError, 'This email is not registered. Please sign up first.');
            isValid = false;
        }

        // Validate password
        if (!password) {
            showError(passwordInput, passwordError, 'Password is required.');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, passwordError, 'Password must be at least 6 characters.');
            isValid = false;
        }

        // ==================== Authentication ====================

        if (isValid) {
            // Verify password
            if (!verifyPassword(email, password)) {
                showError(passwordInput, passwordError, 'Incorrect password. Please try again.');
                return;
            }

            // Show loading state
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Authenticating...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                try {
                    // Set authentication
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('userEmail', email);

                    // Get user data for profile if needed
                    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
                    if (user) {
                        localStorage.setItem('userId', user.id);
                        localStorage.setItem('userName', user.username);
                    }

                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';

                } catch (error) {
                    console.error('Login error:', error);
                    showError(emailInput, emailError, 'An error occurred. Please try again.');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            }, 1500);
        }
    });

    // ==================== Social Auth ====================

    googleLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleSocialLogin('Google', googleLoginBtn);
    });

    githubLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleSocialLogin('GitHub', githubLoginBtn);
    });

    const handleSocialLogin = (provider, btn) => {
        const originalText = btn.textContent;
        btn.textContent = 'Connecting...';
        btn.classList.add('loading');
        btn.disabled = true;

        // Simulate social authentication
        setTimeout(() => {
            try {
                // Auto-login with social provider
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userEmail', `${provider.toLowerCase()}_user@${provider.toLowerCase()}.com`);

                // Redirect to dashboard
                window.location.href = 'dashboard.html';

            } catch (error) {
                console.error('Social login error:', error);
                btn.textContent = originalText;
                btn.classList.remove('loading');
                btn.disabled = false;
            }
        }, 1500);
    };

    // ==================== Navigation ====================

    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'signup.html';
    });

    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Password reset functionality coming soon!');
    });
});
