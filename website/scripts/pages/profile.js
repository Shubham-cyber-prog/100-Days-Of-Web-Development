class ProfileManager {
    constructor() {
        this.userData = this.loadUserData();
        this.achievements = this.loadAchievements();
        this.activities = this.loadActivities();

        this.init();
    }

    async init() {
        this.renderProfile();
        this.renderAchievements();
        this.renderActivities();
        this.bindEvents();
        await this.updateStats();
        this.initMentorMode();
    }

    loadUserData() {
        const defaultData = {
            fullName: 'Web Developer',
            email: 'developer@example.com',
            title: 'Frontend Enthusiast',
            location: 'Global',
            bio: 'Passionate about creating amazing web experiences',
            joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            avatar: '../assets/images/pilot_avatar.png'
        };

        const saved = localStorage.getItem('profileData');
        return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    }

    loadAchievements() {
        return [
            {
                id: 1,
                title: 'First Steps',
                description: 'Complete your first project',
                icon: 'fas fa-baby',
                unlocked: true,
                unlockedDate: '2024-01-15'
            },
            {
                id: 2,
                title: 'Week Warrior',
                description: 'Code for 7 consecutive days',
                icon: 'fas fa-fire',
                unlocked: true,
                unlockedDate: '2024-01-22'
            },
            {
                id: 3,
                title: 'HTML Master',
                description: 'Complete 10 HTML projects',
                icon: 'fab fa-html5',
                unlocked: true,
                unlockedDate: '2024-02-01'
            },
            {
                id: 4,
                title: 'CSS Wizard',
                description: 'Master CSS animations',
                icon: 'fab fa-css3-alt',
                unlocked: false
            },
            {
                id: 5,
                title: 'JS Ninja',
                description: 'Build 5 JavaScript apps',
                icon: 'fab fa-js',
                unlocked: false
            },
            {
                id: 6,
                title: 'Century Club',
                description: 'Complete 100 days challenge',
                icon: 'fas fa-trophy',
                unlocked: false
            }
        ];
    }

    loadActivities() {
        return [
            {
                id: 1,
                title: 'Completed Day 15 Calculator',
                description: 'Built a mobile-optimized calculator with touch support',
                icon: 'fas fa-calculator',
                time: '2 hours ago',
                type: 'project'
            },
            {
                id: 2,
                title: 'Watched CSS Grid Tutorial',
                description: 'Learned advanced grid layout techniques',
                icon: 'fas fa-play',
                time: '5 hours ago',
                type: 'tutorial'
            },
            {
                id: 3,
                title: 'Earned HTML Master Badge',
                description: 'Completed 10 HTML projects successfully',
                icon: 'fas fa-medal',
                time: '1 day ago',
                type: 'achievement'
            },
            {
                id: 4,
                title: 'Updated Profile Settings',
                description: 'Customized theme and notification preferences',
                icon: 'fas fa-cog',
                time: '2 days ago',
                type: 'settings'
            },
            {
                id: 5,
                title: 'Started Progress Tracker',
                description: 'Began tracking daily coding activities',
                icon: 'fas fa-chart-line',
                time: '3 days ago',
                type: 'feature'
            }
        ];
    }

    renderProfile() {
        document.getElementById('userName').textContent = this.userData.fullName;
        document.getElementById('userTitle').textContent = this.userData.title;
        document.getElementById('fullName').textContent = this.userData.fullName;
        document.getElementById('userEmail').textContent = this.userData.email;
        document.getElementById('joinDate').textContent = this.userData.joinDate;
        document.getElementById('userLocation').textContent = this.userData.location;
        document.getElementById('avatarImg').src = this.userData.avatar;
        
        // Update bio if element exists
        const bioElement = document.getElementById('userBio');
        if (bioElement) {
            bioElement.textContent = this.userData.bio || 'Passionate web developer dedicated to creating beautiful and functional web applications.';
        }
    }

    renderAchievements() {
        const grid = document.getElementById('achievementsGrid');
        grid.innerHTML = this.achievements.map(achievement => this.createAchievementBadge(achievement)).join('');
    }

    createAchievementBadge(achievement) {
        const lockedClass = achievement.unlocked ? '' : 'locked';
        const lockIcon = achievement.unlocked ? '' : '<i class="fas fa-lock" style="position: absolute; top: 10px; right: 10px;"></i>';

        return `
            <div class="achievement-badge ${lockedClass}" title="${achievement.description}">
                ${lockIcon}
                <div class="achievement-icon">
                    <i class="${achievement.icon}"></i>
                </div>
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-desc">${achievement.description}</div>
                ${achievement.unlocked ? `<div style="font-size: 0.8rem; margin-top: 0.5rem; opacity: 0.8;">Earned: ${achievement.unlockedDate}</div>` : ''}
            </div>
        `;
    }

    renderActivities() {
        const list = document.getElementById('activityList');
        list.innerHTML = this.activities.map(activity => this.createActivityItem(activity)).join('');
    }

    createActivityItem(activity) {
        return `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-desc">${activity.description}</div>
                </div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
    }

    updateStats() {
        // Get stats from various sources
        const progressData = JSON.parse(localStorage.getItem('progressData')) || {};
        const watchedVideos = JSON.parse(localStorage.getItem('watchedVideos')) || {};

        // Calculate projects completed (from progress tracker)
        const projectsCompleted = Object.keys(progressData).length;
        const projectsEl = document.getElementById('projectsCompleted');
        if (projectsEl) projectsEl.textContent = projectsCompleted;

        // Calculate current streak (simplified)
        const currentStreak = this.calculateStreak();
        const streakEl = document.getElementById('currentStreak');
        if (streakEl) streakEl.textContent = currentStreak;

        // Calculate days active
        const joinDate = new Date(this.userData.joinDate);
        const today = new Date();
        const daysActive = Math.floor((today - joinDate) / (1000 * 60 * 60 * 24));
        const daysActiveEl = document.getElementById('daysActive') || document.getElementById('daysActiveCounter');
        if (daysActiveEl) daysActiveEl.textContent = Math.max(1, daysActive);

        // Calculate completion rate
        const completionRate = Math.round((projectsCompleted / 100) * 100);
        const completionRateEl = document.getElementById('completionRate') || document.getElementById('completionRateCounter');
        if (completionRateEl) completionRateEl.textContent = `${completionRate}%`;

        // Eligibility check for Mentor Mode (past Day 50)
        const completedDaysCount = projectsCompleted;
        const mentorModeContainer = document.getElementById('mentorModeContainer');
        if (mentorModeContainer) {
            if (completedDaysCount >= 50) {
                mentorModeContainer.style.display = 'block';
            } else {
                mentorModeContainer.style.display = 'none';
            }
        }
    }

    calculateStreak() {
        const progressData = JSON.parse(localStorage.getItem('progressData')) || {};
        const dates = Object.keys(progressData).sort().reverse();

        if (dates.length === 0) return 0;

        let streak = 0;
        const today = new Date().toISOString().split('T')[0];
        let currentDate = new Date(today);

        for (let i = 0; i < dates.length; i++) {
            const dateStr = currentDate.toISOString().split('T')[0];
            if (dates.includes(dateStr)) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    }

    bindEvents() {
        // Edit profile button
        document.getElementById('editProfileBtn').addEventListener('click', () => {
            this.openEditModal();
        });

        // Edit avatar button
        document.getElementById('editAvatarBtn').addEventListener('click', () => {
            this.changeAvatar();
        });

        // Modal events
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') {
                this.closeModal();
            }
        });

        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.closeModal();
        });

        // Form submission
        document.getElementById('editProfileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProfile();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Mentor Toggle Event
        const mentorToggle = document.getElementById('mentorToggle');
        if (mentorToggle) {
            mentorToggle.addEventListener('change', (e) => {
                this.handleMentorToggle(e.target.checked);
            });
        }
    }

    initMentorMode() {
        const mentorToggle = document.getElementById('mentorToggle');
        if (mentorToggle) {
            const isMentor = localStorage.getItem('mentorModeEnabled') === 'true';
            mentorToggle.checked = isMentor;

            // If already enabled, ensure Arena service knows
            if (isMentor && window.Arena) {
                window.Arena.updateStatus('online', { isMentor: true });
            }
        }
    }

    async handleMentorToggle(enabled) {
        localStorage.setItem('mentorModeEnabled', enabled);

        if (window.Arena) {
            try {
                await window.Arena.updateStatus('online', { isMentor: enabled });
                this.showNotification(enabled ? 'Mentor Mode Activated! 👑' : 'Mentor Mode Disabled', 'success');

                this.addActivity({
                    title: enabled ? 'Activated Mentor Mode' : 'Deactivated Mentor Mode',
                    description: enabled ? 'You are now visible to junior developers for SOS help.' : 'You will no longer receive mentor alerts.',
                    icon: enabled ? 'fas fa-graduation-cap' : 'fas fa-user',
                    time: 'Just now',
                    type: 'profile'
                });
            } catch (error) {
                console.error('Failed to update mentor status:', error);
                this.showNotification('Failed to update status', 'error');
            }
        }
    }

    openEditModal() {
        const modal = document.getElementById('editModal');

        // Populate form with current data
        document.getElementById('editFullName').value = this.userData.fullName;
        document.getElementById('editEmail').value = this.userData.email;
        document.getElementById('editTitle').value = this.userData.title;
        document.getElementById('editLocation').value = this.userData.location;
        document.getElementById('editBio').value = this.userData.bio || '';

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('editModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    saveProfile() {
        // Get form data
        const formData = {
            fullName: document.getElementById('editFullName').value.trim(),
            email: document.getElementById('editEmail').value.trim(),
            title: document.getElementById('editTitle').value.trim(),
            location: document.getElementById('editLocation').value.trim(),
            bio: document.getElementById('editBio').value.trim()
        };

        // Validate required fields
        if (!formData.fullName || !formData.email) {
            alert('Please fill in all required fields');
            return;
        }

        // Update user data
        this.userData = { ...this.userData, ...formData };

        // Save to localStorage
        localStorage.setItem('profileData', JSON.stringify(this.userData));

        // Update UI
        this.renderProfile();
        this.closeModal();

        // Add activity
        this.addActivity({
            title: 'Updated Profile',
            description: 'Modified profile information and settings',
            icon: 'fas fa-user-edit',
            time: 'Just now',
            type: 'profile'
        });

        // Show success message
        this.showNotification('Profile updated successfully!', 'success');
    }

    changeAvatar() {
        const avatars = [
            '../assets/images/pilot_avatar.png',
            'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
            'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
            'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
            'https://api.dicebear.com/7.x/avataaars/svg?seed=4'
        ];

        const currentIndex = avatars.indexOf(this.userData.avatar);
        const nextIndex = (currentIndex + 1) % avatars.length;

        this.userData.avatar = avatars[nextIndex];
        localStorage.setItem('profileData', JSON.stringify(this.userData));

        document.getElementById('avatarImg').src = this.userData.avatar;

        this.showNotification('Avatar updated!', 'success');
    }

    addActivity(activity) {
        activity.id = Date.now();
        this.activities.unshift(activity);

        // Keep only last 10 activities
        this.activities = this.activities.slice(0, 10);

        // Save to localStorage
        localStorage.setItem('profileActivities', JSON.stringify(this.activities));

        // Re-render activities
        this.renderActivities();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : '#2196f3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileManager;
}
