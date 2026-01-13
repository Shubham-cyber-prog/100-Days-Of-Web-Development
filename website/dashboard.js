document.addEventListener('DOMContentLoaded', () => {
    // Projects data
    const projects = [
        // BEGINNER (Days 1-30) - Updated to match your actual Day XX folders
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
        { day: 28, title: "Coming Soon", folder: "Day 28", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
        { day: 29, title: "Coming Soon", folder: "Day 29", level: "Beginner", tech: ["HTML", "CSS", "JS"] },
        { day: 30, title: "Coming Soon", folder: "Day 30", level: "Beginner", tech: ["HTML", "CSS", "JS"] },

        // INTERMEDIATE (Days 31-60)
        { day: 31, title: "Bubble Shooter Game", folder: "Day 31", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
        { day: 32, title: "Animated Login Form", folder: "Day 32", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
        { day: 33, title: "Guess the Number Game", folder: "Day 33", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
        { day: 34, title: "Typing Speed Test webapp", folder: "Day 34", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
        { day: 35, title: "Startup Name Generator Web App", folder: "Day 35", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
        { day: 36, title: "Coming Soon", folder: "Day 36", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
        { day: 37, title: "Recipe Finder", folder: "Day 37", level: "Intermediate", tech: ["HTML", "CSS", "JS", "API"] },
        { day: 38, title: "Snake Game", folder: "Day 38", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
        { day: 39, title: "Hangman Game", folder: "Day 39", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
        { day: 40, title: "Simon Say Game", folder: "Day 40", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },
        // Continue pattern for remaining days...
        { day: 60, title: "Coming Soon", folder: "Day 60", level: "Intermediate", tech: ["HTML", "CSS", "JS"] },

        // ADVANCED & CAPSTONE - Follow same pattern
        { day: 61, title: "Doodle Jump Game", folder: "Day 61", level: "Advanced", tech: ["HTML", "CSS", "JS"] },
        // ... add more as you complete them
        { day: 100, title: "Master Project", folder: "Day 100", level: "Capstone", tech: ["HTML", "CSS", "JS", "React"] }
    ];

    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userEmail = localStorage.getItem('userEmail');

    if (!isAuthenticated || !userEmail) {
        window.location.href = 'login.html';
        return;
    }

    // Set user name
    const userNameElement = document.getElementById('userName');
    userNameElement.textContent = userEmail.split('@')[0];

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('completedDays');
        window.location.href = 'login.html';
    });

    // Load completed days from localStorage
    let completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]');

    // Render progress grid
    renderProgressGrid();

    // Update stats
    updateStats();

    // Render recommendations
    renderRecommendations();

    function renderProgressGrid() {
        const progressGrid = document.getElementById('progressGrid');
        progressGrid.innerHTML = '';

        for (let day = 1; day <= 100; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = `progress-day ${completedDays.includes(day) ? 'completed' : ''}`;
            dayElement.textContent = day;
            dayElement.addEventListener('click', () => toggleDay(day));
            progressGrid.appendChild(dayElement);
        }
    }

    function toggleDay(day) {
        if (completedDays.includes(day)) {
            completedDays = completedDays.filter(d => d !== day);
        } else {
            completedDays.push(day);
        }
        localStorage.setItem('completedDays', JSON.stringify(completedDays));
        renderProgressGrid();
        updateStats();
        renderRecommendations();
    }

    function updateStats() {
        const completedCount = completedDays.length;
        document.getElementById('completedDays').textContent = completedCount;

        // Calculate current streak
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        for (let day = 1; day <= 100; day++) {
            if (completedDays.includes(day)) {
                tempStreak++;
                currentStreak = tempStreak;
            } else {
                if (tempStreak > longestStreak) longestStreak = tempStreak;
                tempStreak = 0;
            }
        }
        if (tempStreak > longestStreak) longestStreak = tempStreak;

        document.getElementById('currentStreak').textContent = currentStreak;
        document.getElementById('longestStreak').textContent = longestStreak;
    }

    function renderRecommendations() {
        const recommendationsGrid = document.getElementById('recommendationsGrid');
        recommendationsGrid.innerHTML = '';

        // Get next incomplete days
        const nextDays = [];
        for (let day = 1; day <= 100; day++) {
            if (!completedDays.includes(day)) {
                nextDays.push(day);
                if (nextDays.length >= 6) break;
            }
        }

        // Get project details for recommendations
        nextDays.forEach(day => {
            const project = projects.find(p => p.day === day);
            if (project) {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <div class="card-header">
                        <span class="day-number">Day ${project.day}</span>
                        <span class="badge">${project.level}</span>
                    </div>
                    <h3>${project.title}</h3>
                    <p>${project.tech ? project.tech.join(', ') : 'HTML, CSS, JS'}</p>
                    <div class="card-actions">
                        <a href="../public/${project.folder}/index.html" target="_blank" class="btn-small">Live Demo</a>
                        <a href="https://github.com/Shubham-cyber-prog/100-days-of-web-development/tree/main/public/${project.folder}" target="_blank" class="btn-small outline">View Code</a>
                    </div>
                `;
                recommendationsGrid.appendChild(card);
            }
        });
    }
});
