/**
 * CareerCoach.js
 * Visualizes career AI coaching and interactive session feedback.
 * Provides real-time advice on career paths and skill alignment.
 */

export class CareerCoach {
    constructor(container) {
        this.container = typeof container === 'string' ? document.getElementById(container) : container;
        this._injectStyles();
    }

    render(advice = [], readiness = {}) {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="career-coach-card">
                <div class="coach-header">
                    <div class="coach-avatar">
                        <i class="fas fa-brain-circuit"></i>
                    </div>
                    <div class="coach-title">
                        <h3>AI Career Architect</h3>
                        <p>${readiness.level || 'Analyzing Profile...'}</p>
                    </div>
                </div>

                <div class="readiness-meter">
                    <div class="meter-bar" style="width: ${readiness.overall || 0}%"></div>
                    <span>Score: ${readiness.overall || 0} / 100</span>
                </div>

                <div class="advice-list">
                    <h4>Action Items:</h4>
                    ${advice.length > 0 ? advice.map(item => `
                        <div class="advice-item" style="border-left: 4px solid ${item.color || '#6d28d9'}">
                            <i class="${item.icon || 'fas fa-arrow-right'}"></i>
                            <div class="advice-content">
                                <p class="type">${item.type || 'Suggestion'}</p>
                                <p class="message">${item.message}</p>
                            </div>
                        </div>
                    `).join('') : '<p class="empty">Analyzing your projects for career insights...</p>'}
                </div>

                <div class="coach-actions">
                    <button class="btn-coach share-linkedin"><i class="fab fa-linkedin"></i> Optimize LinkedIn</button>
                    <button class="btn-coach build-resume"><i class="fas fa-file-invoice"></i> Generate Resume</button>
                </div>
            </div>
        `;
    }

    _injectStyles() {
        if (document.getElementById('career-coach-styles')) return;
        const style = document.createElement('style');
        style.id = 'career-coach-styles';
        style.textContent = `
            .career-coach-card {
                background: rgba(15, 23, 42, 0.9);
                border: 1px solid rgba(148, 163, 184, 0.1);
                border-radius: 1rem;
                padding: 1.5rem;
                backdrop-filter: blur(12px);
                color: #f8fafc;
                font-family: inherit;
                position: relative;
                overflow: hidden;
            }
            .coach-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
            .coach-avatar { 
                width: 48px; height: 48px; background: linear-gradient(135deg, #6d28d9, #9333ea);
                border-radius: 50%; display: flex; align-items: center; justify-content: center;
                font-size: 1.5rem; box-shadow: 0 0 15px rgba(109, 40, 217, 0.4);
            }
            .coach-title h3 { margin: 0; font-size: 1.25rem; color: #fff; }
            .coach-title p { margin: 0; font-size: 0.875rem; color: #94a3b8; }
            .readiness-meter { height: 12px; background: #1e293b; border-radius: 6px; margin-bottom: 1.5rem; position: relative; }
            .meter-bar { height: 100%; height: 100%; background: linear-gradient(90deg, #6d28d9, #06b6d4); border-radius: 6px; transition: width 0.8s ease; }
            .readiness-meter span { position: absolute; right: 0; bottom: -18px; font-size: 0.75rem; color: #94a3b8; }
            .advice-list h4 { font-size: 0.9rem; margin-bottom: 1rem; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.05em; }
            .advice-item { display: flex; gap: 1rem; background: #1e293b; padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.75rem; transition: transform 0.2s; cursor: pointer; }
            .advice-item:hover { transform: translateX(5px); background: #334155; }
            .advice-item i { font-size: 1.25rem; color: #6d28d9; margin-top: 0.25rem; }
            .advice-content .type { font-size: 0.7rem; font-weight: bold; text-transform: uppercase; margin-bottom: 0.25rem; color: #94a3b8; }
            .advice-content .message { font-size: 0.875rem; margin: 0; line-height: 1.5; color: #e2e8f0; }
            .coach-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1.5rem; }
            .btn-coach { padding: 0.75rem; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: background 0.3s; }
            .share-linkedin { background: #0077b5; color: white; }
            .build-resume { background: #6d28d9; color: white; }
            .btn-coach:hover { opacity: 0.9; }
        `;
        document.head.appendChild(style);
    }
}
