// Authentication Logic

function setupAuthForms() {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }
}

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('loginError');

    if (!email || !password) {
        showError(errorDiv, 'Please fill all fields');
        return;
    }

    if (!email.includes('@')) {
        showError(errorDiv, 'Please enter a valid email');
        return;
    }

    // Mock authentication
    const user = {
        name: email.split('@')[0],
        email: email,
        loginTime: new Date().toLocaleString()
    };

    localStorage.setItem('user', JSON.stringify(user));

    showSuccess('Login successful! Redirecting...');
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

function handleSignup(e) {
    e.preventDefault();

    const name = document.getElementById('fullName')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value.trim();
    const confirmPassword = document.getElementById('confirmPassword')?.value.trim();
    const errorDiv = document.getElementById('signupError');

    if (!name || !email || !password || !confirmPassword) {
        showError(errorDiv, 'Please fill all fields');
        return;
    }

    if (!email.includes('@')) {
        showError(errorDiv, 'Please enter a valid email');
        return;
    }

    if (password !== confirmPassword) {
        showError(errorDiv, 'Passwords do not match');
        return;
    }

    if (password.length < 6) {
        showError(errorDiv, 'Password must be at least 6 characters');
        return;
    }

    const user = {
        name: name,
        email: email,
        signupTime: new Date().toLocaleString()
    };

    localStorage.setItem('user', JSON.stringify(user));

    showSuccess('Account created! Redirecting to dashboard...');
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

function handleContact(e) {
    e.preventDefault();

    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const errorDiv = document.getElementById('contactError');

    if (!name || !email || !subject || !message) {
        showError(errorDiv, 'Please fill all fields');
        return;
    }

    if (!email.includes('@')) {
        showError(errorDiv, 'Please enter a valid email');
        return;
    }

    // Mock submission
    const contactData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: new Date().toLocaleString()
    };

    let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push(contactData);
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // Reset form and show success
    document.getElementById('contactForm').reset();

    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success';
    successDiv.innerHTML = `<strong>Success!</strong> Your message has been sent. We'll get back to you soon!`;

    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.insertBefore(successDiv, formContainer.firstChild);

        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}

function showError(element, message) {
    if (element) {
        element.innerHTML = message;
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

function showSuccess(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.innerHTML = message;
    document.body.insertBefore(alert, document.body.firstChild);
}

document.addEventListener('DOMContentLoaded', setupAuthForms);
