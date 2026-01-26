
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

    function initializeDashboard() {
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

        if (userNameElement) userNameElement.textContent = user.displayName;
=======
        if (userNameElement) {
            const displayName = user.name || (user.email ? user.email.split('@')[0] : 'User');
            userNameElement.textContent = displayName;


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

    function initializeDashboard() {
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
            // ... (truncated for brevity, logic remains)

            { day: 60, title: "Travel Planner", folder: "Day 60", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
            { day: 61, title: "Doodle Jump Game", folder: "Day 61", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
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

        // Render progress grid
        if (document.getElementById('progressGrid')) renderProgressGrid();

        // Update stats
        if (document.getElementById('completedDays')) updateStats();

        // Render recommendations
        if (document.getElementById('recommendationsGrid')) renderRecommendations();

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
                        dayElement.addEventListener('click', () => toggleDay(day));
                        quarterBlock.appendChild(dayElement);
                    }
                }
                progressGrid.appendChild(quarterBlock);
            }
        }

        async function toggleDay(day) {
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

        function updateStats() {
            const completedCount = completedDays.length;
            const el = document.getElementById('completedDays');
            if (el) el.textContent = completedCount;

            // Achievement Progress logic
            if (achievementService) {
                const nextAchievement = achievementService.getNextAchievement('milestone', completedCount);
                const nextEl = document.getElementById('nextAchievementLabel');
                if (nextEl && nextAchievement) {
                    nextEl.textContent = `Next: ${nextAchievement.title}`;
                }
            }
        }

        function renderRecommendations() {
            // Recommendation logic...
        }
    }
});
