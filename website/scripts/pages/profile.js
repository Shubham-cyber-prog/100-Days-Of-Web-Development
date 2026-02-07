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

        // Initialize Mission Logs (encrypted notes)
        await this.initMissionLogs();
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
            // Beginner Achievements
            {
                id: 1,
                title: 'Hello World',
                description: 'Complete your first project',
                icon: 'fas fa-rocket',
                unlocked: true,
                unlockedDate: '2024-01-15',
                tier: 'bronze',
                rarity: 'common'
            },
            {
                id: 2,
                title: 'Quick Learner',
                description: 'Complete 5 projects in a week',
                icon: 'fas fa-bolt',
                unlocked: true,
                unlockedDate: '2024-01-22',
                tier: 'bronze',
                rarity: 'common'
            },
            {
                id: 3,
                title: 'Code Streak',
                description: 'Code for 7 consecutive days',
                icon: 'fas fa-fire',
                unlocked: true,
                unlockedDate: '2024-02-01',
                tier: 'silver',
                rarity: 'uncommon'
            },
            // Intermediate Achievements
            {
                id: 4,
                title: 'HTML Master',
                description: 'Complete 10 HTML projects',
                icon: 'fab fa-html5',
                unlocked: true,
                unlockedDate: '2024-02-10',
                tier: 'silver',
                rarity: 'uncommon'
            },
            {
                id: 5,
                title: 'CSS Wizard',
                description: 'Master CSS animations and advanced layouts',
                icon: 'fab fa-css3-alt',
                unlocked: false,
                tier: 'gold',
                rarity: 'rare',
                progress: 70
            },
            {
                id: 6,
                title: 'JavaScript Ninja',
                description: 'Build 10 interactive JavaScript apps',
                icon: 'fab fa-js',
                unlocked: false,
                tier: 'gold',
                rarity: 'rare',
                progress: 40
            },
            // Advanced Achievements
            {
                id: 7,
                title: 'React Developer',
                description: 'Create 5 React applications',
                icon: 'fab fa-react',
                unlocked: false,
                tier: 'gold',
                rarity: 'rare',
                progress: 20
            },
            {
                id: 8,
                title: 'Full Stack Hero',
                description: 'Build a complete full-stack application',
                icon: 'fas fa-layer-group',
                unlocked: false,
                tier: 'platinum',
                rarity: 'epic',
                progress: 15
            },
            {
                id: 9,
                title: 'Century Club',
                description: 'Complete the 100 days challenge',
                icon: 'fas fa-trophy',
                unlocked: false,
                tier: 'platinum',
                rarity: 'legendary',
                progress: 73
            },
            // Special Achievements
            {
                id: 10,
                title: 'Night Owl',
                description: 'Code after midnight 10 times',
                icon: 'fas fa-moon',
                unlocked: true,
                unlockedDate: '2024-02-05',
                tier: 'silver',
                rarity: 'uncommon'
            },
            {
                id: 11,
                title: 'Open Source Contributor',
                description: 'Contribute to an open source project',
                icon: 'fas fa-code-branch',
                unlocked: false,
                tier: 'gold',
                rarity: 'rare'
            },
            {
                id: 12,
                title: 'Bug Hunter',
                description: 'Fix 20 bugs in your projects',
                icon: 'fas fa-bug',
                unlocked: false,
                tier: 'silver',
                rarity: 'uncommon',
                progress: 55
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
        
        // Update cover photo if saved
        const coverImg = document.getElementById('coverImg');
        if (coverImg && this.userData.coverPhoto) {
            coverImg.src = this.userData.coverPhoto;
        }
        
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
        const tierClass = `tier-${achievement.tier}`;
        const rarityClass = `rarity-${achievement.rarity}`;
        
        // Progress bar for locked achievements with progress
        let progressBar = '';
        if (!achievement.unlocked && achievement.progress) {
            // Validate progress is a safe number between 0-100
            const safeProgress = Math.max(0, Math.min(100, Number(achievement.progress) || 0));
            progressBar = `
                <div class="achievement-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${safeProgress}%"></div>
                    </div>
                    <span class="progress-text">${safeProgress}%</span>
                </div>
            `;
        }
        
        // Unlock date for unlocked achievements
        let unlockDate = '';
        if (achievement.unlocked) {
            unlockDate = `<div class="achievement-date">Earned: ${achievement.unlockedDate}</div>`;
        }
        
        // Lock icon for locked achievements
        const lockIcon = achievement.unlocked ? '' : '<i class="fas fa-lock achievement-lock"></i>';

        return `
            <div class="achievement-badge ${lockedClass} ${tierClass} ${rarityClass}" 
                 data-tier="${achievement.tier}" 
                 data-rarity="${achievement.rarity}"
                 title="${achievement.description}">
                ${lockIcon}
                <div class="achievement-icon-wrapper">
                    <div class="achievement-icon">
                        <i class="${achievement.icon}"></i>
                    </div>
                    <div class="achievement-glow"></div>
                </div>
                <div class="achievement-info">
                    <div class="achievement-title">${achievement.title}</div>
                    <div class="achievement-desc">${achievement.description}</div>
                    ${progressBar}
                    ${unlockDate}
                </div>
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

        // Share profile button
        const shareBtn = document.getElementById('shareProfileBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareProfile();
            });
        }

        // Edit avatar button
        document.getElementById('editAvatarBtn').addEventListener('click', () => {
            this.changeAvatar();
        });

        // Edit cover button
        const editCoverBtn = document.getElementById('editCoverBtn');
        if (editCoverBtn) {
            editCoverBtn.addEventListener('click', () => {
                this.changeCoverPhoto();
            });
        }

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

    /**
     * Generic method to handle image upload with validation
     * @param {string} propertyName - The property name to save in userData (e.g., 'avatar', 'coverPhoto')
     * @param {string} successMessage - Message to show on success
     * @param {Function} updateCallback - Optional callback to update DOM element
     */
    uploadImage(propertyName, successMessage, updateCallback) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    this.showNotification('Image size must be less than 5MB', 'error');
                    return;
                }

                // Validate file type
                if (!file.type.startsWith('image/')) {
                    this.showNotification('Please select an image file', 'error');
                    return;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    this.userData[propertyName] = event.target.result;
                    localStorage.setItem('profileData', JSON.stringify(this.userData));
                    
                    // Call update callback if provided
                    if (updateCallback) {
                        updateCallback(event.target.result);
                    }
                    
                    this.showNotification(successMessage, 'success');
                    
                    this.addActivity({
                        title: `Changed ${propertyName === 'avatar' ? 'Profile Picture' : 'Cover Photo'}`,
                        description: `Updated profile ${propertyName === 'avatar' ? 'avatar' : 'cover'} with new image`,
                        icon: 'fas fa-image',
                        time: 'Just now',
                        type: 'profile'
                    });
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    }

    changeAvatar() {
        this.uploadImage('avatar', 'Avatar updated successfully!', (imageData) => {
            document.getElementById('avatarImg').src = imageData;
        });
    }

    changeCoverPhoto() {
        this.uploadImage('coverPhoto', 'Cover photo updated successfully!', (imageData) => {
            const coverImg = document.getElementById('coverImg');
            if (coverImg) {
                coverImg.src = imageData;
            }
        });
    }

    shareProfile() {
        const profileUrl = window.location.href;
        const shareText = `Check out ${this.userData.fullName}'s profile on 100 Days of Web Development!`;

        // Check if Web Share API is available
        if (navigator.share) {
            navigator.share({
                title: `${this.userData.fullName} - 100 Days of Web Dev`,
                text: shareText,
                url: profileUrl
            })
            .then(() => {
                this.showNotification('Profile shared successfully!', 'success');
            })
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    console.error('Error sharing:', error);
                    this.fallbackShare(profileUrl);
                }
            });
        } else {
            // Fallback to clipboard copy
            this.fallbackShare(profileUrl);
        }
    }

    fallbackShare(url) {
        // Copy to clipboard as fallback
        navigator.clipboard.writeText(url)
            .then(() => {
                this.showNotification('Profile link copied to clipboard!', 'success');
            })
            .catch(() => {
                // If clipboard fails, show modal with shareable link
                this.showShareModal(url);
            });
    }

    showShareModal(url) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 400px;">
                <div class="modal-header">
                    <h3>Share Profile</h3>
                    <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <p style="margin-bottom: 1rem; color: var(--text-secondary);">Share this link:</p>
                    <div style="display: flex; gap: 0.5rem;">
                        <input type="text" value="${url}" readonly 
                               style="flex: 1; padding: 0.75rem; border: 2px solid var(--border-light); 
                                      border-radius: 8px; font-size: 0.9rem;"
                               onclick="this.select()">
                        <button class="btn-primary" onclick="
                            navigator.clipboard.writeText('${url}').then(() => {
                                alert('Copied to clipboard!');
                                this.closest('.modal').remove();
                            });
                        " style="padding: 0.75rem 1rem; white-space: nowrap;">
                            Copy
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
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
        
        let bgColor = '#2196f3'; // info
        if (type === 'success') bgColor = '#4caf50';
        if (type === 'error') bgColor = '#f44336';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
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

    /**
     * Initialize Mission Logs (Encrypted Private Notes)
     */
    async initMissionLogs() {
        try {
            // Dynamically import Mission Logs UI component
            const { default: missionLogsUI } = await import('../components/MissionLogsUI.js');

            // Initialize the component
            await missionLogsUI.initialize('missionLogsContainer');

            console.log('✅ Mission Logs initialized');
        } catch (error) {
            console.error('Failed to initialize Mission Logs:', error);
            // Show fallback message
            const container = document.getElementById('missionLogsContainer');
            if (container) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                        <p>Mission Logs feature is currently unavailable.</p>
                        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Please refresh the page to try again.</p>
                    </div>
                `;
            }
        }
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
