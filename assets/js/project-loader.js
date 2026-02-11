/**
 * Dynamic Project Gallery Loader
 * 
 * Fetches project metadata from JSON and dynamically renders
 * project cards to the gallery container.
 */

(function () {
    'use strict';

    const PROJECTS_JSON_URL = './assets/data/projects.json';
    const REPO_URL = 'https://github.com/Shubham-cyber-prog/100-Days-Of-Web-Development-ECWoC26/tree/main/public';
    const GALLERY_ID = 'project-gallery';
    const SEARCH_ID = 'projectSearch';

    let allProjects = [];

    /**
     * Tech icon mapping for Font Awesome
     */
    const techIconMap = {
        'HTML': 'fa-html5',
        'CSS': 'fa-css3-alt',
        'JS': 'fa-js',
        'Node.js': 'fa-node',
        'React': 'fa-react',
        'API': 'fa-plug',
        'Firebase': 'fa-fire',
        'MongoDB': 'fa-database',
        'TypeScript': 'fa-code',
        'Next.js': 'fa-n',
        'Socket.io': 'fa-plug',
        'Canvas': 'fa-paint-brush'
    };

    /**
     * Fetch projects data from JSON
     */
    async function fetchProjects() {
        try {
            const response = await fetch(PROJECTS_JSON_URL);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Failed to load projects:', error);
            return [];
        }
    }

    /**
     * Create a project card element
     */
    function createProjectCard(project, delay) {
        const card = document.createElement('div');
        card.className = 'card project-card animate-enter';
        card.style.animationDelay = `${Math.min(delay, 1000)}ms`;

        const dayLabel = `DAY ${project.day}`;
        const isDisabled = !project.hasIndex;

        // Generate live and code links
        let liveLink = `public/${encodeURIComponent(project.folder)}/index.html`;
        const codeLink = `${REPO_URL}/${encodeURIComponent(project.folder)}`;

        // Special cases
        if (project.day === 103) {
            liveLink = 'https://100dayswebdevelopment-ecwoc.netlify.app/public/Day%20103/index.html';
        } else if (project.day === 111) {
            liveLink = `public/${project.folder}/day-111/build/index.html`;
        }

        // Tech tags HTML
        const techTags = (project.tech || [])
            .map(t => `
                <span class="tech-tag">
                    <i class="fa-brands ${techIconMap[t] || 'fa-code'}"></i>
                    ${t}
                </span>
            `).join('');

        card.innerHTML = `
            <div class="card-top">
                <span class="text-flame" style="font-size: var(--text-xs); font-weight: bold; letter-spacing: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; max-width: calc(100% - 40px);">
                    ${project.level} • ${dayLabel}
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
            ${isDisabled ? '<div class="card-hint muted">Pending</div>' : ''}
        `;

        // Code button click
        const codeChip = card.querySelector('.code-chip');
        codeChip.onclick = (e) => {
            e.stopPropagation();
            window.open(codeLink, '_blank');
        };

        // Card click for live demo
        if (!isDisabled) {
            card.onclick = () => window.open(liveLink, '_blank');
            card.style.cursor = 'pointer';
        } else {
            card.classList.add('is-disabled');
        }

        setupTiltEffect(card);
        return card;
    }

    /**
     * Applies a 3D Tilt effect based on cursor position
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

    /**
     * Render projects to the gallery
     */
    function renderProjects(filter = '') {
        const gallery = document.getElementById(GALLERY_ID);
        if (!gallery) return;

        gallery.innerHTML = '';
        const searchTerm = filter.toLowerCase();
        let delay = 0;
        let count = 0;

        for (const project of allProjects) {
            const searchString = `${project.title} ${project.level} ${(project.tech || []).join(' ')}`.toLowerCase();

            if (searchTerm && !searchString.includes(searchTerm)) {
                continue;
            }

            const card = createProjectCard(project, delay);
            gallery.appendChild(card);
            delay += 30;
            count++;
        }

        if (count === 0) {
            gallery.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <p>No projects found matching "${filter}"</p>
                </div>
            `;
        }
    }

    /**
     * Show loading state
     */
    function showLoading() {
        const gallery = document.getElementById(GALLERY_ID);
        if (gallery) {
            gallery.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <p>Loading projects...</p>
                </div>
            `;
        }
    }

    /**
     * Show error state
     */
    function showError(message) {
        const gallery = document.getElementById(GALLERY_ID);
        if (gallery) {
            gallery.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <p>Failed to load projects: ${message}</p>
                </div>
            `;
        }
    }

    /**
     * Initialize the project loader
     */
    async function init() {
        showLoading();

        allProjects = await fetchProjects();

        if (allProjects.length === 0) {
            showError('No projects data available');
            return;
        }

        renderProjects();

        // Setup search functionality
        const searchInput = document.getElementById(SEARCH_ID);
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                renderProjects(e.target.value);
            });
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
