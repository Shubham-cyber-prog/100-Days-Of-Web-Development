
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
        const { Arena } = await import('../core/arenaService.js');

        const auth = window.AuthService;

        // Check authentication using AuthService
        if (!auth.isAuthenticated()) {
            console.log('❌ Not authenticated, redirecting to login');
            window.location.href = 'login.html';
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

        // Logout functionality with Notify confirmation
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                if (confirm('Abort mission?')) {
                    auth.logout();
                    window.location.href = 'login.html';
                }
            });
        }

        // Projects data
        const projects = [
            // BEGINNER (Days 1-30)
            { day: 1, title: "Animated Landing Page", folder: "Day 01", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 2, title: "Advanced To-Do List", folder: "Day 02", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 3, title: "Weather Forecast App", folder: "Day 03", level: "Beginner", tech: ["HTML", "CSS", "JS", "API"] },
            { day: 4, title: "Jewellery-company landing page", folder: "Day 04", level: "Beginner", tech: ["HTML", "CSS"] },
            { day: 5, title: "Random Image Generator", folder: "Day 05", level: "Beginner", tech: ["HTML", "CSS", "JS", "API"] },
            { day: 6, title: "New Year Countdown", folder: "Day 06", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 7, title: "Stylish Animated loginpage", folder: "Day 07", level: "Beginner", tech: ["HTML", "CSS"] },
            { day: 8, title: "BMI Calculator", folder: "Day 08", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 9, title: "QR Generator", folder: "Day 09", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 10, title: "Rock Paper Scissors Game", folder: "Day 10", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 11, title: "Reading Journal", folder: "Day 11", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 12, title: "Pong Game", folder: "Day 12", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 13, title: "Colour Picker", folder: "Day 13", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 14, title: "Drawing Canvas", folder: "Day 14", level: "Beginner", tech: ["HTML", "CSS", "JS", "Canvas"] },
            { day: 15, title: "Nasa Astronomy Picture of the day", folder: "Day 15", level: "Beginner", tech: ["HTML", "CSS", "JS", "API"] },
            { day: 16, title: "World Clock", folder: "Day 16", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 17, title: "Mood Timer", folder: "Day 17", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 18, title: "text to PDF Convertor", folder: "Day 18", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 19, title: "Memory Card Game", folder: "Day 19", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 20, title: "Email Validator", folder: "Day 20", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 21, title: "Snake And Ladder Game", folder: "Day 21", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 22, title: "Space Jumper Game", folder: "Day 22", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 23, title: "Smart Calculator 2.0", folder: "Day 23", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 24, title: "Promodoro Timer", folder: "Day 24", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 25, title: "Temperature Converter", folder: "Day 25", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 26, title: "Space War Game", folder: "Day 26", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 27, title: "CHESS GAME", folder: "Day 27", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 28, title: "Rock Paper Scissors Game", folder: "Day 28", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 29, title: "Simon Says Game", folder: "Day 29", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
            { day: 30, title: "Tic Tac Toe", folder: "Day 30", level: "Beginner", tech: ["HTML", "CSS", "JS"] },

            // INTERMEDIATE (Days 31-60)
            { day: 31, title: "Bubble Shooter Game", folder: "Day 31", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 32, title: "Animated Login Form", folder: "Day 32", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 33, title: "Guess the Number Game", folder: "Day 33", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 34, title: "Typing Speed Test webapp", folder: "Day 34", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 35, title: "Startup Name Generator Web App", folder: "Day 35", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 36, title: "Fitness Tracker Dashboard", folder: "Day 36", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 37, title: "Recipe Finder", folder: "Day 37", level: "Intermediate", tech: ["HTML", "CSS", "JS", "API"] },
            { day: 38, title: "Snake Game", folder: "Day 38", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 39, title: "Hangman Game", folder: "Day 39", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 40, title: "Simon Say Game", folder: "Day 40", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 41, title: "GitHub Profile Finder", folder: "Day 41", level: "Intermediate", tech: ["HTML", "CSS", "JS", "API"] },
            { day: 42, title: "HFT Market Tracker", folder: "Day 42", level: "Intermediate", tech: ["HTML", "CSS", "JS", "API"] },
            { day: 43, title: "NewsWave - Your Daily News Aggregator", folder: "Day 43", level: "Intermediate", tech: ["HTML", "CSS", "JS", "API"] },
            { day: 44, title: "AI Chatbot Interface", folder: "Day 44", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 45, title: "Project Management Tool", folder: "Day 45", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 46, title: "ShopEase Pro", folder: "Day 46", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 47, title: "Banking Dashboard", folder: "Day 47", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 48, title: "Flight Booking System", folder: "Day 48", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 49, title: "RecipeShare", folder: "Day 49", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 50, title: "Interactive Resume Builder", folder: "Day 50", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 51, title: "Portfolio & Blog", folder: "Day 51", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 52, title: "Project Day 52", folder: "Day 52", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 53, title: "File Uploader", folder: "Day 53", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 54, title: "CodeEditor Pro", folder: "Day 54", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 55, title: "Project Day 55", folder: "Day 55", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 56, title: "Expense Splitter", folder: "Day 56", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 57, title: "Project Day 57", folder: "Day 57", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 58, title: "Project Day 58", folder: "Day 58", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 59, title: "Project Day 59", folder: "Day 59", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },

            { day: 60, title: "Travel Planner", folder: "Day 60", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 61, title: "Doodle Jump Game", folder: "Day 61", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 62, title: "Project Day 62", folder: "Day 62", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 63, title: "Project Day 63", folder: "Day 63", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 64, title: "Project Day 64", folder: "Day 64", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 65, title: "Project Day 65", folder: "Day 65", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 66, title: "Project Day 66", folder: "Day 66", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 67, title: "Project Day 67", folder: "Day 67", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 68, title: "Project Day 68", folder: "Day 68", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 69, title: "Project Day 69", folder: "Day 69", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 70, title: "Project Day 70", folder: "Day 70", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 71, title: "Project Day 71", folder: "Day 71", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 72, title: "Project Day 72", folder: "Day 72", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 73, title: "Project Day 73", folder: "Day 73", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 74, title: "Project Day 74", folder: "Day 74", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 75, title: "Project Day 75", folder: "Day 75", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 76, title: "Project Day 76", folder: "Day 76", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 77, title: "Project Day 77", folder: "Day 77", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 78, title: "Project Day 78", folder: "Day 78", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 79, title: "Project Day 79", folder: "Day 79", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 80, title: "Project Day 80", folder: "Day 80", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 81, title: "Project Day 81", folder: "Day 81", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 82, title: "Project Day 82", folder: "Day 82", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 83, title: "Project Day 83", folder: "Day 83", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 84, title: "Project Day 84", folder: "Day 84", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 85, title: "Project Day 85", folder: "Day 85", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 86, title: "Project Day 86", folder: "Day 86", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 87, title: "Project Day 87", folder: "Day 87", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 88, title: "Project Day 88", folder: "Day 88", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 89, title: "Project Day 89", folder: "Day 89", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 90, title: "Project Day 90", folder: "Day 90", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 91, title: "Project Day 91", folder: "Day 91", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 92, title: "Project Day 92", folder: "Day 92", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 93, title: "Project Day 93", folder: "Day 93", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 94, title: "Project Day 94", folder: "Day 94", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 95, title: "Project Day 95", folder: "Day 95", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 96, title: "Project Day 96", folder: "Day 96", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 97, title: "Project Day 97", folder: "Day 97", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 98, title: "Project Day 98", folder: "Day 98", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 99, title: "Project Day 99", folder: "Day 99", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
            { day: 100, title: "Master Project", folder: "Day 100", level: "Capstone", tech: ["HTML", "CSS", "JS", "React"] }
        ];

        // Initialize progress service and load completed days
        let completedDays = [];
        if (progressService) {
            try {
                completedDays = await progressService.initialize(user);
                // Listen for real-time updates
                progressService.listenToUpdates((updatedDays) => {
                    completedDays = updatedDays;
                    renderProgressGrid();
                    updateStats();
                    checkAchievements();
                });
            } catch (error) {
                console.warn('Failed to initialize progress service:', error);
                completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]');
            }
        } else {
            completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]');
        }

        // Initial achievement check
        checkAchievements();

        function checkAchievements() {
            if (achievementService) {
                achievementService.checkAchievements({
                    totalCompleted: completedDays.length,
                    currentStreak: calculateStreak(completedDays),
                    techCount: 3 // Hardcoded estimate for now
                });
            }
        }

        function calculateStreak(days) {
            if (!days.length) return 0;
            const sorted = [...days].sort((a, b) => b - a);
            let streak = 0;
            // Simple streak logic for day numbers (assumes consecutive days are consecutive ints)
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
            updateStats();
        });


        // Initial render
        updateUI();

        function updateUI() {
            if (document.getElementById('progressGrid')) renderProgressGrid();
            if (document.getElementById('completedDays')) updateStats();
            if (document.getElementById('recommendationsGrid')) renderRecommendations();

            // Trigger Neural Nexus analysis
            initializeNeuralNexus(projects);
        }

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
                    // Trigger automated grading
                    Notify.info(`Analyzing Mission ${day} Project...`);
                    const report = await graderService.gradeProject(day);

                    // Show report UI
                    graderUI.showReport(report);

                    if (report.status !== 'PASSED') {
                        Notify.warning('Mission requirements not met. Check report for details.');
                        return; // Prevent completion if failed
                    }

                    Notify.success('Mission Analysis Passed! 🚀');
                } catch (error) {
                    console.error('Grader failed, allowing manual completion fallback:', error);
                }
            }

            if (progressService) {
                await progressService.toggleDay(day);
                completedDays = progressService.getCompletedDays();
            } else {
                if (completedDays.includes(day)) {
                    completedDays = completedDays.filter(d => d !== day);
                } else {
                    completedDays.push(day);
                }
                localStorage.setItem('completedDays', JSON.stringify(completedDays));
            }
            renderProgressGrid();
            updateStats();
        }

        function updateUI() {
            // Update user name
            const userNameElement = document.getElementById('userName');
            if (userNameElement && userStats) {
                userNameElement.textContent = userStats.username || user.email.split('@')[0];
            }

            // Update current day and streak text
            const currentDayElement = document.getElementById('currentDay');
            const streakTextElement = document.getElementById('streakText');
            if (currentDayElement && userStats) {
                currentDayElement.textContent = `Day ${userStats.currentDay}`;
                streakTextElement.textContent = userStats.currentStreak > 0 ? `${userStats.currentStreak} day streak!` : 'Keep building!';
            }

            // Update stats cards
            updateStatsCards();

            // Render progress heatmap
            renderProgressGrid();

            // Achievement Progress logic
            if (achievementService) {
                const nextAchievement = achievementService.getNextAchievement('milestone', completedCount);
                const nextEl = document.getElementById('nextAchievementLabel');
                if (nextEl && nextAchievement) {
                    nextEl.textContent = `Next: ${nextAchievement.title}`;
                }
            }
        }

        function updateStatsCards() {
            if (!userStats) return;

            // Progress
            const progressPercentEl = document.getElementById('progressPercent');
            const completedDaysEl = document.getElementById('completedDays');
            const progressBarEl = document.getElementById('progressBar');

            if (progressPercentEl) progressPercentEl.textContent = `${userStats.progressPercent}%`;
            if (completedDaysEl) completedDaysEl.textContent = userStats.completedDays;
            if (progressBarEl) progressBarEl.style.width = `${userStats.progressPercent}%`;

            // Current Streak
            const currentStreakEl = document.getElementById('currentStreak');
            if (currentStreakEl) currentStreakEl.textContent = userStats.currentStreak;

            // Best Streak
            const longestStreakEl = document.getElementById('longestStreak');
            if (longestStreakEl) longestStreakEl.textContent = userStats.longestStreak;

            // Status
            const userStatusEl = document.getElementById('userStatus');
            if (userStatusEl) userStatusEl.textContent = userStats.status;
        }

        function renderRecentProjects() {
            const recentProjectsEl = document.getElementById('recentProjects');
            if (!recentProjectsEl || !userStats) return;

            recentProjectsEl.innerHTML = '';

            if (userStats.recentProjects && userStats.recentProjects.length > 0) {
                userStats.recentProjects.forEach(project => {
                    const projectCard = document.createElement('div');
                    projectCard.className = 'project-card';
                    projectCard.innerHTML = `
                        <h4>Day ${project.day}</h4>
                        <span class="project-tag">Completed</span>
                    `;
                    recentProjectsEl.appendChild(projectCard);
                });
            } else {
                recentProjectsEl.innerHTML = '<p class="text-secondary">No recent projects yet. Start building!</p>';
            }
        }

        async function toggleDay(day) {
            if (completedDays.includes(day)) {
                completedDays = completedDays.filter(d => d !== day);
            } else {
                completedDays.push(day);
            }

            // Update localStorage
            localStorage.setItem('completedDays', JSON.stringify(completedDays));

            // Update Firestore if logged in
            if (!user.isGuest && user.userId) {
                try {
                    await firestoreService.updateCompletedDays(user.userId, completedDays);
                    // Reload stats to get updated streaks
                    userStats = await firestoreService.getUserStats(user.userId);
                    completedDays = userStats.completedDays || [];
                } catch (error) {
                    console.error('Error updating progress in Firestore:', error);
                }
            }

            // Update UI
            updateUI();
        }

        // Profile modal functions
        window.openProfileModal = function() {
            const modal = document.getElementById('profileModal');
            if (modal && userStats) {
                // Populate form with current data
                document.getElementById('profileUsername').value = userStats.username || '';
                document.getElementById('profileBio').value = userStats.bio || '';
                document.getElementById('profileLocation').value = userStats.location || '';
                document.getElementById('profileWebsite').value = userStats.website || '';
                document.getElementById('profileGithub').value = userStats.github || '';
                modal.style.display = 'flex';
            }
        };

        window.closeProfileModal = function() {
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
                    alert('Error updating profile. Please try again.');
                }
            });
        }



        async function initializeNeuralNexus(projectsList) {
            if (!window.AI || !window.NexusHUD) return;

            // Start progress analysis
            const progressData = JSON.parse(localStorage.getItem('progressData')) || {};
            const completedDaysList = Object.keys(progressData).map(Number);

            const analysis = await window.AI.analyzeProgress({
                completedDays: completedDaysList,
                techDistribution: calculateTechDistribution(completedDaysList, projectsList),
                currentStreak: parseInt(document.getElementById('currentStreak')?.textContent || 0)
            });

            // Update HUD with AI advice for the next mission
            const maxDay = completedDaysList.length > 0 ? Math.max(...completedDaysList) : 0;
            const nextDayNumber = maxDay + 1;
            const adviceText = await window.AI.getHUDAdvice(nextDayNumber);

            if (window.NexusHUD) {
                window.NexusHUD.updateAITip(adviceText);
            }

            // Show AI notification
            if (window.Notify) {
                window.Notify.show({
                    title: 'Neural Nexus Link Established',
                    message: 'AI Pair-Programmer is online. Click the brain icon for insights.',
                    type: 'neural',
                    duration: 5000
                });
            }
        }

        function calculateTechDistribution(completed, allProjects) {
            const dist = {};
            completed.forEach(dayNumber => {
                const project = allProjects.find(p => p.day === dayNumber);
                if (project && project.tech) {
                    project.tech.forEach(t => {
                        dist[t] = (dist[t] || 0) + 1;
                    });
                }
            });
            return dist;
        }
    }
});
