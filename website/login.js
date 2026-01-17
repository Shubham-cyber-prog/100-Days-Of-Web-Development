import { auth } from './firebase-config.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signOut
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const authForm = document.getElementById('authForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const submitBtn = document.getElementById('submitBtn');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle'); // P tag
    const toggleAuthBtn = document.getElementById('toggleAuth'); // Button inside P
    const forgotPasswordAction = document.getElementById('forgotPasswordAction');

    // --- State ---
    let isLogin = true;

    // --- Toggle Logic ---
    if (toggleAuthBtn) {
        toggleAuthBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isLogin = !isLogin;
            updateUI();
        });
    }

    function updateUI() {
        // Animate Opacity for smooth transition
        const headerText = document.querySelector('.auth-header');
        headerText.style.opacity = '0';

        setTimeout(() => {
            if (isLogin) {
                authTitle.textContent = 'Welcome Back!';
                authSubtitle.innerHTML = `Don't have an account? <button id="toggleAuth" class="text-link-btn">Create a new account now</button>, it's FREE!`;
                confirmPasswordGroup.classList.add('collapsed');
                submitBtn.textContent = 'Login Now';
                confirmPasswordInput.removeAttribute('required');
                if (forgotPasswordAction) forgotPasswordAction.style.display = 'flex';
            } else {
                authTitle.textContent = 'Create Account';
                authSubtitle.innerHTML = `Already have an account? <button id="toggleAuth" class="text-link-btn">Log in instead</button>`;
                confirmPasswordGroup.classList.remove('collapsed');
                submitBtn.textContent = 'Join Now';
                confirmPasswordInput.setAttribute('required', 'true');
                if (forgotPasswordAction) forgotPasswordAction.style.display = 'none';
            }

            // Re-attach listener since we replaced innerHTML
            const newToggleBtn = document.getElementById('toggleAuth');
            newToggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                isLogin = !isLogin;
                updateUI();
            });

            headerText.style.transition = 'opacity 200ms ease';
            headerText.style.opacity = '1';

            // Clear errors
            resetFormState();
        }, 150);
    }

    function resetFormState() {
        // Reset inputs and error styles
        document.querySelectorAll('.form-input').forEach(input => {
            input.value = ''; // Optional: clear val on switch? Usually better UX to keep email/pass
            input.classList.remove('error');
        });
    }

    // --- Form Submission & Validation ---
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset errors
        resetErrors();

        // Validation
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        let isValid = true;

        if (!validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        if (password.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters.');
            isValid = false;
        }

        if (!isLogin && password !== confirmPassword) {
            showError(confirmPasswordInput, 'Passwords do not match.');
            isValid = false;
        }

        if (isValid) {
            // Loading State
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            try {
                if (isLogin) {
                    // Sign in
                    await signInWithEmailAndPassword(auth, email, password);
                } else {
                    // Sign up
                    await createUserWithEmailAndPassword(auth, email, password);
                }
                // Success - Firebase handles auth state, redirect will happen via auth state listener
                window.location.href = 'dashboard.html';
            } catch (error) {
                console.error('Authentication error:', error);
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
                        errorMessage = 'Password is too weak.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address.';
                        break;
                }
                showError(emailInput, errorMessage);
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        }
    });

    // --- Social Auth ---
    const socialBtns = document.querySelectorAll('.social-btn');
    const provider = new GoogleAuthProvider();

    socialBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            // Loading State
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Connecting...';
            btn.classList.add('loading');

            try {
                await signInWithPopup(auth, provider);
                // Success - redirect will happen via auth state listener
                window.location.href = 'dashboard.html';
            } catch (error) {
                console.error('Social auth error:', error);
                showError(emailInput, 'Failed to sign in with Google. Please try again.');
                btn.innerHTML = originalText;
                btn.classList.remove('loading');
            }
        });
    });

    // --- Password Reset ---
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
                await sendPasswordResetEmail(auth, email);
                alert('Password reset email sent! Check your inbox.');
            } catch (error) {
                console.error('Password reset error:', error);
                showError(emailInput, 'Failed to send password reset email. Please try again.');
            }
        });
    }


    // --- Helpers ---
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(inputElement, message) {
        inputElement.classList.add('error');
        // Ideally we'd append a message below, but for now we'll rely on the red border/browser feedback or just shake
        // Adding a sophisticated shake effect
        inputElement.parentElement.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(0)' }
        ], { duration: 300 });

        // Optional: Tooltip or toast could be added here
    }

    function resetErrors() {
        document.querySelectorAll('.form-input').forEach(input => input.classList.remove('error'));
    }
});
