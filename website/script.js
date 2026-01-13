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

const grid = document.getElementById('projects-grid');
const repoBaseUrl = "https://github.com/Shubham-cyber-prog/100-days-of-web-development/tree/main/public/";
const liveBaseUrl = "../public/";

// Filter state
let currentFilters = {
    search: '',
    difficulty: 'All',
    tech: ['HTML', 'CSS', 'JS']
};

// Completed days tracking
let completedDays = [];

// localStorage functions
function getCompletedDays() {
    const stored = localStorage.getItem('completedDays');
    return stored ? JSON.parse(stored) : [];
}

function saveCompletedDays(days) {
    localStorage.setItem('completedDays', JSON.stringify(days));
}

// Event listeners for filters
document.getElementById('projectSearch').addEventListener('input', (e) => {
    currentFilters.search = e.target.value.toLowerCase();
    renderProjects();
});

document.getElementById('difficultyFilter').addEventListener('change', (e) => {
    currentFilters.difficulty = e.target.value;
    renderProjects();
});

document.querySelectorAll('.tech-checkboxes input').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        currentFilters.tech = Array.from(document.querySelectorAll('.tech-checkboxes input:checked')).map(cb => cb.value);
        renderProjects();
    });
});

// Clear search button
document.getElementById('clearSearch').addEventListener('click', () => {
    document.getElementById('projectSearch').value = '';
    currentFilters.search = '';
    renderProjects();
});

// Clear filters button
document.getElementById('clearFilters').addEventListener('click', () => {
    // Reset difficulty filter
    document.getElementById('difficultyFilter').value = 'All';
    currentFilters.difficulty = 'All';

    // Reset tech checkboxes
    document.querySelectorAll('.tech-checkboxes input').forEach(checkbox => {
        checkbox.checked = checkbox.value === 'HTML' || checkbox.value === 'CSS' || checkbox.value === 'JS';
    });
    currentFilters.tech = ['HTML', 'CSS', 'JS'];

    // Reset search
    document.getElementById('projectSearch').value = '';
    currentFilters.search = '';

    renderProjects();
});

// Modified renderProjects function
function renderProjects() {
    grid.innerHTML = '';

    let filteredProjects = projects;

    // Apply difficulty filter
    if (currentFilters.difficulty !== 'All') {
        filteredProjects = filteredProjects.filter(p => p.level === currentFilters.difficulty);
    }

    // Apply tech filter
    if (currentFilters.tech.length > 0) {
        filteredProjects = filteredProjects.filter(p =>
            p.tech && p.tech.some(t => currentFilters.tech.includes(t))
        );
    }

    // Apply search filter
    if (currentFilters.search) {
        filteredProjects = filteredProjects.filter(p =>
            p.title.toLowerCase().includes(currentFilters.search) ||
            p.day.toString().includes(currentFilters.search) ||
            (p.tech && p.tech.some(t => t.toLowerCase().includes(currentFilters.search)))
        );
    }

    // Update results count
    const resultsCountEl = document.getElementById('resultsCount');
    if (resultsCountEl) {
        resultsCountEl.textContent = `Showing ${filteredProjects.length} of ${projects.length} projects`;
    }

    // Ensure sorted by day
    filteredProjects.sort((a, b) => a.day - b.day);

    filteredProjects.forEach(project => {
        const isCompleted = completedDays.includes(project.day);
        const card = document.createElement('div');
        card.className = `project-card ${isCompleted ? 'completed' : ''}`;
        card.innerHTML = `
            <a class="code-chip" href="${repoBaseUrl}${project.folder}" target="_blank" aria-label="View Code">&lt;/&gt;</a>
            <div class="card-header">
                <label class="completion-checkbox">
                    <input type="checkbox" data-day="${project.day}" ${isCompleted ? 'checked' : ''}>
                    <span class="checkmark">${isCompleted ? '✓' : ''}</span>
                </label>
                <span class="day-number">Day ${project.day}</span>
                <span class="badge">${project.level}</span>
            </div>
            <h3>${project.title}</h3>
            <p>${project.tech ? project.tech.join(', ') : 'HTML, CSS, JS'}</p>
            <div class="card-actions">
                <a href="${liveBaseUrl}${project.folder}/index.html" target="_blank" class="btn-small">Live Demo</a>
                <a href="${repoBaseUrl}${project.folder}" target="_blank" class="btn-small outline">View Code</a>
            </div>
        `;

        const codeChip = card.querySelector('.code-chip');
        codeChip.addEventListener('click', (e) => {
            e.stopPropagation();
            window.open(`${repoBaseUrl}${project.folder}`, '_blank');
        });

        card.addEventListener('click', (e) => {
            if (e.target.closest('.completion-checkbox') || e.target.closest('.code-chip')) {
                return;
            }
            window.open(`${liveBaseUrl}${project.folder}/index.html`, '_blank');
        });

        grid.appendChild(card);
    });
}

// Event listener for completion checkboxes
document.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox' && e.target.hasAttribute('data-day')) {
        const day = parseInt(e.target.getAttribute('data-day'));
        const isChecked = e.target.checked;

        if (isChecked) {
            if (!completedDays.includes(day)) {
                completedDays.push(day);
            }
        } else {
            completedDays = completedDays.filter(d => d !== day);
        }

        saveCompletedDays(completedDays);
        renderProjects(); // Re-render to update styles
    }
});

// Initialize completed days from localStorage
completedDays = getCompletedDays();

// Initial Render
renderProjects();
