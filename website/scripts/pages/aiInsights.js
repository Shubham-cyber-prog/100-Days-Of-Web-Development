/**
 * AI Insights Page Orchestrator
 * Coordinates AI service with visualizations
 * Issue #1117
 */

import { AIService } from '../core/aiService.js';
import { Viz } from '../components/Visualizer.js';

class AIInsightsPage {
    constructor() {
        this.ai = AIService;
        this.viz = Viz;
        this.isLoading = true;
        this.userData = null;
        this.settings = this.loadSettings();

        this.init();
    }

    /**
     * Initialize the page
     */
    async init() {
        // Check API status
        this.checkAPIStatus();

        // Load user data
        await this.loadUserData();

        // Render all components
        await this.renderAll();

        // Setup event listeners
        this.setupEventListeners();
    }

    /**
     * Load settings from localStorage
     */
    loadSettings() {
        const defaults = {
            'ai-enabled': true,
            'burnout-alerts': true,
            'notifications': false
        };

        const saved = localStorage.getItem('ai-settings');
        if (saved) {
            try {
                return { ...defaults, ...JSON.parse(saved) };
            } catch (e) {
                return defaults;
            }
        }
        return defaults;
    }

    /**
     * Save settings to localStorage
     */
    saveSettings() {
        localStorage.setItem('ai-settings', JSON.stringify(this.settings));
    }

    /**
     * Check and display API status
     */
    async checkAPIStatus() {
        const dot = document.getElementById('api-status-dot');
        const text = document.getElementById('api-status-text');

        // Check if API key is configured
        const hasKey = await this.ai.hasValidKey();

        if (hasKey) {
            dot.classList.remove('offline');
            text.textContent = 'Gemini API Connected';
        } else {
            dot.classList.add('offline');
            text.textContent = 'Using Local Analysis';
        }
    }

    /**
     * Load user progress data
     */
    async loadUserData() {
        // Try to get from localStorage/IndexedDB
        const savedProgress = localStorage.getItem('progress-data');
        
        if (savedProgress) {
            try {
                this.userData = JSON.parse(savedProgress);
                return;
            } catch (e) {
                console.warn('Failed to parse saved progress');
            }
        }

        // Generate sample data for demo
        this.userData = this.generateSampleData();
    }

    /**
     * Generate sample user data for demo purposes
     */
    generateSampleData() {
        // Simulate completed days
        const completedDays = [];
        const completedCount = Math.floor(Math.random() * 30) + 20; // 20-50 days
        
        for (let i = 1; i <= completedCount; i++) {
            completedDays.push(i);
        }

        // Generate activity log
        const activityLog = [];
        const baseDate = new Date();
        baseDate.setDate(baseDate.getDate() - 60);

        completedDays.forEach(dayNum => {
            const date = new Date(baseDate);
            date.setDate(date.getDate() + Math.floor(dayNum * 1.5));
            
            activityLog.push({
                date: date.toISOString(),
                type: 'completion',
                dayNumber: dayNum,
                duration: Math.floor(Math.random() * 120) + 30 // 30-150 minutes
            });
        });

        // Calculate current streak
        let streak = 0;
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        for (let i = activityLog.length - 1; i >= 0; i--) {
            const activityDate = new Date(activityLog[i].date).toDateString();
            if (activityDate === today || activityDate === yesterday) {
                streak++;
            } else {
                break;
            }
        }

        // Tech stack distribution based on completed days
        const techStack = {
            'HTML': 35,
            'CSS': 30,
            'JavaScript': 25,
            'React': 5,
            'Node.js': 3,
            'APIs': 2
        };

        return {
            completedDays,
            totalCompleted: completedDays.length,
            currentStreak: streak || Math.floor(Math.random() * 10) + 1,
            longestStreak: Math.floor(Math.random() * 15) + streak,
            activityLog,
            techStack,
            startDate: baseDate.toISOString(),
            lastActive: new Date().toISOString(),
            averageSessionDuration: 45,
            totalTimeSpent: completedDays.length * 45
        };
    }

    /**
     * Render all components
     */
    async renderAll() {
        await Promise.all([
            this.renderHeatmap(),
            this.renderStats(),
            this.renderRadar(),
            this.renderAIInsights(),
            this.renderBurnoutAlert(),
            this.renderRecommendation(),
            this.renderFocusAreas(),
            this.renderSettingsToggles()
        ]);

        this.isLoading = false;
    }

    /**
     * Render contribution heatmap
     */
    async renderHeatmap() {
        const container = document.getElementById('heatmap-container');
        
        try {
            this.viz.createHeatmap('heatmap-container', this.userData.completedDays, {
                startDate: new Date(this.userData.startDate),
                theme: 'dark'
            });
        } catch (error) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <p>Unable to load heatmap</p>
                </div>
            `;
        }
    }

    /**
     * Render stats overview
     */
    async renderStats() {
        this.viz.renderStatsGrid('stats-container', {
            completed: this.userData.totalCompleted,
            streak: this.userData.currentStreak,
            longestStreak: this.userData.longestStreak,
            totalTime: `${Math.floor(this.userData.totalTimeSpent / 60)}h`,
            averagePerDay: this.userData.averageSessionDuration
        });
    }

    /**
     * Render tech stack radar chart
     */
    async renderRadar() {
        const container = document.getElementById('radar-container');
        
        try {
            this.viz.createRadarChart('radar-container', this.userData.techStack, {
                size: 280,
                maxValue: 40
            });
        } catch (error) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <p>Unable to load radar chart</p>
                </div>
            `;
        }
    }

    /**
     * Render AI insights
     */
    async renderAIInsights() {
        const container = document.getElementById('ai-insights-container');

        if (!this.settings['ai-enabled']) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <p>AI Analysis is disabled</p>
                    <p style="font-size: 12px; margin-top: 8px;">Enable it in settings to get personalized insights</p>
                </div>
            `;
            return;
        }

        try {
            const insights = await this.ai.analyzeProgress(this.userData);
            this.viz.renderAIInsights('ai-insights-container', insights);
        } catch (error) {
            console.error('AI insights error:', error);
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <p>Unable to generate AI insights</p>
                    <p style="font-size: 12px; margin-top: 8px;">${error.message}</p>
                </div>
            `;
        }
    }

    /**
     * Render burnout alert
     */
    async renderBurnoutAlert() {
        const container = document.getElementById('burnout-container');

        if (!this.settings['burnout-alerts']) {
            container.innerHTML = `
                <div style="text-align: center; padding: 20px; color: var(--text-secondary);">
                    <p style="font-size: 13px;">Burnout alerts are disabled</p>
                </div>
            `;
            return;
        }

        try {
            const burnoutData = await this.ai.analyzeBurnoutRisk(this.userData);
            this.viz.renderBurnoutAlert('burnout-container', burnoutData);
        } catch (error) {
            console.error('Burnout analysis error:', error);
            container.innerHTML = '';
        }
    }

    /**
     * Render next project recommendation
     */
    async renderRecommendation() {
        const container = document.getElementById('recommendation-container');

        try {
            const insights = await this.ai.analyzeProgress(this.userData);
            const nextDay = this.userData.totalCompleted + 1;

            container.innerHTML = `
                <div class="recommendation-project">
                    <div class="project-name">Day ${nextDay} Project</div>
                    <p class="project-reason">${insights.nextRecommendedProject || 'Continue your journey with the next challenge!'}</p>
                </div>
                <button class="start-project-btn" onclick="window.location.href='projects.html?day=${nextDay}'">
                    Start Day ${nextDay} →
                </button>
            `;
        } catch (error) {
            const nextDay = this.userData.totalCompleted + 1;
            container.innerHTML = `
                <div class="recommendation-project">
                    <div class="project-name">Day ${nextDay} Project</div>
                    <p class="project-reason">Ready for your next challenge!</p>
                </div>
                <button class="start-project-btn" onclick="window.location.href='projects.html?day=${nextDay}'">
                    Start Day ${nextDay} →
                </button>
            `;
        }
    }

    /**
     * Render focus areas
     */
    async renderFocusAreas() {
        const container = document.getElementById('focus-areas-container');

        try {
            const techAnalysis = await this.ai.analyzeTechStack(this.userData);
            const focusAreas = techAnalysis.recommendations || [
                { name: 'JavaScript Fundamentals', priority: 'high' },
                { name: 'CSS Layouts', priority: 'medium' },
                { name: 'API Integration', priority: 'low' }
            ];

            container.innerHTML = focusAreas.slice(0, 4).map((area, index) => `
                <li class="focus-area-item">
                    <span class="focus-area-priority ${area.priority || 'medium'}">${index + 1}</span>
                    <span class="focus-area-name">${area.name}</span>
                </li>
            `).join('');
        } catch (error) {
            container.innerHTML = `
                <li class="focus-area-item">
                    <span class="focus-area-priority high">1</span>
                    <span class="focus-area-name">JavaScript Fundamentals</span>
                </li>
                <li class="focus-area-item">
                    <span class="focus-area-priority medium">2</span>
                    <span class="focus-area-name">CSS Layouts</span>
                </li>
                <li class="focus-area-item">
                    <span class="focus-area-priority low">3</span>
                    <span class="focus-area-name">API Integration</span>
                </li>
            `;
        }
    }

    /**
     * Render settings toggles state
     */
    renderSettingsToggles() {
        const toggles = document.querySelectorAll('.setting-toggle');
        
        toggles.forEach(toggle => {
            const setting = toggle.dataset.setting;
            if (this.settings[setting]) {
                toggle.classList.add('active');
            } else {
                toggle.classList.remove('active');
            }
        });
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Refresh insights button
        const refreshBtn = document.getElementById('refresh-insights-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', async () => {
                refreshBtn.classList.add('loading');
                
                // Clear cache and refresh
                this.ai.clearCache();
                await this.renderAIInsights();
                await this.renderBurnoutAlert();
                
                refreshBtn.classList.remove('loading');
            });
        }

        // Settings toggles
        const toggles = document.querySelectorAll('.setting-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const setting = toggle.dataset.setting;
                this.settings[setting] = !this.settings[setting];
                toggle.classList.toggle('active');
                this.saveSettings();

                // Re-render affected components
                if (setting === 'ai-enabled') {
                    this.renderAIInsights();
                } else if (setting === 'burnout-alerts') {
                    this.renderBurnoutAlert();
                }
            });
        });

        // Start project button (delegated)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('start-project-btn')) {
                const url = e.target.getAttribute('onclick');
                if (url) {
                    // Already handled by onclick
                }
            }
        });
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    window.aiInsightsPage = new AIInsightsPage();
});

export { AIInsightsPage };
