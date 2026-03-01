/**
 * Progress Dashboard Component
 * Displays user progress, streaks, and earned badges
 * Integrated with progressService, streakService, and achievementService
 */

import { progressService } from '../core/progressService.js';
import { streakService } from '../core/streakService.js';
import { achievementService } from '../core/achievementService.js';
import { achievementsData, achievementCategories, rarityConfig } from '../data/achievements.js';

class ProgressDashboard {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            showProgressBar: true,
            showStreakCounter: true,
            showBadges: true,
            maxBadges: 6,
            compact: false,
            ...options
        };
        this.listeners = [];
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
        this.setupListeners();
    }

    /**
     * Get current progress data from all services
     */
    getProgressData() {
        const completedDays = progressService.getCompletedDays();
        
        // Get streak stats
        let streakStats = { currentStreak: 0, longestStreak: 0 };
        try {
            streakStats = streakService.getStreakStats ? 
                streakService.getStreakStats() : 
                streakService.streakStats || { currentStreak: 0, longestStreak: 0 };
        } catch (e) {
            console.warn('Could not get streak stats:', e);
        }

        // Get achievements
        let achievements = [];
        try {
            achievements = achievementService.getAllAchievements ?
                achievementService.getAllAchievements() : [];
        } catch (e) {
            console.warn('Could not get achievements:', e);
        }

        return {
            completedDays,
            totalCompleted: completedDays.length,
            completionPercentage: Math.round((completedDays.length / 100) * 100),
            currentStreak: streakStats.currentStreak || 0,
            longestStreak: streakStats.longestStreak || 0,
            achievements,
            unlockedAchievements: achievements.filter(a => a.unlocked),
            totalPoints: achievementService.getTotalPoints ?
                achievementService.getTotalPoints() : 0
        };
    }

    /**
     * Render the dashboard
     */
    render() {
        if (!this.container) {
            console.warn('ProgressDashboard: Container not found');
            return;
        }

        const data = this.getProgressData();
        const { showProgressBar, showStreakCounter, showBadges, maxBadges, compact } = this.options;

        let html = `
            <div class="progress-dashboard ${compact ? 'compact' : ''}">
                ${showProgressBar ? this.renderProgressBar(data) : ''}
                ${showStreakCounter ? this.renderStreakCounter(data) : ''}
                ${showBadges ? this.renderBadges(data, maxBadges) : ''}
            </div>
        `;

        this.container.innerHTML = html;
        this.injectStyles();
    }

    /**
     * Render progress bar section
     */
    renderProgressBar(data) {
        const percentage = data.completionPercentage;
        const daysText = data.totalCompleted === 1 ? 'day' : 'days';
        
        return `
            <div class="dashboard-section progress-section">
                <div class="section-header">
                    <span class="section-title">Progress</span>
                    <span class="progress-text">${data.totalCompleted}/100 ${daysText}</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${percentage}%">
                        <div class="progress-glow"></div>
                    </div>
                    <span class="progress-percentage">${percentage}%</span>
                </div>
            </div>
        `;
    }

    /**
     * Render streak counter section
     */
    renderStreakCounter(data) {
        return `
            <div class="dashboard-section streak-section">
                <div class="streak-item current">
                    <div class="streak-icon">🔥</div>
                    <div class="streak-info">
                        <span class="streak-value">${data.currentStreak}</span>
                        <span class="streak-label">Current Streak</span>
                    </div>
                </div>
                <div class="streak-divider"></div>
                <div class="streak-item longest">
                    <div class="streak-icon">⚡</div>
                    <div class="streak-info">
                        <span class="streak-value">${data.longestStreak}</span>
                        <span class="streak-label">Longest Streak</span>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render badges section
     */
    renderBadges(data, maxBadges) {
        const unlockedBadges = data.unlockedAchievements.slice(0, maxBadges);
        const lockedCount = data.achievements.length - data.unlockedAchievements.length;
        
        let badgesHtml = unlockedBadges.map(badge => {
            const rarity = rarityConfig[badge.rarity] || rarityConfig.common;
            return `
                <div class="badge-item" 
                     data-badge-id="${badge.id}"
                     data-rarity="${badge.rarity}"
                     style="--rarity-color: ${rarity.color}">
                    <div class="badge-icon">${badge.icon}</div>
                    <div class="badge-tooltip">
                        <div class="tooltip-title">${badge.title}</div>
                        <div class="tooltip-desc">${badge.description}</div>
                        <div class="tooltip-rarity" style="color: ${rarity.color}">${rarity.label}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Add "view all" badge if there are more achievements
        if (data.achievements.length > maxBadges) {
            badgesHtml += `
                <div class="badge-item more-badges" onclick="window.location.href='/website/pages/achievements.html'">
                    <div class="badge-icon">+${data.achievements.length - maxBadges}</div>
                    <div class="badge-tooltip">
                        <div class="tooltip-title">View All</div>
                        <div class="tooltip-desc">${lockedCount} more badges to unlock</div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="dashboard-section badges-section">
                <div class="section-header">
                    <span class="section-title">Badges</span>
                    <span class="badges-count">${data.unlockedAchievements.length}/${data.achievements.length}</span>
                </div>
                <div class="badges-grid">
                    ${badgesHtml || '<div class="no-badges">Complete challenges to earn badges!</div>'}
                </div>
            </div>
        `;
    }

    /**
     * Bind click events
     */
    bindEvents() {
        // Badge hover effects are handled by CSS
        // Add click handlers if needed
    }

    /**
     * Set up listeners for progress updates
     */
    setupListeners() {
        // Listen for progress updates
        const progressHandler = () => this.refresh();
        window.addEventListener('progressUpdated', progressHandler);
        
        // Listen for activity updates
        const activityHandler = () => this.refresh();
        window.addEventListener('activityUpdated', activityHandler);

        this.listeners.push(() => {
            window.removeEventListener('progressUpdated', progressHandler);
            window.removeEventListener('activityUpdated', activityHandler);
        });
    }

    /**
     * Refresh the dashboard with latest data
     */
    refresh() {
        this.render();
        this.bindEvents();
    }

    /**
     * Update the dashboard (alias for refresh)
     */
    update() {
        this.refresh();
    }

    /**
     * Inject CSS styles
     */
    injectStyles() {
        if (document.getElementById('progress-dashboard-styles')) return;

        const style = document.createElement('style');
        style.id = 'progress-dashboard-styles';
        style.textContent = `
            .progress-dashboard {
                background: var(--bg-glass-panel, rgba(255, 255, 255, 0.05));
                border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.1));
                border-radius: var(--radius-lg, 12px);
                padding: var(--space-4, 16px);
                display: flex;
                flex-direction: column;
                gap: var(--space-4, 16px);
            }

            .progress-dashboard.compact {
                padding: var(--space-3, 12px);
                gap: var(--space-3, 12px);
            }

            .dashboard-section {
                width: 100%;
            }

            .section-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: var(--space-2, 8px);
            }

            .section-title {
                font-size: var(--text-sm, 0.875rem);
                font-weight: var(--weight-semibold, 600);
                color: var(--text-secondary, #9CA3AF);
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            /* Progress Bar Styles */
            .progress-section .progress-text {
                font-size: var(--text-sm, 0.875rem);
                color: var(--text-primary, #fff);
                font-weight: var(--weight-medium, 500);
            }

            .progress-bar-container {
                position: relative;
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                overflow: visible;
            }

            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, var(--accent-core, #FF7A18) 0%, var(--accent-glow, #FF9F5A) 100%);
                border-radius: 4px;
                position: relative;
                transition: width 0.5s ease;
            }

            .progress-glow {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 20px;
                height: 20px;
                background: var(--accent-glow, #FF9F5A);
                border-radius: 50%;
                filter: blur(8px);
                opacity: 0.8;
            }

            .progress-percentage {
                position: absolute;
                right: -40px;
                top: 50%;
                transform: translateY(-50%);
                font-size: var(--text-xs, 0.75rem);
                color: var(--text-secondary, #9CA3AF);
            }

            /* Streak Counter Styles */
            .streak-section {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: var(--space-4, 16px);
            }

            .streak-item {
                display: flex;
                align-items: center;
                gap: var(--space-2, 8px);
            }

            .streak-icon {
                font-size: 1.5rem;
            }

            .streak-info {
                display: flex;
                flex-direction: column;
            }

            .streak-value {
                font-size: var(--text-xl, 1.25rem);
                font-weight: var(--weight-bold, 700);
                color: var(--text-primary, #fff);
                line-height: 1;
            }

            .streak-label {
                font-size: var(--text-xs, 0.75rem);
                color: var(--text-tertiary, #6B7280);
            }

            .streak-divider {
                width: 1px;
                height: 30px;
                background: var(--glass-border, rgba(255, 255, 255, 0.1));
            }

            /* Badges Grid Styles */
            .badges-count {
                font-size: var(--text-sm, 0.875rem);
                color: var(--text-secondary, #9CA3AF);
            }

            .badges-grid {
                display: flex;
                flex-wrap: wrap;
                gap: var(--space-2, 8px);
            }

            .badge-item {
                position: relative;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid var(--rarity-color, rgba(255, 255, 255, 0.1));
                border-radius: var(--radius-md, 8px);
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .badge-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }

            .badge-item.unlocked {
                border-color: var(--rarity-color);
                background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%);
            }

            .badge-icon {
                font-size: 1.25rem;
            }

            .badge-item.more-badges {
                background: rgba(255, 255, 255, 0.1);
                border-color: var(--glass-border, rgba(255, 255, 255, 0.1));
                font-size: var(--text-xs, 0.75rem);
                color: var(--text-secondary, #9CA3AF);
                font-weight: var(--weight-medium, 500);
            }

            /* Badge Tooltip */
            .badge-tooltip {
                position: absolute;
                bottom: calc(100% + 10px);
                left: 50%;
                transform: translateX(-50%) scale(0.9);
                background: var(--bg-surface, #1F2937);
                border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.1));
                border-radius: var(--radius-md, 8px);
                padding: var(--space-3, 12px);
                min-width: 150px;
                opacity: 0;
                visibility: hidden;
                transition: all 0.2s ease;
                z-index: 100;
                pointer-events: none;
            }

            .badge-item:hover .badge-tooltip {
                opacity: 1;
                visibility: visible;
                transform: translateX(-50%) scale(1);
            }

            .tooltip-title {
                font-size: var(--text-sm, 0.875rem);
                font-weight: var(--weight-semibold, 600);
                color: var(--text-primary, #fff);
                margin-bottom: 4px;
            }

            .tooltip-desc {
                font-size: var(--text-xs, 0.75rem);
                color: var(--text-secondary, #9CA3AF);
                margin-bottom: 4px;
            }

            .tooltip-rarity {
                font-size: var(--text-xs, 0.75rem);
                font-weight: var(--weight-medium, 500);
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .no-badges {
                font-size: var(--text-sm, 0.875rem);
                color: var(--text-tertiary, #6B7280);
                font-style: italic;
            }

            /* Compact Mode */
            .progress-dashboard.compact .badge-item {
                width: 32px;
                height: 32px;
            }

            .progress-dashboard.compact .badge-icon {
                font-size: 1rem;
            }

            .progress-dashboard.compact .streak-icon {
                font-size: 1.25rem;
            }

            .progress-dashboard.compact .streak-value {
                font-size: var(--text-lg, 1.125rem);
            }

            /* Dark/Light mode adjustments */
            body.light-mode .progress-dashboard {
                background: rgba(255, 255, 255, 0.7);
                border-color: rgba(0, 0, 0, 0.1);
            }

            body.light-mode .progress-bar-container {
                background: rgba(0, 0, 0, 0.1);
            }

            body.light-mode .streak-divider {
                background: rgba(0, 0, 0, 0.1);
            }

            body.light-mode .badge-item {
                background: rgba(0, 0, 0, 0.05);
            }

            body.light-mode .badge-tooltip {
                background: #fff;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            }

            /* Responsive */
            @media (max-width: 640px) {
                .streak-section {
                    flex-direction: column;
                    gap: var(--space-3, 12px);
                }

                .streak-divider {
                    width: 60px;
                    height: 1px;
                }

                .progress-dashboard {
                    padding: var(--space-3, 12px);
                }
            }
        `;

        document.head.appendChild(style);
    }

    /**
     * Clean up listeners
     */
    destroy() {
        this.listeners.forEach(unsubscribe => unsubscribe());
        this.listeners = [];
    }
}

// Export the class
export { ProgressDashboard };

// Also make it available globally for easy use
window.ProgressDashboard = ProgressDashboard;
