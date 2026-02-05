
// Import project data
import { allProjects, folderMap } from '../../data/projects.js';

const REPO_URL = "https://github.com/Shubham-cyber-prog/100-Days-Of-Web-Development-ECWoC26/tree/main/public";

function getDifficulty(day) {
    if (day <= 30) return "BEGINNER";
    if (day <= 60) return "INTERMEDIATE";
    if (day <= 90) return "ADVANCED";
    return "CAPSTONE";
}

function renderProjects(filter = '') {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    let delay = 0;

    const searchTerm = filter.toLowerCase();

    allProjects.forEach(project => {
        const difficulty = getDifficulty(project.day);
        const searchString = `${project.title} ${difficulty} ${project.tech.join(' ')}`.toLowerCase();

        // Filter logic
        if (searchTerm && !searchString.includes(searchTerm)) {
            return;
        }

        let folderName = folderMap[project.day];
        let liveLink = '#';
        let codeLink = '#';
        let isDisabled = false;

        // Path adjustments for root index.html
        if (project.day === 103) {
            liveLink = 'https://100dayswebdevelopment-ecwoc.netlify.app/public/Day%20103/index.html';
            codeLink = `${REPO_URL}/${folderName}`;
            isDisabled = false;
        }
        else if (project.day === 111) {
            liveLink = `public/${folderName}/build/index.html`
            codeLink = `${REPO_URL}/${folderName}`;
            isDisabled = false;
        }
        else if (folderName) {
            liveLink = `public/${folderName}/index.html`;
            codeLink = `${REPO_URL}/${folderName}`;
        }
        else {
            isDisabled = true;
            codeLink = REPO_URL;
        }

        const dayLabel = project.endDay ? `DAYS ${project.day}-${project.endDay}` : `DAY ${project.day}`;

        const card = document.createElement('div');
        card.className = 'card project-card animate-enter';
        card.style.animationDelay = `${Math.min(delay, 1000)}ms`;
        delay += 30;

        const techIconMap = {
            HTML: 'fa-html5',
            CSS: 'fa-css3-alt',
            JS: 'fa-js',
            'Node.js': 'fa-node',
            React: 'fa-react',
            API: 'fa-plug'
        };

        const techTags = project.tech
            ? project.tech.map(t => `
        <span class="tech-tag">
            <i class="fa-brands ${techIconMap[t] || 'fa-code'}"></i>
            ${t}
        </span>
      `).join('')
            : '';


        card.innerHTML = `
            <div class="card-top">
                <span class="text-flame" style="font-size: var(--text-xs); font-weight: bold; letter-spacing: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; max-width: calc(100% - 40px);">
                    ${difficulty} • ${dayLabel}
                </span>
                <button class="code-chip" type="button" aria-label="View Code" title="View Code">&lt;/&gt;</button>
            </div>
            <div class="card-divider"></div>
            <h3 class="project-title" style="font-size: var(--text-lg); margin-bottom: 0.5rem; line-height: 1.3;">
                ${project.title}
            </h3>
            <div class="tech-stack" style="margin-bottom: 0.5rem;">
                ${techTags}
            </div>
            ${isDisabled ? `<div class="card-hint muted">Pending</div>` : ''}
        `;

        const codeChip = card.querySelector('.code-chip');
        codeChip.onclick = (e) => {
            e.stopPropagation();
            window.open(codeLink, '_blank');
        };

        if (!isDisabled) {
            card.onclick = () => {
                window.open(liveLink, '_blank');
            };
        } else {
            card.classList.add('is-disabled');
        }

        setupTiltEffect(card);
        grid.appendChild(card);
    });

    if (grid.children.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <p>No projects found matching "${filter}"</p>
            </div>
        `;
    }
}

/**
 * Applies a 3D Tilt effect based on cursor position.
 */
function setupTiltEffect(card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPct = x / rect.width;
        const yPct = y / rect.height;

        const rotateY = (xPct - 0.5) * 12;
        const rotateX = (0.5 - yPct) * 12;

        card.style.setProperty('--rx', `${rotateX}deg`);
        card.style.setProperty('--ry', `${rotateY}deg`);
        card.style.setProperty('--tx', `${(xPct - 0.5) * 5}px`);
        card.style.setProperty('--ty', `${(yPct - 0.5) * 5}px`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--tx', '0px');
        card.style.setProperty('--ty', '0px');
    });
}

// Search Functionality
const searchInput = document.getElementById('projectSearch');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        renderProjects(e.target.value);
    });
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    // Check if we already have the grid (in case script runs late)
    if (document.getElementById('projectsGrid')) {
        renderProjects();
    }
});
