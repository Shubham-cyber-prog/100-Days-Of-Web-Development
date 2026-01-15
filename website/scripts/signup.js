/**
 * Signup Form Validation & Authentication
 * Handles user registration with comprehensive validation and security
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== DOM Elements ====================
    const signupForm = document.getElementById('signupForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitBtn = document.getElementById('submitBtn');
    const loginLink = document.getElementById('loginLink');

    // Error & Success Messages
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmError');
    const successMessage = document.getElementById('successMessage');

    // Success Indicators
    const usernameSuccess = document.getElementById('usernameSuccess');
    const emailSuccess = document.getElementById('emailSuccess');
    const confirmSuccess = document.getElementById('confirmSuccess');

    // Password Strength Indicators
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    // Social Auth Buttons
    const googleSignupBtn = document.getElementById('googleSignup');
    const githubSignupBtn = document.getElementById('githubSignup');

    // ==================== Local Storage Setup ====================
    // Initialize registered users database (in production, this would be a backend API)
    const initializeUserDatabase = () => {
        if (!localStorage.getItem('registeredUsers')) {
            localStorage.setItem('registeredUsers', JSON.stringify([]));
        }
    };

    initializeUserDatabase();

    // ==================== Validation Functions ====================

    /**
     * Validate email format
     */
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    /**
     * Check if email already exists
     */
    const emailExists = (email) => {
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        return users.some(user => user.email.toLowerCase() === email.toLowerCase());
    };

    /**
     * Validate username format and availability
     */
    const isValidUsername = (username) => {
        // Username should be 3-20 characters, alphanumeric with underscores
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        return usernameRegex.test(username);
    };

    /**
     * Check if username already exists
     */
    const usernameExists = (username) => {
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        return users.some(user => user.username.toLowerCase() === username.toLowerCase());
    };

    /**
     * Validate password strength
     * Requirements:
     * - At least 8 characters
     * - At least one uppercase letter
     * - At least one lowercase letter
     * - At least one number
     * - At least one special character
     */
    const validatePasswordStrength = (password) => {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        };

        return requirements;
    };

    /**
     * Calculate password strength level
     */
    const getPasswordStrength = (password) => {
        const requirements = validatePasswordStrength(password);
        const metRequirements = Object.values(requirements).filter(Boolean).length;

        if (metRequirements === 0) return { level: 'none', percentage: 0 };
        if (metRequirements <= 2) return { level: 'weak', percentage: 25 };
        if (metRequirements === 3) return { level: 'fair', percentage: 50 };
        if (metRequirements === 4) return { level: 'good', percentage: 75 };
        return { level: 'strong', percentage: 100 };
    };

    /**
     * Update password strength indicator
     */
    const updatePasswordStrength = () => {
        const password = passwordInput.value;
        const strength = getPasswordStrength(password);
        const requirements = validatePasswordStrength(password);

        // Update strength bar
        strengthBar.style.width = strength.percentage + '%';
        strengthBar.className = `password-strength-bar ${strength.level}`;
        strengthBar.style.backgroundColor = getStrengthColor(strength.level);

        // Update strength text
        if (password.length === 0) {
            strengthText.textContent = '';
            strengthText.className = 'password-strength-text';
        } else {
            strengthText.textContent = `Strength: ${strength.level.charAt(0).toUpperCase() + strength.level.slice(1)}`;
            strengthText.className = `password-strength-text ${strength.level}`;
        }

        // Update password requirements
        updatePasswordRequirements(requirements);
    };

    /**
     * Get color for password strength level
     */
    const getStrengthColor = (level) => {
        const colors = {
            weak: '#ef4444',
            fair: '#f59e0b',
            good: '#3b82f6',
            strong: '#10b981'
        };
        return colors[level] || 'transparent';
    };

    /**
     * Update password requirement indicators
     */
    const updatePasswordRequirements = (requirements) => {
        const reqElements = {
            'length': document.getElementById('req-length'),
            'uppercase': document.getElementById('req-uppercase'),
            'lowercase': document.getElementById('req-lowercase'),
            'number': document.getElementById('req-number'),
            'special': document.getElementById('req-special')
        };

        for (let [key, element] of Object.entries(reqElements)) {
            const isMet = requirements[key];
            if (isMet) {
                element.classList.add('met');
                element.querySelector('.requirement-icon').textContent = '✓';
            } else {
                element.classList.remove('met');
                element.querySelector('.requirement-icon').textContent = '○';
            }
        }
    };

    /**
     * Show error message
     */
    const showError = (input, errorElement, message) => {
        input.classList.add('error');
        input.classList.remove('success');
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
     * Show success state
     */
    const showSuccess = (input, successElement) => {
        input.classList.remove('error');
        input.classList.add('success');
        if (successElement) {
            successElement.classList.add('show');
        }
    };

    /**
     * Clear error state
     */
    const clearError = (input, errorElement, successElement) => {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        if (successElement) {
            successElement.classList.remove('show');
        }
    };

    // ==================== Real-time Validation ====================

    /**
     * Username validation on blur
     */
    usernameInput.addEventListener('blur', () => {
        const username = usernameInput.value.trim();

        if (!username) {
            clearError(usernameInput, usernameError, usernameSuccess);
            return;
        }

        if (!isValidUsername(username)) {
            showError(usernameInput, usernameError, 'Username must be 3-20 characters (letters, numbers, underscores only)');
        } else if (usernameExists(username)) {
            showError(usernameInput, usernameError, 'Username already taken');
        } else {
            showSuccess(usernameInput, usernameSuccess);
        }
    });

    /**
     * Email validation on blur
     */
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();

        if (!email) {
            clearError(emailInput, emailError, emailSuccess);
            return;
        }

        if (!validateEmail(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
        } else if (emailExists(email)) {
            showError(emailInput, emailError, 'This email is already registered');
        } else {
            showSuccess(emailInput, emailSuccess);
        }
    });

    /**
     * Password validation on input
     */
    passwordInput.addEventListener('input', () => {
        updatePasswordStrength();
        clearError(passwordInput, passwordError);

        // Check match with confirm password
        if (confirmPasswordInput.value) {
            validatePasswordMatch();
        }
    });

    /**
     * Confirm password validation
     */
    confirmPasswordInput.addEventListener('input', () => {
        clearError(confirmPasswordInput, confirmError);
        validatePasswordMatch();
    });

    /**
     * Validate password match
     */
    const validatePasswordMatch = () => {
        if (!passwordInput.value || !confirmPasswordInput.value) {
            return;
        }

        if (passwordInput.value === confirmPasswordInput.value) {
            showSuccess(confirmPasswordInput, confirmSuccess);
        } else {
            showError(confirmPasswordInput, confirmError, 'Passwords do not match');
        }
    };

    // ==================== Form Submission ====================

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear all previous errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.classList.remove('show');
            el.textContent = '';
        });
        document.querySelectorAll('.form-input').forEach(input => {
            input.classList.remove('error');
        });

        // Get form values
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        let isValid = true;

        // ==================== Validation ====================

        // Validate username
        if (!username) {
            showError(usernameInput, usernameError, 'Username is required');
            isValid = false;
        } else if (!isValidUsername(username)) {
            showError(usernameInput, usernameError, 'Username must be 3-20 characters (letters, numbers, underscores only)');
            isValid = false;
        } else if (usernameExists(username)) {
            showError(usernameInput, usernameError, 'Username already taken');
            isValid = false;
        }

        // Validate email
        if (!email) {
            showError(emailInput, emailError, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        } else if (emailExists(email)) {
            showError(emailInput, emailError, 'This email is already registered');
            isValid = false;
        }

        // Validate password
        if (!password) {
            showError(passwordInput, passwordError, 'Password is required');
            isValid = false;
        } else {
            const requirements = validatePasswordStrength(password);
            if (!requirements.length) {
                showError(passwordInput, passwordError, 'Password must be at least 8 characters');
                isValid = false;
            } else if (!requirements.uppercase) {
                showError(passwordInput, passwordError, 'Password must contain at least one uppercase letter');
                isValid = false;
            } else if (!requirements.lowercase) {
                showError(passwordInput, passwordError, 'Password must contain at least one lowercase letter');
                isValid = false;
            } else if (!requirements.number) {
                showError(passwordInput, passwordError, 'Password must contain at least one number');
                isValid = false;
            } else if (!requirements.special) {
                showError(passwordInput, passwordError, 'Password must contain at least one special character (!@#$%^&*)');
                isValid = false;
            }
        }

        // Validate confirm password
        if (!confirmPassword) {
            showError(confirmPasswordInput, confirmError, 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError(confirmPasswordInput, confirmError, 'Passwords do not match');
            isValid = false;
        }

        // ==================== Submit ====================

        if (isValid) {
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Creating Account...';

            // Simulate API call
            setTimeout(() => {
                try {
                    // Register user
                    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                    const newUser = {
                        id: Date.now(),
                        username: username,
                        email: email,
                        password: btoa(password), // Simple base64 encoding (NOT for production!)
                        createdAt: new Date().toISOString()
                    };

                    users.push(newUser);
                    localStorage.setItem('registeredUsers', JSON.stringify(users));

                    // Show success message
                    successMessage.classList.add('show');

                    // Redirect to login after 2 seconds
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);

                } catch (error) {
                    console.error('Error during signup:', error);
                    showError(signupForm, passwordError, 'An error occurred. Please try again.');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            }, 1500);
        }
    });

    // ==================== Social Auth ====================

    googleSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleSocialSignup('Google', googleSignupBtn);
    });

    githubSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleSocialSignup('GitHub', githubSignupBtn);
    });

    const handleSocialSignup = (provider, btn) => {
        const originalText = btn.textContent;
        btn.textContent = 'Connecting...';
        btn.classList.add('loading');
        btn.disabled = true;

        // Simulate social authentication
        setTimeout(() => {
            try {
                // Create social user
                const socialEmail = `${provider.toLowerCase()}_user_${Date.now()}@${provider.toLowerCase()}.com`;
                const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

                const newUser = {
                    id: Date.now(),
                    username: `${provider}_user_${Date.now()}`,
                    email: socialEmail,
                    provider: provider,
                    createdAt: new Date().toISOString()
                };

                users.push(newUser);
                localStorage.setItem('registeredUsers', JSON.stringify(users));

                // Auto-login
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userEmail', socialEmail);

                // Redirect to dashboard
                window.location.href = 'dashboard.html';

            } catch (error) {
                console.error('Social signup error:', error);
                btn.textContent = originalText;
                btn.classList.remove('loading');
                btn.disabled = false;
            }
        }, 1500);
    };

    // ==================== Navigation ====================

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'login.html';
    });
});
