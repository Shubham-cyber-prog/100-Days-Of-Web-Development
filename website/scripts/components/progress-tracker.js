/**
 * Progress Tracker Component - GitHub Style Heatmap
 * Interactive progress visualization for 100 Days Challenge
 */

class ProgressTracker {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = this.loadProgressData();
        this.currentStreak = 0;
        this.totalDays = 0;
        this.init();
    }

    init() {
        this.render();
        this.calculateStats();
        this.bindEvents();
    }

    loadProgressData() {
        const saved = localStorage.getItem('progressData');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Generate sample data for demo
        const data = {};
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 100);
        
        for (let i = 0; i < 100; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];
            
            // Random activity level (0-4)
            const activity = Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0;
            data[dateStr] = activity;
        }
        
        return data;
    }

    saveProgressData() {
        localStorage.setItem('progressData', JSON.stringify(this.data));
    }

    render() {
        this.container.innerHTML = `
            <div class="progress-tracker">
                <div class="tracker-header">
                    <h3>Progress Heatmap</h3>
                    <div class="tracker-stats">
                        <div class="stat">
                            <span class="stat-value" id="total-days">0</span>
                            <span class="stat-label">Days</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value" id="current-streak">0</span>
                            <span class="stat-label">Streak</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value" id="completion-rate">0%</span>
                            <span class="stat-label">Complete</span>
                        </div>
                    </div>
                </div>
                
                <div class="heatmap-container">
                    <div class="heatmap-grid" id="heatmap-grid"></div>
                    <div class="heatmap-legend">
                        <span>Less</span>
                        <div class="legend-colors">
                            <div class="legend-color" data-level="0"></div>
                            <div class="legend-color" data-level="1"></div>
                            <div class="legend-color" data-level="2"></div>
                            <div class="legend-color" data-level="3"></div>
                            <div class="legend-color" data-level="4"></div>
                        </div>
                        <span>More</span>
                    </div>
                </div>
                
                <div class="quick-actions">
                    <button class="btn-track" onclick="progressTracker.markToday()">
                        Mark Today Complete
                    </button>
                    <button class="btn-reset" onclick="progressTracker.resetProgress()">
                        Reset Progress
                    </button>
                </div>
            </div>
        `;

        this.renderHeatmap();
        this.addStyles();
    }

    renderHeatmap() {
        const grid = document.getElementById('heatmap-grid');
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 99); // Last 100 days

        let html = '';
        
        for (let i = 0; i < 100; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];
            const activity = this.data[dateStr] || 0;
            
            html += `
                <div class="heatmap-cell" 
                     data-date="${dateStr}" 
                     data-level="${activity}"
                     title="${this.formatDate(date)} - ${this.getActivityText(activity)}">
                </div>
            `;
        }
        
        grid.innerHTML = html;
    }

    calculateStats() {
        const dates = Object.keys(this.data);
        this.totalDays = dates.filter(date => this.data[date] > 0).length;
        
        // Calculate current streak
        this.currentStreak = 0;
        const today = new Date();
        let checkDate = new Date(today);
        
        while (checkDate >= new Date(today.getTime() - 100 * 24 * 60 * 60 * 1000)) {
            const dateStr = checkDate.toISOString().split('T')[0];
            if (this.data[dateStr] > 0) {
                this.currentStreak++;
            } else {
                break;
            }
            checkDate.setDate(checkDate.getDate() - 1);
        }
        
        const completionRate = Math.round((this.totalDays / 100) * 100);
        
        // Update UI
        document.getElementById('total-days').textContent = this.totalDays;
        document.getElementById('current-streak').textContent = this.currentStreak;
        document.getElementById('completion-rate').textContent = completionRate + '%';
    }

    markToday() {
        const today = new Date().toISOString().split('T')[0];
        this.data[today] = Math.min((this.data[today] || 0) + 1, 4);
        this.saveProgressData();
        this.renderHeatmap();
        this.calculateStats();
        
        // Show success message
        this.showNotification('Day marked complete! 🎉');
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress?')) {
            this.data = {};
            this.saveProgressData();
            this.renderHeatmap();
            this.calculateStats();
            this.showNotification('Progress reset successfully');
        }
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    getActivityText(level) {
        const texts = [
            'No activity',
            'Low activity',
            'Medium activity', 
            'High activity',
            'Very high activity'
        ];
        return texts[level] || 'No activity';
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'progress-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    bindEvents() {
        // Click on cells to toggle activity
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('heatmap-cell')) {
                const date = e.target.dataset.date;
                const currentLevel = parseInt(e.target.dataset.level);
                this.data[date] = (currentLevel + 1) % 5;
                this.saveProgressData();
                this.renderHeatmap();
                this.calculateStats();
            }
        });
    }

    addStyles() {
        if (document.getElementById('progress-tracker-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'progress-tracker-styles';
        style.textContent = `
            .progress-tracker {
                background: var(--bg-glass-panel);
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-lg);
                padding: var(--space-6);
                margin: var(--space-6) 0;
            }
            
            .tracker-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: var(--space-4);
            }
            
            .tracker-header h3 {
                color: var(--text-primary);
                font-size: var(--text-lg);
                font-weight: var(--weight-bold);
            }
            
            .tracker-stats {
                display: flex;
                gap: var(--space-4);
            }
            
            .stat {
                text-align: center;
            }
            
            .stat-value {
                display: block;
                font-size: var(--text-xl);
                font-weight: var(--weight-bold);
                color: var(--accent-core);
            }
            
            .stat-label {
                font-size: var(--text-xs);
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .heatmap-container {
                margin: var(--space-4) 0;
            }
            
            .heatmap-grid {
                display: grid;
                grid-template-columns: repeat(20, 1fr);
                gap: 3px;
                margin-bottom: var(--space-3);
            }
            
            .heatmap-cell {
                width: 12px;
                height: 12px;
                border-radius: 2px;
                cursor: pointer;
                transition: all 0.2s ease;
                background: var(--bg-void);
                border: 1px solid var(--glass-border);
            }
            
            .heatmap-cell:hover {
                transform: scale(1.2);
                border-color: var(--accent-core);
            }
            
            .heatmap-cell[data-level="0"] {
                background: rgba(255, 255, 255, 0.1);
            }
            
            .heatmap-cell[data-level="1"] {
                background: rgba(102, 126, 234, 0.3);
            }
            
            .heatmap-cell[data-level="2"] {
                background: rgba(102, 126, 234, 0.5);
            }
            
            .heatmap-cell[data-level="3"] {
                background: rgba(102, 126, 234, 0.7);
            }
            
            .heatmap-cell[data-level="4"] {
                background: rgba(102, 126, 234, 1);
                box-shadow: 0 0 8px rgba(102, 126, 234, 0.5);
            }
            
            .heatmap-legend {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: var(--space-2);
                font-size: var(--text-xs);
                color: var(--text-secondary);
            }
            
            .legend-colors {
                display: flex;
                gap: 2px;
            }
            
            .legend-color {
                width: 10px;
                height: 10px;
                border-radius: 2px;
            }
            
            .legend-color[data-level="0"] { background: rgba(255, 255, 255, 0.1); }
            .legend-color[data-level="1"] { background: rgba(102, 126, 234, 0.3); }
            .legend-color[data-level="2"] { background: rgba(102, 126, 234, 0.5); }
            .legend-color[data-level="3"] { background: rgba(102, 126, 234, 0.7); }
            .legend-color[data-level="4"] { background: rgba(102, 126, 234, 1); }
            
            .quick-actions {
                display: flex;
                gap: var(--space-3);
                margin-top: var(--space-4);
            }
            
            .btn-track, .btn-reset {
                padding: 0.5rem 1rem;
                border-radius: var(--radius-md);
                border: none;
                cursor: pointer;
                font-weight: var(--weight-medium);
                transition: all 0.2s ease;
            }
            
            .btn-track {
                background: var(--accent-core);
                color: white;
            }
            
            .btn-track:hover {
                background: var(--accent-glow);
                transform: translateY(-1px);
            }
            
            .btn-reset {
                background: rgba(255, 255, 255, 0.1);
                color: var(--text-secondary);
                border: 1px solid var(--glass-border);
            }
            
            .btn-reset:hover {
                background: rgba(255, 255, 255, 0.2);
                color: var(--text-primary);
            }
            
            .progress-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--accent-core);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-lg);
                transform: translateX(100%);
                transition: transform 0.3s ease;
                z-index: 10000;
            }
            
            .progress-notification.show {
                transform: translateX(0);
            }
            
            @media (max-width: 768px) {
                .tracker-header {
                    flex-direction: column;
                    gap: var(--space-3);
                }
                
                .heatmap-grid {
                    grid-template-columns: repeat(10, 1fr);
                }
                
                .quick-actions {
                    flex-direction: column;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('progress-tracker-container')) {
        window.progressTracker = new ProgressTracker('progress-tracker-container');
    }
});