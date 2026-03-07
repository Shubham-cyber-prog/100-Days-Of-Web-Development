/**
 * Zenith Grader UI Component
 * Displays the results of the automated project analysis in a premium Mission Report.
 */

class GraderUI {
    constructor() {
        this.container = null;
    }

    /**
     * Shows the grading report.
     * @param {object} report - The report from GraderService.
     */
    showReport(report) {
        if (this.container) {
            this.container.remove();
        }

        this.container = document.createElement('div');
        this.container.id = 'grader-modal';
        this.container.className = 'grader-overlay';

        const isPassed = report.status === 'PASSED';

        this.container.innerHTML = `
            <div class="grader-content ${isPassed ? 'passed' : 'failed'}">
                <div class="grader-header">
                    <h2>Mission ${report.day} Report</h2>
                    <div class="score-badge ${this.getScoreClass(report.score)}">
                        ${report.score}%
                    </div>
                </div>
                
                <div class="grader-body">
                    <div class="status-banner">
                        <i class="fas ${isPassed ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                        <span>Status: ${report.status}</span>
                    </div>

                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="label">Accessibility</span>
                            <span class="value">${report.summary.accessibility} Issues</span>
                        </div>
                        <div class="stat-item">
                            <span class="label">Performance</span>
                            <span class="value">${report.summary.performance} Issues</span>
                        </div>
                        <div class="stat-item">
                            <span class="label">Architecture</span>
                            <span class="value">${report.summary.semantics} Issues</span>
                        </div>
                    </div>

                    <div class="issues-list">
                        <h3>Detailed Analysis</h3>
                        ${report.issues.length > 0 ? report.issues.map(issue => `
                            <div class="issue-item ${issue.type}">
                                <div class="issue-icon">
                                    <i class="fas ${this.getIssueIcon(issue.type)}"></i>
                                </div>
                                <div class="issue-info">
                                    <p>${issue.message}</p>
                                    ${issue.snippet ? `<code>${this.escapeHTML(issue.snippet)}</code>` : ''}
                                </div>
                            </div>
                        `).join('') : '<p class="all-good">Zero issues detected! Perfect mission execution. 🚀</p>'}
                    </div>
                </div>

                <div class="grader-footer">
                    <button class="btn btn-close" onclick="this.closest('.grader-overlay').remove()">Close Report</button>
                    ${isPassed ? `
                        <button class="btn btn-primary btn-next" onclick="window.location.reload()">Continue Mission</button>
                    ` : `
                        <button class="btn btn-warning btn-retry" onclick="this.closest('.grader-overlay').remove()">Repair Errors</button>
                    `}
                </div>
            </div>
        `;

        this.addStyles();
        document.body.appendChild(this.container);
    }

    getScoreClass(score) {
        if (score >= 90) return 'perfect';
        if (score >= 70) return 'good';
        return 'poor';
    }

    getIssueIcon(type) {
        switch (type) {
            case 'error': return 'fa-times-circle';
            case 'warning': return 'fa-exclamation-circle';
            default: return 'fa-info-circle';
        }
    }

    escapeHTML(str) {
        const p = document.createElement('p');
        p.textContent = str;
        return p.innerHTML;
    }

    addStyles() {
        if (document.getElementById('grader-styles')) return;

        const style = document.createElement('style');
        style.id = 'grader-styles';
        style.textContent = `
            .grader-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(8px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }

            .grader-content {
                background: rgba(30, 30, 40, 0.95);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                width: 90%;
                max-width: 600px;
                max-height: 85vh;
                overflow-y: auto;
                padding: 30px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                position: relative;
            }

            .grader-content.passed { border-top: 5px solid #10b981; }
            .grader-content.failed { border-top: 5px solid #f59e0b; }

            .grader-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
            }

            .score-badge {
                font-size: 2rem;
                font-weight: 800;
                padding: 10px 20px;
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.05);
            }

            .score-badge.perfect { color: #10b981; text-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
            .score-badge.good { color: #3b82f6; }
            .score-badge.poor { color: #f59e0b; }

            .status-banner {
                background: rgba(255, 255, 255, 0.05);
                padding: 15px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 12px;
                font-weight: 600;
                margin-bottom: 20px;
            }

            .stats-grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 15px;
                margin-bottom: 25px;
            }

            .stat-item {
                background: rgba(255, 255, 255, 0.03);
                padding: 15px;
                border-radius: 12px;
                text-align: center;
            }

            .stat-item .label { display: block; font-size: 0.75rem; opacity: 0.6; margin-bottom: 5px; }
            .stat-item .value { font-weight: 700; color: #fff; }

            .issues-list h3 { font-size: 1.1rem; margin-bottom: 15px; opacity: 0.8; }

            .issue-item {
                display: flex;
                gap: 15px;
                padding: 15px;
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.02);
                margin-bottom: 10px;
                border-left: 3px solid transparent;
            }

            .issue-item.error { border-left-color: #ef4444; }
            .issue-item.warning { border-left-color: #f59e0b; }

            .issue-icon { font-size: 1.2rem; }
            .issue-item.error .issue-icon { color: #ef4444; }
            .issue-item.warning .issue-icon { color: #f59e0b; }

            .issue-info p { margin: 0; font-size: 0.9rem; line-height: 1.5; }
            .issue-info code { 
                display: block; 
                margin-top: 8px; 
                background: #000; 
                padding: 5px 10px; 
                border-radius: 4px; 
                font-size: 0.75rem; 
                color: #a78bfa;
            }

            .grader-footer {
                margin-top: 30px;
                display: flex;
                justify-content: flex-end;
                gap: 15px;
            }

            .btn {
                padding: 10px 20px;
                border-radius: 8px;
                border: none;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.2s;
            }

            .btn-close { background: rgba(255, 255, 255, 0.1); color: #fff; }
            .btn-primary { background: #3b82f6; color: #fff; }
            .btn-warning { background: #f59e0b; color: #fff; }

            .all-good { color: #10b981; font-style: italic; text-align: center; padding: 20px; }

            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

export default new GraderUI();
