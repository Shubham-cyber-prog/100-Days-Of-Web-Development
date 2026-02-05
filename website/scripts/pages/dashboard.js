
import { firestoreService } from '../firestore.js';

document.addEventListener('DOMContentLoaded', () => {
    // Wait for AuthService to load
    function waitForAuthService() {
        if (window.AuthService) {
            initializeDashboard();
        } else {
            setTimeout(waitForAuthService, 100);
        }
    }

    waitForAuthService();

    async function initializeDashboard() {
        // Dynamic imports for components
        const { PresenceIndicator } = await import('../components/PresenceIndicator.js');
        // const { Arena } = await import('../core/arenaService.js'); // check if needed

        const auth = window.AuthService;

        // Check authentication using AuthService
        if (!auth.isAuthenticated()) {
            console.log('❌ Not authenticated, redirecting to home');
            window.location.href = '../index.html';
            return;
        }

        const user = auth.getCurrentUser();
        const isGuest = auth.isGuest();

        console.log('✅ Dashboard initialized for:', user?.email || 'Guest');

        // Show guest banner if guest user
        if (isGuest) {
            const guestBanner = document.getElementById('guestBanner');
            if (guestBanner) {
                guestBanner.style.display = 'block';
            }
        }

        // Logout functionality
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                if (confirm('Abort mission?')) {
                    auth.logout();
                    window.location.href = '../index.html';
                }
            });
        }

        // --- FETCH PROJECTS DATA ---
        let projects = [];
        try {
            const response = await fetch('../../data/projects.json');
            if (response.ok) {
                projects = await response.json();
            } else {
                console.error('Failed to load projects.json');
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }

        // Load user stats
        let userStats = null;
        let completedDays = [];

        async function loadUserStats() {
            // 1. Try Firestore if logged in
            if (!user.isGuest && user.userId) {
                try {
                    userStats = await firestoreService.getUserStats(user.userId);
                    if (userStats) {
                        completedDays = userStats.completedDays || [];
                        console.log('Loaded user stats from Firestore:', userStats);
                    }
                } catch (error) {
                    console.error('Error loading stats from Firestore:', error);
                }
            }

            // 2. Fallback to LocalStorage or Initialize defaults if no Firestore data
            if (!userStats) {
                completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]');

                // Calculate basic stats derived from local data
                const currentStreak = calculateStreak(completedDays);

                userStats = {
                    progressPercent: Math.round((completedDays.length / 100) * 100),
                    completedDays: completedDays,
                    currentStreak: currentStreak,
                    longestStreak: currentStreak, // simplified assumption if local only
                    status: "Active",
                    username: user.email ? user.email.split('@')[0] : 'Guest'
                };
            }

            checkAchievements();
        }

        function checkAchievements() {
            // Placeholder if achievementService is not imported or available
            // If you have an achievementService, import and use it here.
            if (window.achievementService) {
                window.achievementService.checkAchievements({
                    totalCompleted: completedDays.length,
                    currentStreak: calculateStreak(completedDays),
                    techCount: 3
                });
            }
        }

        function calculateStreak(days) {
            if (!days.length) return 0;
            const sorted = [...days].sort((a, b) => b - a);
            let streak = 0;
            for (let i = 0; i < sorted.length - 1; i++) {
                if (sorted[i] - sorted[i + 1] === 1) streak++;
                else break;
            }
            return streak + 1;
        }

        // Listen for progress updates from other tabs/windows
        window.addEventListener('progressUpdated', (e) => {
            completedDays = e.detail;
            renderProgressGrid();
            updateStatsCards(); // Renamed to differentiate
        });

        await loadUserStats();
        updateUI();

        function renderProgressGrid() {
            const progressGrid = document.getElementById('progressGrid');
            if (!progressGrid) return;
            progressGrid.innerHTML = '';

            // Create 10 quarters
            for (let quarter = 0; quarter < 10; quarter++) {
                const quarterBlock = document.createElement('div');
                quarterBlock.className = 'quarter-block';

                for (let week = 0; week < 2; week++) {
                    for (let dayOfWeek = 0; dayOfWeek < 5; dayOfWeek++) {
                        const day = quarter * 10 + week * 5 + dayOfWeek + 1;
                        if (day > 100) break;
                        const dayElement = document.createElement('div');
                        dayElement.className = `day-cell ${completedDays.includes(day) ? 'completed' : ''}`;

                        const project = projects.find(p => p.day === day);
                        const tooltipText = project ?
                            `Day ${day}: ${project.title}\nLevel: ${project.level}` :
                            `Day ${day}: Locked`;

                        dayElement.setAttribute('title', tooltipText);

                        // Add Presence Container
                        const presenceCont = document.createElement('div');
                        presenceCont.className = 'day-presence-hub';
                        dayElement.appendChild(presenceCont);

                        // Initialize Presence for this specific day
                        new PresenceIndicator(presenceCont, { day, compact: true, showAvatars: true, maxAvatars: 2 });

                        dayElement.addEventListener('click', () => toggleDay(day));
                        quarterBlock.appendChild(dayElement);
                    }
                }
                progressGrid.appendChild(quarterBlock);
            }

            // Injects styles for presence hub positioning
            if (!document.getElementById('dashboard-presence-styles')) {
                const style = document.createElement('style');
                style.id = 'dashboard-presence-styles';
                style.textContent = `
                    .day-cell { position: relative; overflow: visible !important; }
                    .day-presence-hub {
                        position: absolute;
                        bottom: -12px;
                        right: -12px;
                        z-index: 10;
                        transform: scale(0.6);
                        pointer-events: none;
                    }
                `;
                document.head.appendChild(style);
            }
        }

        async function toggleDay(day) {
            const isMarkingComplete = !completedDays.includes(day);

            if (isMarkingComplete) {
                try {
                    // Trigger automated grading if graderService is available
                    if (window.graderService) {
                        // Notify.info(`Analyzing Mission ${day} Project...`); // Assuming Notify available globally or imported
                        console.log(`Analyzing Mission ${day}...`);
                        const report = await window.graderService.gradeProject(day);

                        // Show report UI
                        if (window.graderUI) window.graderUI.showReport(report);

                        if (report.status !== 'PASSED') {
                            // Notify.warning('Mission requirements not met.');
                            return;
                        }
                    }
                } catch (error) {
                    console.error('Grader failed, allowing manual completion fallback:', error);
                }
            }

            // Toggle logic
            if (completedDays.includes(day)) {
                completedDays = completedDays.filter(d => d !== day);
            } else {
                completedDays.push(day);
            }

            // Update Storage
            localStorage.setItem('completedDays', JSON.stringify(completedDays));

            // Update Firestore if logged in
            if (!user.isGuest && user.userId) {
                try {
                    await firestoreService.updateCompletedDays(user.userId, completedDays);
                    // Reload stats
                    userStats = await firestoreService.getUserStats(user.userId);
                    completedDays = userStats.completedDays || [];
                } catch (error) {
                    console.error('Error updating progress in Firestore:', error);
                }
            }

            renderProgressGrid();
            updateStatsCards();
            updateUI(); // Refresh overall UI
        }

        function updateUI() {
            // Update user name
            const userNameElement = document.getElementById('userName');
            if (userNameElement && userStats) {
                userNameElement.textContent = userStats.username || (user.email ? user.email.split('@')[0] : 'Guest');
            }

            // Update current day and streak text
            const currentDayElement = document.getElementById('currentDay');
            const streakTextElement = document.getElementById('streakText');
            if (currentDayElement && userStats) {
                currentDayElement.textContent = userStats.currentDay ? `Day ${userStats.currentDay}` : 'Day 0';
                streakTextElement.textContent = userStats.currentStreak > 0 ? `${userStats.currentStreak} day streak!` : 'Keep building!';
            }

            updateStatsCards();
            renderProgressGrid();
            renderRecentProjects();

            // Trigger Neural Nexus analysis if available
            if (window.initializeNeuralNexus) {
                window.initializeNeuralNexus(projects);
            }
        }

        function updateStatsCards() {
            if (!userStats) return;

            // Progress
            const progressPercentEl = document.getElementById('progressPercent');
            const completedDaysEl = document.getElementById('completedDays');
            const progressBarEl = document.getElementById('progressBar');

            if (progressPercentEl) progressPercentEl.textContent = `${userStats.progressPercent || 0}%`;
            if (completedDaysEl) completedDaysEl.textContent = userStats.completedDays ? userStats.completedDays.length : 0;
            if (progressBarEl) progressBarEl.style.width = `${userStats.progressPercent || 0}%`;

            // Current Streak
            const currentStreakEl = document.getElementById('currentStreak');
            if (currentStreakEl) currentStreakEl.textContent = userStats.currentStreak || 0;

            // Best Streak
            const longestStreakEl = document.getElementById('longestStreak');
            if (longestStreakEl) longestStreakEl.textContent = userStats.longestStreak || 0;

            // Status
            const userStatusEl = document.getElementById('userStatus');
            if (userStatusEl) userStatusEl.textContent = userStats.status || 'Active';
        }

        function renderRecentProjects() {
            const recentProjectsEl = document.getElementById('recentProjects');
            if (!recentProjectsEl || !userStats) return;

            recentProjectsEl.innerHTML = '';

            // This assumes userStats has a recentProjects array, or we derive it from completedDays
            // Since completedDays is an array of numbers, we can find the projects

            const recentDays = [...completedDays].sort((a, b) => b - a).slice(0, 3);

            if (recentDays.length > 0) {
                recentDays.forEach(day => {
                    const project = projects.find(p => p.day === day);
                    if (project) {
                        const projectCard = document.createElement('div');
                        projectCard.className = 'project-card';
                        projectCard.innerHTML = `
                            <h4>Day ${project.day}</h4>
                            <span class="project-tag">Completed</span>
                            <p>${project.title}</p>
                        `;
                        recentProjectsEl.appendChild(projectCard);
                    }
                });
            } else {
                recentProjectsEl.innerHTML = '<p class="text-secondary">No recent projects yet. Start building!</p>';
            }
        }

        // Profile modal functions
        window.openProfileModal = function () {
            const modal = document.getElementById('profileModal');
            if (modal && userStats) {
                document.getElementById('profileUsername').value = userStats.username || '';
                document.getElementById('profileBio').value = userStats.bio || '';
                document.getElementById('profileLocation').value = userStats.location || '';
                document.getElementById('profileWebsite').value = userStats.website || '';
                document.getElementById('profileGithub').value = userStats.github || '';
                modal.style.display = 'flex';
            }
        };

        window.closeProfileModal = function () {
            const modal = document.getElementById('profileModal');
            if (modal) modal.style.display = 'none';
        };

        // Handle profile form submission
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                if (user.isGuest || !user.userId) {
                    alert('Please log in to edit your profile.');
                    return;
                }

                const formData = new FormData(profileForm);
                const profileData = {
                    username: formData.get('username'),
                    bio: formData.get('bio'),
                    location: formData.get('location'),
                    website: formData.get('website'),
                    github: formData.get('github')
                };

                try {
                    await firestoreService.updateUserProfile(user.userId, profileData);
                    // Reload stats to get updated profile
                    userStats = await firestoreService.getUserStats(user.userId);
                    updateUI();
                    closeProfileModal();
                    alert('Profile updated successfully!');
                } catch (error) {
                    console.error('Error updating profile:', error);
                }
            });
        }

        // Handle logout
        window.handleLogout = async function () {
            if (confirm('Are you sure you want to log out?')) {
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = 'login.html';
            }
        };
    }
});
