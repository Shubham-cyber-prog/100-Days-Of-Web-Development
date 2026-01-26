/**
 * ProjectModal.js
 * Main logic for the Project Showcase & Code Preview Modal
 */

import { CodeViewer } from './CodeViewer.js';

export class ProjectModal {
    constructor() {
        this.overlay = null;
        this.modal = null;
        this.iframe = null;
        this.codeContainer = null;
        this.codePre = null;
        this.activeTab = 'preview';
        this.activeFile = 'index.html';
        this.currentProject = null;

        this.init();
    }

    init() {
        // Create modal structure if not exists
        if (document.querySelector('.project-modal-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'project-modal-overlay';
        overlay.innerHTML = `
            <div class="project-modal">
                <div class="modal-header">
                    <div class="modal-title-area">
                        <span class="modal-badge" id="modalDifficulty">Beginner</span>
                        <h2 class="modal-title" id="modalTitle">Project Title</h2>
                    </div>
                    <button class="modal-close" id="modalClose">&times;</button>
                </div>
                
                <div class="modal-toolbar">
                    <div class="toolbar-group">
                        <div class="modal-tabs">
                            <button class="modal-tab active" data-tab="preview">Preview</button>
                            <button class="modal-tab" data-tab="code">Source Code</button>
                        </div>
                        <div class="viewport-toggles" id="viewportToggles">
                            <button class="viewport-btn active" data-view="desktop" title="Desktop View"><i class="fas fa-desktop"></i></button>
                            <button class="viewport-btn" data-view="tablet" title="Tablet View"><i class="fas fa-tablet-alt"></i></button>
                            <button class="viewport-btn" data-view="mobile" title="Mobile View"><i class="fas fa-mobile-alt"></i></button>
                        </div>
                    </div>
                    
                    <div class="toolbar-group">
                        <a href="#" target="_blank" class="view-action-btn" id="modalGhLink">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                        <a href="#" target="_blank" class="view-action-btn" id="modalNewTabLink">
                            <i class="fas fa-external-link-alt"></i> External
                        </a>
                        <button class="favorite-btn" id="modalFavBtn">
                            <i class="far fa-star"></i>
                        </button>
                    </div>
                </div>

                <div class="modal-content">
                    <div class="preview-container active" id="previewContainer">
                        <iframe src="" class="preview-iframe" id="modalIframe"></iframe>
                    </div>
                    
                    <div class="code-container" id="codeContainer">
                        <div class="code-header">
                            <div class="code-file-tab active" data-file="index.html">index.html</div>
                            <div class="code-file-tab" data-file="style.css">style.css</div>
                            <div class="code-file-tab" data-file="script.js">script.js</div>
                        </div>
                        <button class="code-copy-btn" id="modalCopyBtn">Copy Code</button>
                        <pre class="code-content" id="modalCodePre"></pre>
                    </div>
                </div>

                <div class="modal-footer">
                    <div class="meta-item"><i class="fas fa-calendar-alt"></i> <span id="modalDay">Day 01</span></div>
                    <div class="meta-item"><i class="fas fa-clock"></i> <span id="modalTime">Est. 2 hours</span></div>
                    <div class="meta-item"><i class="fas fa-code-branch"></i> <span id="modalTech">HTML, CSS, JS</span></div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        this.overlay = overlay;
        this.modal = overlay.querySelector('.project-modal');
        this.iframe = overlay.querySelector('#modalIframe');
        this.codeContainer = overlay.querySelector('#codeContainer');
        this.codePre = overlay.querySelector('#modalCodePre');

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close modal
        this.overlay.querySelector('#modalClose').addEventListener('click', () => this.hide());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.hide();
        });

        // Tab switching
        this.overlay.querySelectorAll('.modal-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Viewport toggles
        this.overlay.querySelectorAll('.viewport-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchViewport(btn.dataset.view));
        });

        // Code file switching
        this.overlay.querySelectorAll('.code-file-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchCodeFile(tab.dataset.file));
        });

        // Copy code
        this.overlay.querySelector('#modalCopyBtn').addEventListener('click', () => this.copyCode());

        // Favorite
        this.overlay.querySelector('#modalFavBtn').addEventListener('click', () => this.toggleFavorite());
    }

    show(project) {
        this.currentProject = project;

        // Load metadata
        this.overlay.querySelector('#modalTitle').textContent = project.title;
        this.overlay.querySelector('#modalDifficulty').textContent = project.difficulty;
        this.overlay.querySelector('#modalDay').textContent = `Day ${project.day}`;
        this.overlay.querySelector('#modalTime').textContent = project.time || 'Est. 1-2 hours';
        this.overlay.querySelector('#modalTech').textContent = project.tech.join(', ');

        // Set links
        this.overlay.querySelector('#modalNewTabLink').href = project.liveLink;
        this.overlay.querySelector('#modalGhLink').href = project.codeLink;

        // Set iframe
        this.iframe.src = project.liveLink;

        // Reset state
        this.switchTab('preview');
        this.switchViewport('desktop');
        this.updateFavoriteIcon();

        // Show overlay
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.overlay.classList.remove('active');
        this.iframe.src = 'about:blank';
        document.body.style.overflow = '';
    }

    switchTab(tab) {
        this.activeTab = tab;

        // Update tab buttons
        this.overlay.querySelectorAll('.modal-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.tab === tab);
        });

        // Toggle containers
        this.overlay.querySelector('#previewContainer').classList.toggle('active', tab === 'preview');
        this.overlay.querySelector('#codeContainer').classList.toggle('show', tab === 'code');

        // Pre-load code if switching to code tab
        if (tab === 'code') {
            this.switchCodeFile('index.html');
        }
    }

    async switchCodeFile(fileName) {
        this.activeFile = fileName;

        // Update file tabs
        this.overlay.querySelectorAll('.code-file-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.file === fileName);
        });

        this.codePre.textContent = 'Loading source code...';

        const content = await CodeViewer.fetchFile(this.currentProject.liveLink, fileName);
        const lang = fileName.split('.').pop();
        this.codePre.innerHTML = CodeViewer.highlight(content, lang);
    }

    switchViewport(view) {
        const container = this.overlay.querySelector('.preview-container');
        container.className = 'preview-container active viewport-' + view;

        this.overlay.querySelectorAll('.viewport-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
    }

    async copyCode() {
        const text = this.codePre.textContent;
        try {
            await navigator.clipboard.writeText(text);
            const btn = this.overlay.querySelector('#modalCopyBtn');
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.style.background = '#10B981';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy code', err);
        }
    }

    toggleFavorite() {
        if (!this.currentProject) return;

        const favorites = JSON.parse(localStorage.getItem('zenith_favorites') || '[]');
        const index = favorites.findIndex(f => f.day === this.currentProject.day);

        if (index === -1) {
            favorites.push({
                day: this.currentProject.day,
                title: this.currentProject.title,
                difficulty: this.currentProject.difficulty,
                tech: this.currentProject.tech,
                liveLink: this.currentProject.liveLink,
                codeLink: this.currentProject.codeLink
            });
            if (window.Notify) window.Notify.success('Added to favorites!');
        } else {
            favorites.splice(index, 1);
            if (window.Notify) window.Notify.info('Removed from favorites');
        }

        localStorage.setItem('zenith_favorites', JSON.stringify(favorites));
        this.updateFavoriteIcon();
    }

    updateFavoriteIcon() {
        const favorites = JSON.parse(localStorage.getItem('zenith_favorites') || '[]');
        const isFav = favorites.some(f => f.day === this.currentProject?.day);
        const btn = this.overlay.querySelector('#modalFavBtn');
        const icon = btn.querySelector('i');

        if (isFav) {
            btn.classList.add('active');
            icon.className = 'fas fa-star';
        } else {
            btn.classList.remove('active');
            icon.className = 'far fa-star';
        }
    }
}

// Create singleton instance and export
export const projectModal = new ProjectModal();
window.projectModal = projectModal;
