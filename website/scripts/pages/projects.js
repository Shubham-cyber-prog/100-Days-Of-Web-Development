const REPO_URL = "https://github.com/Shubham-cyber-prog/100-Days-Of-Web-Development-ECWoC26/tree/main/public";

// Import components with error handling
let projectModal = null;
let Notify = null;

// Dynamically import modules to prevent blocking if they fail
(async () => {
    try {
        const modalModule = await import('../components/ProjectModal.js');
        projectModal = modalModule.projectModal;
    } catch (error) {
        console.warn('Could not load ProjectModal:', error.message);
    }
    
    try {
        const notifyModule = await import('../core/Notify.js');
        Notify = notifyModule.Notify;
    } catch (error) {
        console.warn('Could not load Notify:', error.message);
    }
})();

let allProjects = [];

async function loadProjects() {
    try {
        const response = await fetch('../../data/projects.json');
        if (!response.ok) throw new Error('Failed to load projects');
        allProjects = await response.json();
        renderProjects();
    } catch (error) {
        console.error('Error loading projects:', error);
        if (Notify) {
            Notify.error('Failed to load mission data.');
        }
    }
}

function renderProjects(filter = 'All') {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';

    let delay = 0;

    allProjects.forEach(project => {
        const difficulty = project.level;

        if (filter !== 'All' && difficulty.toLowerCase() !== filter.toLowerCase()) return;

        let folderName = project.folder;
        let liveLink = '#';
        let codeLink = '#';
        let isDisabled = false;

        /* SPECIAL CASE: README TOOL KIT (DAY 103) */
        if (project.day === 103) {
            liveLink = 'https://100dayswebdevelopment-ecwoc.netlify.app/public/Day%20103/index.html';
            codeLink = `${REPO_URL}/${folderName}`;
            isDisabled = false;
        }
        else if (project.day === 111) {
            liveLink = `../../public/${folderName}/build/index.html`
            codeLink = `${REPO_URL}/${folderName}`;
            isDisabled = false;
        }
        else if (folderName) {
            liveLink = `../../public/${folderName}/index.html`;
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

        // --- PROJECT SHOWCASE INTEGRATION ---
        if (!isDisabled) {
            card.addEventListener('click', (e) => {
                // Prepare project data for modal
                const projectData = {
                    ...project,
                    difficulty,
                    liveLink,
                    codeLink,
                    time: project.day <= 30 ? '1-2 hours' : project.day <= 60 ? '3-5 hours' : '8+ hours'
                };

                if (projectModal) {
                    projectModal.show(projectData);
                } else {
                    // Fallback: open in new tab if modal is not available
                    window.open(liveLink, '_blank');
                }
            });
        } else {
            card.classList.add('is-disabled');
        }
        // --- END INTEGRATION ---

        setupTiltEffect(card);
        grid.appendChild(card);
    });
}

// Ensure the path to 404.html is correct relative to your current folder
async function handleProjectClick(event, url) {
    event.preventDefault();

    const card = event.currentTarget;
    const originalHTML = card.innerHTML;

    try {
        // Show loading state
        card.style.opacity = '0.6';
        card.style.pointerEvents = 'none';

        // Use 'no-cache' to ensure the browser doesn't give a fake "OK" 
        const response = await fetch(url, {
            method: 'HEAD',
            cache: 'no-cache',
            signal: AbortSignal.timeout(5000) // 5 second timeout
        });

        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';

        if (response.ok) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            // Show error message
            const errorMsg = `
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
                            background: rgba(0,0,0,0.8); display: flex; align-items: center; 
                            justify-content: center; border-radius: 8px; color: #fee; font-size: 14px; padding: 16px;">
                    Project not available (HTTP ${response.status})
                </div>
            `;
            showErrorToast('Project folder not found. Showing available projects.');
            window.location.href = './404.html';
        }
    } catch (error) {
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';

        console.error('Project click error:', error);

        // Provide specific error messages
        const errorMsg = error.name === 'AbortError'
            ? 'Request timeout. Project server may be down.'
            : error instanceof TypeError
                ? 'Network error. Please check your connection.'
                : 'Unable to access project.';

        showErrorToast(errorMsg);
        window.location.href = './404.html';
    }
}

/**
 * Display user-friendly error toast notification
 */
function showErrorToast(message) {
    const existingToast = document.querySelector('.error-toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.setAttribute('role', 'alert');
    toast.textContent = '⚠️ ' + message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #c33;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 9999;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(toast);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}
/**
 * Applies a 3D Tilt effect based on cursor position.
 * Uses CSS variables --rx and --ry to control rotation.
 */
function setupTiltEffect(card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate percentage (0 to 1)
        const xPct = x / rect.width;
        const yPct = y / rect.height;

        // Calculate rotation (Max tilt: 10deg)
        // Y-axis rotation is based on X position (left/right)
        // X-axis rotation is based on Y position (up/down) - Reversed for natural feel
        const rotateY = (xPct - 0.5) * 12;
        const rotateX = (0.5 - yPct) * 12;

        card.style.setProperty('--rx', `${rotateX}deg`);
        card.style.setProperty('--ry', `${rotateY}deg`);
        card.style.setProperty('--tx', `${(xPct - 0.5) * 5}px`); // Subtle translation
        card.style.setProperty('--ty', `${(yPct - 0.5) * 5}px`);
    });

    card.addEventListener('mouseleave', () => {
        // Reset to center
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--tx', '0px');
        card.style.setProperty('--ty', '0px');
    });
}

// Search Functionality
document.getElementById('projectSearch').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(term)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Tab Filtering
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.category);
    });
});

// Initial Render
// Module scripts execute after DOM is parsed, so we can call directly
loadProjects();

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
