
class UI {
    constructor() {
        this.darkMode = false;
        this.mobileMenuOpen = false;
        this.init();
    }

    init() {
        this.updateDarkModeUI();
        this.loadDarkMode();
        this.bindEvents();
        this.initMobileMenu();
        this.initModals();
        this.initProfileSettings();
        this.initSecuritySettings();
        this.updateUI();
    }

    updateDarkModeUI() {
    const modeText = this.darkMode ? 'Light Mode' : 'Dark Mode';
    const iconClass = this.darkMode ? 'fas fa-sun' : 'fas fa-moon';

    
    document.querySelectorAll('.dark-toggle-icon').forEach(icon => {
        icon.className = iconClass + ' dark-toggle-icon';
    });

    
    document.querySelectorAll('.dark-mode-text').forEach(text => {
        text.textContent = modeText;
    });
}


    loadDarkMode() {
        const savedMode = localStorage.getItem('darkMode');
        this.darkMode = savedMode === 'true';
        
        if (this.darkMode) {
            document.body.classList.add('dark-mode');
        }
    }

    bindEvents() {

        const profile = document.getElementById('user-profile');

        profile?.addEventListener('click', (e) => {
            e.stopPropagation();
            profile.classList.add('open');
        });

        document.addEventListener('click', () => {
            profile?.classList.remove('open');
        });

        document.getElementById('edit-profile-btn')?.addEventListener('click', () => {
            document.getElementById('profile-view').style.display = 'none';
            document.getElementById('profile-form').style.display = 'block';
        });

        document.getElementById('cancel-profile-edit')?.addEventListener('click', () => {
            document.getElementById('profile-form').style.display = 'none';
            document.getElementById('profile-view').style.display = 'block';
        });


        document.getElementById('desktop-dark-mode-toggle')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleDarkMode();
        });

        
        document.getElementById('dark-mode-toggle')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleDarkMode();
        });

        document.getElementById('mobile-dark-mode-toggle')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleDarkMode();
            this.closeMobileMenu();
        });

        
        document.getElementById('profile-settings-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeProfileDropdown();
            this.showProfileModal();
        });

        document.getElementById('mobile-profile-settings')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeProfileDropdown();
            this.showProfileModal();
            this.closeMobileMenu();
        });

       
        document.getElementById('security-settings-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSecurityModal();
        });

        document.getElementById('mobile-security-settings')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSecurityModal();
            this.closeMobileMenu();
        });

        
        const newPasswordInput = document.getElementById('new-password');
        if (newPasswordInput) {
            newPasswordInput.addEventListener('input', this.updateSecurityPasswordStrength.bind(this));
        }

       
        document.getElementById('cancel-profile')?.addEventListener('click', () => {
            this.closeProfileModal();
        });

        document.getElementById('cancel-security')?.addEventListener('click', () => {
            this.closeSecurityModal();
        });

        
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    initMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const closeBtn = document.getElementById('close-mobile-menu');
        const overlay = document.getElementById('mobile-menu-overlay');
        const mobileMenu = document.getElementById('mobile-menu');

        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                this.openMobileMenu();
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        if (overlay) {
            overlay.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

       
        document.querySelectorAll('.mobile-nav-link[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('#')) {
                    const sectionId = link.getAttribute('href').substring(1);
                    if (window.Dashboard) {
                        window.Dashboard.switchSection(sectionId);
                    }
                    this.closeMobileMenu();
                    
                    
                    this.updateMobileNavActiveState(sectionId);
                }
            });
        });

        
        document.getElementById('mobile-logout-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.Auth) {
                window.Auth.logout();
            }
            this.closeMobileMenu();
        });
    }

    initModals() {
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
                this.closeMobileMenu();
            }
        });

       
        document.getElementById('profile-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProfileSettings();
        });

    
        document.getElementById('security-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSecuritySettings();
        });
    }

    initProfileSettings() {
        
        this.loadProfileData();
    }

    initSecuritySettings() {
        
        this.loadSecurityPreferences();
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        
        document.body.classList.toggle('dark-mode', this.darkMode);
        localStorage.setItem('darkMode', this.darkMode);

        this.updateDarkModeUI();

        this.showToast(
            `${this.darkMode ? 'Dark' : 'Light'} mode activated`, 'success');
    }

    openMobileMenu() {
        document.getElementById('mobile-menu').classList.add('active');
        document.getElementById('mobile-menu-overlay').style.display = 'block';
        document.body.style.overflow = 'hidden';
        this.mobileMenuOpen = true;
    }

    closeMobileMenu() {
        document.getElementById('mobile-menu').classList.remove('active');
        document.getElementById('mobile-menu-overlay').style.display = 'none';
        document.body.style.overflow = '';
        this.mobileMenuOpen = false;
    }

    updateMobileNavActiveState(sectionId) {
       
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });

       
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    closeProfileDropdown() {
        const profile = document.getElementById('user-profile');
        profile?.classList.remove('open');
    }

    showProfileModal() {
        this.closeAllModals();
        
        const view = document.getElementById('profile-view');
        const form = document.getElementById('profile-form');

        view.style.display = 'block';
        form.style.display = 'none';

        this.populateProfileView();
        this.populateProfileForm();

        document.getElementById('profile-modal').classList.add('active');
    }

    closeProfileModal() {
        document.getElementById('profile-modal').classList.remove('active');
    }

    showSecurityModal() {
        this.closeAllModals();
        document.getElementById('security-modal').classList.add('active');
    }

    closeSecurityModal() {
        document.getElementById('security-modal').classList.remove('active');
        document.getElementById('security-form').reset();
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });

        this.closeProfileDropdown();
    }

    loadProfileData() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const profileData = JSON.parse(localStorage.getItem(`profile_${currentUser.username}`) || '{}');
        
        
        this.profileData = profileData;
    }

    loadSecurityPreferences() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const securityPrefs = JSON.parse(localStorage.getItem(`security_${currentUser.username}`) || '{}');
        
        this.securityPreferences = securityPrefs;
    }

    populateProfileView() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const profileData =
        JSON.parse(localStorage.getItem(`profile_${currentUser.username}`)) || {};

    document.getElementById('pv-name').textContent =
        currentUser.fullName || '—';

    document.getElementById('pv-email').textContent =
        profileData.email || '—';

    document.getElementById('pv-phone').textContent =
        profileData.phone || '—';

    document.getElementById('pv-address').textContent =
        profileData.address || '—';
}


    populateProfileForm() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const profileData = JSON.parse(localStorage.getItem(`profile_${currentUser.username}`) || '{}');
        
        document.getElementById('profile-name').value = currentUser.fullName || '';
        document.getElementById('profile-email').value = profileData.email || '';
        document.getElementById('profile-phone').value = profileData.phone || '';
        document.getElementById('profile-address').value = profileData.address || '';
        document.getElementById('profile-city').value = profileData.city || '';
        document.getElementById('profile-zip').value = profileData.zip || '';
    }

    saveProfileSettings() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        const profileData = {
            email: document.getElementById('profile-email').value,
            phone: document.getElementById('profile-phone').value,
            address: document.getElementById('profile-address').value,
            city: document.getElementById('profile-city').value,
            zip: document.getElementById('profile-zip').value,
            updatedAt: new Date().toISOString()
        };

        
        const newName = document.getElementById('profile-name').value;
        if (newName && newName !== currentUser.fullName) {
            currentUser.fullName = newName;
            
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
     
            const users = JSON.parse(localStorage.getItem('users') || '{}');
            if (users[currentUser.username]) {
                users[currentUser.username].fullName = newName;
                localStorage.setItem('users', JSON.stringify(users));
            }
            
            
            if (window.Auth) {
                window.Auth.updateUserInfo();
            }
        }

        
        localStorage.setItem(`profile_${currentUser.username}`, JSON.stringify(profileData));
        
        this.closeProfileModal();
        this.showToast('Profile updated successfully', 'success');

        document.getElementById('profile-form').style.display = 'none';
        document.getElementById('profile-view').style.display = 'block';
        this.populateProfileView();
    }

    saveSecuritySettings() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const twoFactorEnabled = document.getElementById('two-factor').checked;
        
        
        if (!users[currentUser.username] || users[currentUser.username].password !== currentPassword) {
            this.showToast('Current password is incorrect', 'error');
            return;
        }
        
        
        if (newPassword.length < 6) {
            this.showToast('New password must be at least 6 characters long', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            this.showToast('New passwords do not match', 'error');
            return;
        }
        
        
        users[currentUser.username].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        
        
        const securityPrefs = {
            twoFactorEnabled: twoFactorEnabled,
            lastPasswordChange: new Date().toISOString()
        };
        
        localStorage.setItem(`security_${currentUser.username}`, JSON.stringify(securityPrefs));
        
        this.closeSecurityModal();
        this.showToast('Password updated successfully', 'success');
    }

    updateSecurityPasswordStrength() {
        const password = document.getElementById('new-password').value;
        const strengthBar = document.querySelector('#security-form .strength-bar');
        const strengthValue = document.getElementById('security-strength-value');

        let strength = 0;
        let color = '#ef4444'; 
        let text = 'Weak';

        if (password.length >= 6) strength += 25;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;

        if (strength >= 75) {
            color = '#10b981'; 
            text = 'Strong';
        } else if (strength >= 50) {
            color = '#f59e0b'; 
            text = 'Medium';
        }

        strengthBar.style.width = `${strength}%`;
        strengthBar.style.backgroundColor = color;
        strengthValue.textContent = text;
        strengthValue.style.color = color;
    }

    handleResize() {
        
        if (window.innerWidth > 768 && this.mobileMenuOpen) {
            this.closeMobileMenu();
        }
        
        
        this.updateUI();
    }

    updateUI() {
        const isMobile = window.innerWidth <= 768;
        
        
        if (isMobile) {
            
            document.querySelectorAll('.quick-action-btn span').forEach(span => {
                span.style.display = 'none';
            });
        } else {
            
            document.querySelectorAll('.quick-action-btn span').forEach(span => {
                span.style.display = 'inline';
            });
        }
    }

    showToast(message, type = 'info') {
        
        if (window.Auth && window.Auth.showToast) {
            window.Auth.showToast(message, type);
        } else {
           
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            `;

            container.appendChild(toast);

            
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => toast.remove(), 300);
            }, 5000);
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    window.UI = new UI();
});