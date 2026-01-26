/**
 * Settings Page JavaScript
 * Handles user preferences, form validation, and data persistence
 */

class SettingsManager {
    constructor() {
        this.settings = this.loadSettings();
        this.init();
    }

    init() {
        this.setupToggleSwitches();
        this.loadUserData();
        this.bindEvents();
        this.applySettings();
    }

    // Load settings from localStorage
    loadSettings() {
        const defaultSettings = {
            darkMode: true,
            autoTheme: false,
            dailyReminders: true,
            achievementNotifications: true,
            weeklyReport: false,
            displayName: '',
            email: '',
            bio: ''
        };

        const saved = localStorage.getItem('userSettings');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    }

    // Save settings to localStorage
    saveSettingsToStorage() {
        localStorage.setItem('userSettings', JSON.stringify(this.settings));
    }

    // Setup toggle switches
    setupToggleSwitches() {
        const toggles = document.querySelectorAll('.toggle-switch');
        
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                this.updateSetting(toggle.id);
            });
        });
    }

    // Load user data into form fields
    loadUserData() {
        const auth = window.AuthService;
        if (auth && auth.isAuthenticated()) {
            const user = auth.getCurrentUser();
            if (user) {
                document.getElementById('displayName').value = user.name || '';
                document.getElementById('email').value = user.email || '';
            }
        }

        // Load saved settings
        document.getElementById('displayName').value = this.settings.displayName;
        document.getElementById('email').value = this.settings.email;
        document.getElementById('bio').value = this.settings.bio;
    }

    // Apply settings to UI
    applySettings() {
        // Apply toggle states
        this.setToggleState('darkModeToggle', this.settings.darkMode);
        this.setToggleState('autoThemeToggle', this.settings.autoTheme);
        this.setToggleState('dailyReminders', this.settings.dailyReminders);
        this.setToggleState('achievementNotifications', this.settings.achievementNotifications);
        this.setToggleState('weeklyReport', this.settings.weeklyReport);
    }

    // Set toggle switch state
    setToggleState(toggleId, isActive) {
        const toggle = document.getElementById(toggleId);
        if (toggle) {
            if (isActive) {
                toggle.classList.add('active');
            } else {
                toggle.classList.remove('active');
            }
        }
    }

    // Update setting based on toggle
    updateSetting(toggleId) {
        const toggle = document.getElementById(toggleId);
        const isActive = toggle.classList.contains('active');

        switch (toggleId) {
            case 'darkModeToggle':
                this.settings.darkMode = isActive;
                this.applyTheme();
                break;
            case 'autoThemeToggle':
                this.settings.autoTheme = isActive;
                if (isActive) {
                    this.detectSystemTheme();
                }
                break;
            case 'dailyReminders':
                this.settings.dailyReminders = isActive;
                break;
            case 'achievementNotifications':
                this.settings.achievementNotifications = isActive;
                break;
            case 'weeklyReport':
                this.settings.weeklyReport = isActive;
                break;
        }
    }

    // Apply theme changes
    applyTheme() {
        const theme = this.settings.darkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Detect system theme preference
    detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.settings.darkMode = true;
        } else {
            this.settings.darkMode = false;
        }
        this.setToggleState('darkModeToggle', this.settings.darkMode);
        this.applyTheme();
    }

    // Bind form events
    bindEvents() {
        // Form inputs
        document.getElementById('displayName').addEventListener('input', (e) => {
            this.settings.displayName = e.target.value;
        });

        document.getElementById('email').addEventListener('input', (e) => {
            this.settings.email = e.target.value;
        });

        document.getElementById('bio').addEventListener('input', (e) => {
            this.settings.bio = e.target.value;
        });

        // Import file
        document.getElementById('importFile').addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });

        // System theme detection
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (this.settings.autoTheme) {
                    this.settings.darkMode = e.matches;
                    this.setToggleState('darkModeToggle', this.settings.darkMode);
                    this.applyTheme();
                }
            });
        }
    }

    // Validate form data
    validateForm() {
        const email = document.getElementById('email').value;
        const displayName = document.getElementById('displayName').value;

        if (email && !this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return false;
        }

        if (displayName.length > 50) {
            this.showNotification('Display name must be less than 50 characters', 'error');
            return false;
        }

        return true;
    }

    // Email validation
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Save all settings
    saveSettings() {
        if (!this.validateForm()) return;

        this.saveSettingsToStorage();
        
        // Update AuthService user data if available
        const auth = window.AuthService;
        if (auth && auth.isAuthenticated()) {
            const currentUser = auth.getCurrentUser();
            if (currentUser) {
                currentUser.name = this.settings.displayName;
                currentUser.email = this.settings.email;
                sessionStorage.setItem('current_user', JSON.stringify(currentUser));
            }
        }

        this.showNotification('Settings saved successfully!', 'success');
    }

    // Reset settings to default
    resetSettings() {
        if (confirm('Are you sure you want to reset all settings to default?')) {
            localStorage.removeItem('userSettings');
            this.settings = this.loadSettings();
            this.applySettings();
            this.loadUserData();
            this.showNotification('Settings reset to default', 'info');
        }
    }

    // Export progress data
    exportData() {
        const progressData = {
            settings: this.settings,
            progressTracker: JSON.parse(localStorage.getItem('progressData') || '{}'),
            completedDays: JSON.parse(localStorage.getItem('completedDays') || '[]'),
            userStats: {
                exportDate: new Date().toISOString(),
                version: '1.0'
            }
        };

        const dataStr = JSON.stringify(progressData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `100days-progress-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        this.showNotification('Progress data exported successfully!', 'success');
    }

    // Import progress data
    importData(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.settings) {
                    this.settings = { ...this.settings, ...data.settings };
                    this.saveSettingsToStorage();
                    this.applySettings();
                    this.loadUserData();
                }

                if (data.progressTracker) {
                    localStorage.setItem('progressData', JSON.stringify(data.progressTracker));
                }

                if (data.completedDays) {
                    localStorage.setItem('completedDays', JSON.stringify(data.completedDays));
                }

                this.showNotification('Progress data imported successfully!', 'success');
                
            } catch (error) {
                this.showNotification('Invalid file format. Please select a valid backup file.', 'error');
            }
        };
        
        reader.readAsText(file);
    }

    // Reset all progress
    resetProgress() {
        const confirmText = 'Are you sure you want to reset ALL progress? This action cannot be undone.\n\nType "RESET" to confirm:';
        const userInput = prompt(confirmText);
        
        if (userInput === 'RESET') {
            // Clear all progress data
            localStorage.removeItem('progressData');
            localStorage.removeItem('completedDays');
            localStorage.removeItem('userStats');
            
            this.showNotification('All progress has been reset', 'info');
            
            // Reload page after delay
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification show ${type}`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Global functions for HTML onclick events
function saveSettings() {
    window.settingsManager.saveSettings();
}

function resetSettings() {
    window.settingsManager.resetSettings();
}

function exportData() {
    window.settingsManager.exportData();
}

function resetProgress() {
    window.settingsManager.resetProgress();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.settingsManager = new SettingsManager();
});