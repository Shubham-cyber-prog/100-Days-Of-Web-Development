/**
 * LinkedInOptimizer.js
 * Analyzes projects and profiles for job market alignment.
 * Generates LinkedIn post templates and SEO-friendly headlines.
 */

export class LinkedInOptimizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render(analysis = []) {
        if (!this.container) return;

        const defaultAnalysis = [
            { title: 'Headline Optimization', score: 85, advice: 'Add "Aspiring Full-Stack Developer" to attract recruiters.' },
            { title: 'Project Descriptions', score: 40, advice: 'Your Day 25 project needs more technical keywords like "async/await".' },
            { title: 'Skill Endorsements', score: 65, advice: 'Request endorsements for React from peers in the Global Arena.' }
        ];

        const items = analysis.length > 0 ? analysis : defaultAnalysis;

        this.container.innerHTML = items.map(item => `
            <div class="optimization-item">
                <div class="opt-header">
                    <span class="opt-title">${item.title}</span>
                    <span class="opt-score" style="color: ${this._getScoreColor(item.score)}">${item.score}%</span>
                </div>
                <div class="opt-bar-bg"><div class="opt-bar-fill" style="width: ${item.score}%; background: ${this._getScoreColor(item.score)}"></div></div>
                <p class="opt-advice">${item.advice}</p>
            </div>
        `).join('') + `
            <div class="template-generator mt-1">
                <h4><i class="fas fa-magic"></i> Generate LinkedIn Post</h4>
                <select id="post-type" class="form-select mt-0-5">
                    <option value="project">New Project Achievement</option>
                    <option value="milestone">100 Days Milestone</option>
                    <option value="skill">New Skill Badge</option>
                </select>
                <button class="btn-outline w-100 mt-0-5" onclick="alert('Template copied to clipboard! (Mock)')">Copy Generated Draft</button>
            </div>
        `;
        this._injectStyles();
    }

    _getScoreColor(score) {
        if (score > 80) return '#22c55e';
        if (score > 60) return '#eab308';
        return '#ef4444';
    }

    _injectStyles() {
        if (document.getElementById('linkedin-opt-styles')) return;
        const style = document.createElement('style');
        style.id = 'linkedin-opt-styles';
        style.textContent = `
            .optimization-item { margin-bottom: 1.25rem; }
            .opt-header { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.875rem; }
            .opt-title { font-weight: 600; color: #e2e8f0; }
            .opt-bar-bg { height: 6px; background: #1e293b; border-radius: 3px; overflow: hidden; }
            .opt-bar-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }
            .opt-advice { font-size: 0.8rem; color: #94a3b8; margin: 0.5rem 0 0; line-height: 1.4; }
            .template-generator { background: rgba(0,0,0,0.2); border-radius: 0.5rem; padding: 1rem; border: 1px dashed rgba(255,255,255,0.1); }
            .template-generator h4 { margin: 0 0 0.5rem; font-size: 0.85rem; color: #06b6d4; text-transform: uppercase; }
            .form-select { width: 100%; background: #0f172a; border: 1px solid #334155; color: white; padding: 0.4rem; border-radius: 4px; font-size: 0.8rem; }
        `;
        document.head.appendChild(style);
    }
}
