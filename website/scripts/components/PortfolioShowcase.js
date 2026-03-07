/**
 * PortfolioShowcase.js
 * Generates an interactive preview and full-page showcase for user projects.
 * Features a dynamic masonry layout and professional details.
 */

export class PortfolioShowcase {
    constructor(container) {
        this.container = typeof container === 'string' ? document.getElementById(container) : container;
    }

    render(projects = []) {
        if (!this.container) return;

        const displayedProjects = projects.length > 0 ? projects : [
            { title: 'Project Zero', tags: ['HTML', 'CSS'], repo: 'https://github.com/example/0', preview: 'https://example.com/0' },
            { title: 'Project One', tags: ['JS', 'Logic'], repo: 'https://github.com/example/1', preview: 'https://example.com/1' }
        ];

        this.container.innerHTML = `
            <div class="showcase-header">
                <h2>Project Showcase</h2>
                <div class="showcase-filters">
                    <button class="filter-btn active">All</button>
                    <button class="filter-btn">Frontend</button>
                    <button class="filter-btn">Fullstack</button>
                    <button class="filter-btn">Three.js</button>
                </div>
            </div>
            
            <div class="showcase-grid">
                ${displayedProjects.map(p => `
                    <div class="showcase-item">
                        <div class="item-overlay">
                            <h3>${p.title}</h3>
                            <div class="item-tags">${p.tags?.map(t => `<span class="tag">${t}</span>`).join('') || ''}</div>
                            <div class="item-links">
                                <a href="${p.repo}" target="_blank"><i class="fab fa-github"></i> Source</a>
                                <a href="${p.preview}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        this._injectStyles();
    }

    _injectStyles() {
        if (document.getElementById('showcase-styles')) return;
        const style = document.createElement('style');
        style.id = 'showcase-styles';
        style.textContent = `
            .showcase-header { margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; }
            .showcase-filters { display: flex; gap: 0.75rem; overflow-x: auto; padding-bottom: 0.5rem; }
            .filter-btn { padding: 0.4rem 1rem; background: #1e293b; border: 1px solid #334155; border-radius: 20px; font-size: 0.8rem; cursor: pointer; transition: 0.2s; white-space: nowrap; }
            .filter-btn.active { background: #6d28d9; border-color: #6d28d9; }
            .showcase-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
            .showcase-item { aspect-ratio: 16/9; background: #1e293b; border-radius: 0.75rem; position: relative; overflow: hidden; border: 1px solid rgba(148, 163, 184, 0.1); }
            .item-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 20%, rgba(15, 23, 42, 0.4)); display: flex; flex-direction: column; justify-content: flex-end; padding: 1.25rem; }
            .item-overlay h3 { margin: 0 0 0.5rem; font-size: 1.125rem; }
            .item-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
            .tag { font-size: 0.65rem; padding: 0.25rem 0.6rem; background: rgba(6, 182, 212, 0.1); color: #06b6d4; border-radius: 4px; border: 1px solid rgba(6, 182, 212, 0.2); }
            .item-links { display: flex; gap: 1rem; }
            .item-links a { font-size: 0.8rem; text-decoration: none; color: #cbd5e1; display: flex; align-items: center; gap: 0.4rem; transition: color 0.2s; }
            .item-links a:hover { color: #fff; }
        `;
        document.head.appendChild(style);
    }
}
