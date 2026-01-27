class LeaderboardManager {
    constructor() {
        this.users = this.generateUsers();
        this.currentPeriod = 'all';
        this.searchQuery = '';
        this.currentUser = this.getCurrentUser();
        
        this.init();
    }
    
    init() {
        this.renderLeaderboard();
        this.renderPodium();
        this.renderYourRank();
        this.bindEvents();
    }
    
    generateUsers() {
        const names = [
            'Alex Rodriguez', 'Sarah Chen', 'Mike Johnson', 'Emma Wilson', 'David Kim',
            'Lisa Anderson', 'James Brown', 'Maria Garcia', 'Robert Taylor', 'Jennifer Lee',
            'Michael Davis', 'Ashley Miller', 'Christopher Wilson', 'Jessica Moore', 'Web Developer'
        ];
        
        const titles = [
            'Frontend Developer', 'Full Stack Engineer', 'UI/UX Designer', 'Backend Developer',
            'React Specialist', 'Vue.js Expert', 'JavaScript Ninja', 'CSS Master', 'Web Designer',
            'Software Engineer', 'Frontend Enthusiast', 'Code Warrior', 'Tech Explorer'
        ];
        
        const achievements = [
            { id: 1, name: 'First Steps', icon: 'fas fa-baby' },
            { id: 2, name: 'Week Warrior', icon: 'fas fa-fire' },
            { id: 3, name: 'HTML Master', icon: 'fab fa-html5' },
            { id: 4, name: 'CSS Wizard', icon: 'fab fa-css3-alt' },
            { id: 5, name: 'JS Ninja', icon: 'fab fa-js' },
            { id: 6, name: 'Century Club', icon: 'fas fa-trophy' }
        ];
        
        return names.map((name, index) => {
            const basePoints = Math.max(100, 2000 - (index * 120) + Math.random() * 200);
            const projects = Math.max(1, Math.floor(basePoints / 50) + Math.random() * 10);
            const streak = Math.max(0, Math.floor(Math.random() * 30));
            
            return {
                id: index + 1,
                name: name,
                title: titles[Math.floor(Math.random() * titles.length)],
                avatar: index === 14 ? '../assets/images/pilot_avatar.png' : `https://api.dicebear.com/7.x/avataaars/svg?seed=${index + 1}`,
                points: {
                    all: Math.floor(basePoints),
                    monthly: Math.floor(basePoints * 0.3),
                    weekly: Math.floor(basePoints * 0.1)
                },
                projects: Math.floor(projects),
                streak: streak,
                badges: achievements.slice(0, Math.floor(Math.random() * 4) + 1),
                progress: {
                    html: Math.floor(Math.random() * 40) + 60,
                    css: Math.floor(Math.random() * 40) + 50,
                    javascript: Math.floor(Math.random() * 50) + 30,
                    responsive: Math.floor(Math.random() * 30) + 70
                },
                isCurrentUser: name === 'Web Developer'
            };
        });
    }
    
    getCurrentUser() {
        return this.users.find(user => user.isCurrentUser) || this.users[this.users.length - 1];
    }
    
    getSortedUsers() {
        return [...this.users]
            .filter(user => {
                if (!this.searchQuery) return true;
                return user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                       user.title.toLowerCase().includes(this.searchQuery.toLowerCase());
            })
            .sort((a, b) => b.points[this.currentPeriod] - a.points[this.currentPeriod]);
    }
    
    renderPodium() {
        const sortedUsers = this.getSortedUsers();
        const top3 = sortedUsers.slice(0, 3);
        
        if (top3.length >= 1) {
            const first = document.getElementById('firstPlace');
            first.querySelector('img').src = top3[0].avatar;
            first.querySelector('h3').textContent = top3[0].name;
            first.querySelector('p').textContent = `${top3[0].points[this.currentPeriod]} points`;
        }
        
        if (top3.length >= 2) {
            const second = document.getElementById('secondPlace');
            second.querySelector('img').src = top3[1].avatar;
            second.querySelector('h3').textContent = top3[1].name;
            second.querySelector('p').textContent = `${top3[1].points[this.currentPeriod]} points`;
        }
        
        if (top3.length >= 3) {
            const third = document.getElementById('thirdPlace');
            third.querySelector('img').src = top3[2].avatar;
            third.querySelector('h3').textContent = top3[2].name;
            third.querySelector('p').textContent = `${top3[2].points[this.currentPeriod]} points`;
        }
    }
    
    renderLeaderboard() {
        const tbody = document.getElementById('leaderboardBody');
        const sortedUsers = this.getSortedUsers();
        
        tbody.innerHTML = sortedUsers.map((user, index) => this.createLeaderboardRow(user, index + 1)).join('');
        
        // Add click events
        document.querySelectorAll('.leaderboard-row').forEach(row => {
            row.addEventListener('click', () => {
                const userId = parseInt(row.dataset.userId);
                this.openUserModal(userId);
            });
        });
    }
    
    createLeaderboardRow(user, rank) {
        const isCurrentUser = user.isCurrentUser ? 'current-user' : '';
        
        return `
            <div class="leaderboard-row ${isCurrentUser}" data-user-id="${user.id}">
                <div class="rank-cell">#${rank}</div>
                <div class="user-cell">
                    <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
                    <div class="user-info">
                        <h4>${user.name}</h4>
                        <p>${user.title}</p>
                    </div>
                </div>
                <div class="points-cell">${user.points[this.currentPeriod]}</div>
                <div class="projects-cell">${user.projects}</div>
                <div class="streak-cell">${user.streak}</div>
                <div class="badges-cell">
                    ${user.badges.slice(0, 3).map(badge => `
                        <div class="badge-mini" title="${badge.name}">
                            <i class="${badge.icon}"></i>
                        </div>
                    `).join('')}
                    ${user.badges.length > 3 ? `<span>+${user.badges.length - 3}</span>` : ''}
                </div>
            </div>
        `;
    }
    
    renderYourRank() {
        const sortedUsers = this.getSortedUsers();
        const userRank = sortedUsers.findIndex(user => user.isCurrentUser) + 1;
        
        document.getElementById('yourRank').textContent = `#${userRank}`;
        document.getElementById('yourPoints').textContent = this.currentUser.points[this.currentPeriod];
        document.getElementById('yourProjects').textContent = this.currentUser.projects;
        document.getElementById('yourStreak').textContent = this.currentUser.streak;
    }
    
    openUserModal(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;
        
        const sortedUsers = this.getSortedUsers();
        const userRank = sortedUsers.findIndex(u => u.id === userId) + 1;
        
        // Populate modal
        document.getElementById('modalUserName').textContent = `${user.name}'s Profile`;
        document.getElementById('modalAvatar').src = user.avatar;
        document.getElementById('modalRank').textContent = `#${userRank}`;
        document.getElementById('modalFullName').textContent = user.name;
        document.getElementById('modalTitle').textContent = user.title;
        document.getElementById('modalPoints').textContent = user.points[this.currentPeriod];
        document.getElementById('modalProjects').textContent = user.projects;
        document.getElementById('modalStreak').textContent = user.streak;
        
        // Render badges
        const badgesContainer = document.getElementById('modalBadges');
        badgesContainer.innerHTML = user.badges.map(badge => `
            <div class="modal-badge">
                <i class="${badge.icon}"></i>
                ${badge.name}
            </div>
        `).join('');
        
        // Render progress comparison
        this.renderProgressComparison(user);
        
        // Show modal
        document.getElementById('userModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    renderProgressComparison(user) {
        const container = document.getElementById('progressComparison');
        const currentUserProgress = this.currentUser.progress;
        
        const skills = [
            { name: 'HTML/CSS', key: 'html' },
            { name: 'JavaScript', key: 'javascript' },
            { name: 'Responsive', key: 'responsive' }
        ];
        
        container.innerHTML = skills.map(skill => {
            const userValue = user.progress[skill.key];
            const currentValue = currentUserProgress[skill.key];
            const maxValue = Math.max(userValue, currentValue, 100);
            
            return `
                <div class="comparison-item">
                    <div class="comparison-label">${skill.name}</div>
                    <div class="comparison-bars">
                        <div class="comparison-bar user" style="--user-progress: ${userValue}; width: ${(userValue / maxValue) * 100}%"></div>
                        <span>${userValue}%</span>
                    </div>
                </div>
                <div class="comparison-item">
                    <div class="comparison-label">You</div>
                    <div class="comparison-bars">
                        <div class="comparison-bar other" style="--other-progress: ${currentValue}; width: ${(currentValue / maxValue) * 100}%"></div>
                        <span>${currentValue}%</span>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    bindEvents() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.renderLeaderboard();
            this.renderPodium();
            this.renderYourRank();
        });
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentPeriod = e.target.dataset.period;
                this.renderLeaderboard();
                this.renderPodium();
                this.renderYourRank();
            });
        });
        
        // Modal events
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('userModal').addEventListener('click', (e) => {
            if (e.target.id === 'userModal') {
                this.closeModal();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
        
        // Podium click events
        document.querySelectorAll('.podium-place').forEach((place, index) => {
            place.addEventListener('click', () => {
                const sortedUsers = this.getSortedUsers();
                if (sortedUsers[index]) {
                    this.openUserModal(sortedUsers[index].id);
                }
            });
        });
    }
    
    closeModal() {
        document.getElementById('userModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Update user data based on actual progress
    updateCurrentUserData() {
        const progressData = JSON.parse(localStorage.getItem('progressData')) || {};
        const watchedVideos = JSON.parse(localStorage.getItem('watchedVideos')) || {};
        const profileData = JSON.parse(localStorage.getItem('profileData')) || {};
        
        // Update current user with real data
        if (this.currentUser) {
            this.currentUser.projects = Object.keys(progressData).length;
            this.currentUser.points.all = this.currentUser.projects * 50 + Object.keys(watchedVideos).length * 25;
            this.currentUser.points.monthly = Math.floor(this.currentUser.points.all * 0.3);
            this.currentUser.points.weekly = Math.floor(this.currentUser.points.all * 0.1);
            
            if (profileData.fullName) {
                this.currentUser.name = profileData.fullName;
            }
            if (profileData.title) {
                this.currentUser.title = profileData.title;
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const leaderboard = new LeaderboardManager();
    
    // Update with real user data
    leaderboard.updateCurrentUserData();
    leaderboard.renderLeaderboard();
    leaderboard.renderPodium();
    leaderboard.renderYourRank();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LeaderboardManager;
}
