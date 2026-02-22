/**
 * Visualizer Component - Chart & Heatmap Library
 * GitHub-style heatmap and Tech Stack Radar charts
 * Issue #1117
 */

class Visualizer {
    constructor() {
        this.chartInstances = new Map();
        this.colors = {
            // GitHub-style heatmap colors (light to dark)
            heatmap: [
                '#161b22', // Empty (dark theme)
                '#0e4429', // Level 1
                '#006d32', // Level 2
                '#26a641', // Level 3
                '#39d353'  // Level 4
            ],
            heatmapLight: [
                '#ebedf0', // Empty (light theme)
                '#9be9a8', // Level 1
                '#40c463', // Level 2
                '#30a14e', // Level 3
                '#216e39'  // Level 4
            ],
            // Radar chart colors
            radar: {
                fill: 'rgba(88, 166, 255, 0.25)',
                stroke: '#58a6ff',
                pointFill: '#58a6ff',
                grid: 'rgba(255, 255, 255, 0.1)'
            }
        };

        this.injectStyles();
    }

    /**
     * Inject component styles
     */
    injectStyles() {
        if (document.getElementById('visualizer-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'visualizer-styles';
        styles.textContent = `
            /* Heatmap Styles */
            .viz-heatmap-container {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                overflow-x: auto;
            }

            .viz-heatmap {
                display: inline-block;
            }

            .viz-heatmap-grid {
                display: flex;
                gap: 3px;
            }

            .viz-heatmap-week {
                display: flex;
                flex-direction: column;
                gap: 3px;
            }

            .viz-heatmap-day {
                width: 12px;
                height: 12px;
                border-radius: 2px;
                cursor: pointer;
                transition: transform 0.1s, box-shadow 0.1s;
            }

            .viz-heatmap-day:hover {
                transform: scale(1.2);
                box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
            }

            .viz-heatmap-months {
                display: flex;
                margin-bottom: 8px;
                font-size: 10px;
                color: #8b949e;
            }

            .viz-heatmap-month {
                flex: 1;
                text-align: left;
            }

            .viz-heatmap-weekdays {
                display: flex;
                flex-direction: column;
                gap: 3px;
                margin-right: 8px;
                font-size: 9px;
                color: #8b949e;
            }

            .viz-heatmap-weekday {
                height: 12px;
                display: flex;
                align-items: center;
            }

            .viz-heatmap-legend {
                display: flex;
                align-items: center;
                gap: 4px;
                margin-top: 12px;
                font-size: 11px;
                color: #8b949e;
            }

            .viz-heatmap-legend-item {
                width: 12px;
                height: 12px;
                border-radius: 2px;
            }

            .viz-heatmap-tooltip {
                position: absolute;
                background: #24292f;
                color: #fff;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                white-space: nowrap;
            }

            /* Radar Chart Styles */
            .viz-radar-container {
                position: relative;
                width: 100%;
                max-width: 400px;
                aspect-ratio: 1;
            }

            .viz-radar-svg {
                width: 100%;
                height: 100%;
            }

            .viz-radar-label {
                font-size: 11px;
                fill: #8b949e;
                font-weight: 500;
            }

            .viz-radar-value {
                font-size: 10px;
                fill: #58a6ff;
            }

            /* Stats Cards */
            .viz-stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 12px;
                margin-top: 16px;
            }

            .viz-stat-card {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                padding: 12px;
                text-align: center;
            }

            .viz-stat-value {
                font-size: 24px;
                font-weight: 700;
                color: #58a6ff;
            }

            .viz-stat-label {
                font-size: 11px;
                color: #8b949e;
                margin-top: 4px;
            }

            /* Burnout Alert */
            .viz-burnout-alert {
                background: linear-gradient(135deg, rgba(248, 81, 73, 0.1) 0%, rgba(210, 153, 34, 0.1) 100%);
                border: 1px solid rgba(248, 81, 73, 0.3);
                border-radius: 8px;
                padding: 16px;
                margin-top: 16px;
            }

            .viz-burnout-alert.low {
                border-color: rgba(63, 185, 80, 0.3);
                background: linear-gradient(135deg, rgba(63, 185, 80, 0.1) 0%, rgba(63, 185, 80, 0.05) 100%);
            }

            .viz-burnout-alert.medium {
                border-color: rgba(210, 153, 34, 0.3);
                background: linear-gradient(135deg, rgba(210, 153, 34, 0.1) 0%, rgba(210, 153, 34, 0.05) 100%);
            }

            .viz-burnout-alert.high {
                border-color: rgba(248, 81, 73, 0.3);
                background: linear-gradient(135deg, rgba(248, 81, 73, 0.1) 0%, rgba(248, 81, 73, 0.05) 100%);
            }

            .viz-burnout-header {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 8px;
            }

            .viz-burnout-icon {
                font-size: 20px;
            }

            .viz-burnout-title {
                font-weight: 600;
                font-size: 14px;
            }

            .viz-burnout-message {
                font-size: 13px;
                color: #8b949e;
                line-height: 1.5;
            }

            /* AI Insights Card */
            .viz-ai-insights {
                background: linear-gradient(135deg, rgba(88, 166, 255, 0.1) 0%, rgba(136, 87, 232, 0.1) 100%);
                border: 1px solid rgba(88, 166, 255, 0.2);
                border-radius: 12px;
                padding: 20px;
                margin-top: 16px;
            }

            .viz-ai-header {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 16px;
            }

            .viz-ai-icon {
                font-size: 24px;
            }

            .viz-ai-title {
                font-size: 16px;
                font-weight: 600;
            }

            .viz-ai-assessment {
                font-size: 14px;
                line-height: 1.6;
                margin-bottom: 16px;
                color: #e6edf3;
            }

            .viz-ai-corrections {
                list-style: none;
                padding: 0;
                margin: 0 0 16px 0;
            }

            .viz-ai-correction {
                display: flex;
                align-items: flex-start;
                gap: 8px;
                padding: 8px 0;
                font-size: 13px;
                color: #8b949e;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }

            .viz-ai-correction:last-child {
                border-bottom: none;
            }

            .viz-ai-correction-icon {
                color: #58a6ff;
                flex-shrink: 0;
            }

            .viz-ai-motivation {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                padding: 12px;
                font-style: italic;
                font-size: 13px;
                color: #e6edf3;
                text-align: center;
            }
        `;

        document.head.appendChild(styles);
    }

    // ==========================================
    // CONTRIBUTION HEATMAP
    // ==========================================

    /**
     * Create GitHub-style contribution heatmap
     * @param {string} containerId - Container element ID
     * @param {Array} completedDays - Array of completed day numbers
     * @param {object} options - Configuration options
     */
    createHeatmap(containerId, completedDays, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Heatmap container '${containerId}' not found`);
            return;
        }

        const {
            startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
            cellSize = 12,
            cellGap = 3,
            showMonths = true,
            showWeekdays = true,
            theme = 'dark'
        } = options;

        // Build activity data from completed days
        const activityMap = this.buildActivityMap(completedDays, startDate);
        const colors = theme === 'dark' ? this.colors.heatmap : this.colors.heatmapLight;

        // Generate weeks
        const weeks = this.generateWeeks(startDate, activityMap);

        // Create HTML
        container.innerHTML = `
            <div class="viz-heatmap-container">
                <div class="viz-heatmap">
                    ${showMonths ? this.renderMonthLabels(startDate, weeks.length) : ''}
                    <div style="display: flex;">
                        ${showWeekdays ? this.renderWeekdayLabels() : ''}
                        <div class="viz-heatmap-grid">
                            ${weeks.map(week => this.renderWeek(week, colors)).join('')}
                        </div>
                    </div>
                    ${this.renderLegend(colors)}
                </div>
            </div>
        `;

        // Add tooltip functionality
        this.setupHeatmapTooltips(container);
    }

    /**
     * Build activity map from completed days
     */
    buildActivityMap(completedDays, startDate) {
        const map = new Map();
        const baseDate = new Date(startDate);
        
        // For each completed day, create an activity entry
        completedDays.forEach(dayNum => {
            // Simulate completion dates spread over the period
            const dayOffset = (dayNum - 1) * 3 + Math.floor(Math.random() * 2);
            const date = new Date(baseDate);
            date.setDate(date.getDate() + dayOffset);
            
            const dateKey = date.toISOString().split('T')[0];
            map.set(dateKey, (map.get(dateKey) || 0) + 1);
        });

        return map;
    }

    /**
     * Generate week data for heatmap
     */
    generateWeeks(startDate, activityMap) {
        const weeks = [];
        const current = new Date(startDate);
        const endDate = new Date();
        
        // Start from Sunday
        current.setDate(current.getDate() - current.getDay());

        while (current <= endDate) {
            const week = [];
            
            for (let i = 0; i < 7; i++) {
                const dateKey = current.toISOString().split('T')[0];
                const count = activityMap.get(dateKey) || 0;
                
                week.push({
                    date: new Date(current),
                    dateKey,
                    count,
                    level: this.getActivityLevel(count)
                });
                
                current.setDate(current.getDate() + 1);
            }
            
            weeks.push(week);
        }

        return weeks;
    }

    /**
     * Get activity level (0-4) based on count
     */
    getActivityLevel(count) {
        if (count === 0) return 0;
        if (count === 1) return 1;
        if (count === 2) return 2;
        if (count <= 4) return 3;
        return 4;
    }

    /**
     * Render a single week column
     */
    renderWeek(week, colors) {
        return `
            <div class="viz-heatmap-week">
                ${week.map(day => `
                    <div class="viz-heatmap-day" 
                         data-date="${day.dateKey}"
                         data-count="${day.count}"
                         style="background-color: ${colors[day.level]}">
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Render month labels
     */
    renderMonthLabels(startDate, weekCount) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const labels = [];
        const current = new Date(startDate);
        let lastMonth = -1;

        for (let i = 0; i < weekCount; i++) {
            const month = current.getMonth();
            if (month !== lastMonth) {
                labels.push({ month: months[month], position: i });
                lastMonth = month;
            }
            current.setDate(current.getDate() + 7);
        }

        const cellWidth = 15; // 12px cell + 3px gap
        return `
            <div class="viz-heatmap-months" style="margin-left: 30px;">
                ${labels.map((label, idx) => {
                    const nextPos = labels[idx + 1]?.position || weekCount;
                    const width = (nextPos - label.position) * cellWidth;
                    return `<span class="viz-heatmap-month" style="width: ${width}px;">${label.month}</span>`;
                }).join('')}
            </div>
        `;
    }

    /**
     * Render weekday labels
     */
    renderWeekdayLabels() {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return `
            <div class="viz-heatmap-weekdays">
                ${days.map((day, i) => `
                    <span class="viz-heatmap-weekday" style="${i % 2 === 0 ? 'visibility: hidden;' : ''}">${day}</span>
                `).join('')}
            </div>
        `;
    }

    /**
     * Render legend
     */
    renderLegend(colors) {
        return `
            <div class="viz-heatmap-legend">
                <span>Less</span>
                ${colors.map(color => `
                    <div class="viz-heatmap-legend-item" style="background-color: ${color}"></div>
                `).join('')}
                <span>More</span>
            </div>
        `;
    }

    /**
     * Setup tooltip functionality for heatmap
     */
    setupHeatmapTooltips(container) {
        let tooltip = null;

        container.addEventListener('mouseover', (e) => {
            const cell = e.target.closest('.viz-heatmap-day');
            if (!cell) return;

            const date = cell.dataset.date;
            const count = cell.dataset.count;
            const dateFormatted = new Date(date).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            // Create tooltip
            tooltip = document.createElement('div');
            tooltip.className = 'viz-heatmap-tooltip';
            tooltip.innerHTML = `
                <strong>${count} contribution${count !== '1' ? 's' : ''}</strong>
                <br>
                ${dateFormatted}
            `;
            document.body.appendChild(tooltip);

            // Position tooltip
            const rect = cell.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
        });

        container.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('viz-heatmap-day') && tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
    }

    // ==========================================
    // TECH STACK RADAR CHART
    // ==========================================

    /**
     * Create radar/spider chart for tech stack distribution
     * @param {string} containerId - Container element ID
     * @param {object} data - Radar data { category: percentage }
     * @param {object} options - Configuration options
     */
    createRadarChart(containerId, data, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Radar container '${containerId}' not found`);
            return;
        }

        const {
            size = 300,
            levels = 5,
            maxValue = 100,
            labelOffset = 20
        } = options;

        const center = size / 2;
        const radius = (size / 2) - 50; // Leave room for labels
        const categories = Object.keys(data);
        const angleStep = (2 * Math.PI) / categories.length;

        // Create SVG
        const svg = this.createSVGElement('svg', {
            class: 'viz-radar-svg',
            viewBox: `0 0 ${size} ${size}`
        });

        // Draw grid circles
        for (let i = 1; i <= levels; i++) {
            const r = (radius / levels) * i;
            svg.appendChild(this.createSVGElement('circle', {
                cx: center,
                cy: center,
                r: r,
                fill: 'none',
                stroke: this.colors.radar.grid,
                'stroke-width': 1
            }));
        }

        // Draw axis lines and labels
        categories.forEach((category, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);

            // Axis line
            svg.appendChild(this.createSVGElement('line', {
                x1: center,
                y1: center,
                x2: x2,
                y2: y2,
                stroke: this.colors.radar.grid,
                'stroke-width': 1
            }));

            // Label
            const labelX = center + (radius + labelOffset) * Math.cos(angle);
            const labelY = center + (radius + labelOffset) * Math.sin(angle);
            
            const label = this.createSVGElement('text', {
                x: labelX,
                y: labelY,
                class: 'viz-radar-label',
                'text-anchor': 'middle',
                'dominant-baseline': 'middle'
            });
            label.textContent = category;
            svg.appendChild(label);

            // Value label
            const value = data[category] || 0;
            const valueX = center + (radius * value / maxValue + 15) * Math.cos(angle);
            const valueY = center + (radius * value / maxValue + 15) * Math.sin(angle);
            
            const valueLabel = this.createSVGElement('text', {
                x: valueX,
                y: valueY,
                class: 'viz-radar-value',
                'text-anchor': 'middle',
                'dominant-baseline': 'middle'
            });
            valueLabel.textContent = `${value}%`;
            svg.appendChild(valueLabel);
        });

        // Draw data polygon
        const points = categories.map((category, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const value = data[category] || 0;
            const r = (radius * value) / maxValue;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return `${x},${y}`;
        }).join(' ');

        svg.appendChild(this.createSVGElement('polygon', {
            points: points,
            fill: this.colors.radar.fill,
            stroke: this.colors.radar.stroke,
            'stroke-width': 2
        }));

        // Draw data points
        categories.forEach((category, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const value = data[category] || 0;
            const r = (radius * value) / maxValue;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);

            svg.appendChild(this.createSVGElement('circle', {
                cx: x,
                cy: y,
                r: 4,
                fill: this.colors.radar.pointFill
            }));
        });

        container.innerHTML = '';
        container.className = 'viz-radar-container';
        container.appendChild(svg);
    }

    /**
     * Create SVG element with attributes
     */
    createSVGElement(tag, attrs = {}) {
        const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (const [key, value] of Object.entries(attrs)) {
            el.setAttribute(key, value);
        }
        return el;
    }

    // ==========================================
    // AI INSIGHTS CARD
    // ==========================================

    /**
     * Render AI insights card
     * @param {string} containerId - Container element ID
     * @param {object} insights - AI analysis results
     */
    renderAIInsights(containerId, insights) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const {
            overallAssessment,
            pathCorrections,
            nextRecommendedProject,
            motivationalMessage,
            focusAreas,
            estimatedCompletionDate,
            riskLevel
        } = insights;

        container.innerHTML = `
            <div class="viz-ai-insights">
                <div class="viz-ai-header">
                    <span class="viz-ai-icon">🤖</span>
                    <span class="viz-ai-title">AI Learning Architect</span>
                </div>

                <p class="viz-ai-assessment">${overallAssessment}</p>

                <h4 style="font-size: 13px; margin-bottom: 8px; color: #58a6ff;">
                    📍 Path Corrections
                </h4>
                <ul class="viz-ai-corrections">
                    ${pathCorrections.map(correction => `
                        <li class="viz-ai-correction">
                            <span class="viz-ai-correction-icon">→</span>
                            <span>${correction}</span>
                        </li>
                    `).join('')}
                </ul>

                <h4 style="font-size: 13px; margin-bottom: 8px; color: #58a6ff;">
                    🎯 Next Recommended Project
                </h4>
                <p style="font-size: 13px; color: #e6edf3; margin-bottom: 16px;">
                    ${nextRecommendedProject}
                </p>

                <div class="viz-ai-motivation">
                    "${motivationalMessage}"
                </div>

                <div class="viz-stats-grid">
                    <div class="viz-stat-card">
                        <div class="viz-stat-value">${estimatedCompletionDate}</div>
                        <div class="viz-stat-label">Est. Completion</div>
                    </div>
                    <div class="viz-stat-card">
                        <div class="viz-stat-value" style="color: ${riskLevel === 'high' ? '#f85149' : riskLevel === 'medium' ? '#d29922' : '#3fb950'};">
                            ${riskLevel.toUpperCase()}
                        </div>
                        <div class="viz-stat-label">Burnout Risk</div>
                    </div>
                </div>
            </div>
        `;
    }

    // ==========================================
    // BURNOUT ALERT
    // ==========================================

    /**
     * Render burnout alert
     * @param {string} containerId - Container element ID
     * @param {object} burnoutData - Burnout analysis results
     */
    renderBurnoutAlert(containerId, burnoutData) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const { riskLevel, warnings, recommendation } = burnoutData;

        if (riskLevel === 'low' && warnings.length === 0) {
            container.innerHTML = `
                <div class="viz-burnout-alert low">
                    <div class="viz-burnout-header">
                        <span class="viz-burnout-icon">✅</span>
                        <span class="viz-burnout-title">You're Doing Great!</span>
                    </div>
                    <p class="viz-burnout-message">${recommendation.message}</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="viz-burnout-alert ${riskLevel}">
                <div class="viz-burnout-header">
                    <span class="viz-burnout-icon">${riskLevel === 'high' ? '⚠️' : '💡'}</span>
                    <span class="viz-burnout-title">${riskLevel === 'high' ? 'Burnout Alert' : 'Heads Up!'}</span>
                </div>
                ${warnings.map(w => `
                    <p class="viz-burnout-message">
                        <strong>${w.message}</strong><br>
                        ${w.suggestion}
                    </p>
                `).join('')}
            </div>
        `;
    }

    // ==========================================
    // STATS GRID
    // ==========================================

    /**
     * Render statistics grid
     * @param {string} containerId - Container element ID
     * @param {object} stats - Statistics data
     */
    renderStatsGrid(containerId, stats) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const {
            completed = 0,
            streak = 0,
            longestStreak = 0,
            totalTime = '0h',
            averagePerDay = 0
        } = stats;

        container.innerHTML = `
            <div class="viz-stats-grid">
                <div class="viz-stat-card">
                    <div class="viz-stat-value">${completed}/100</div>
                    <div class="viz-stat-label">Days Completed</div>
                </div>
                <div class="viz-stat-card">
                    <div class="viz-stat-value" style="color: #f97316;">🔥 ${streak}</div>
                    <div class="viz-stat-label">Current Streak</div>
                </div>
                <div class="viz-stat-card">
                    <div class="viz-stat-value">${longestStreak}</div>
                    <div class="viz-stat-label">Longest Streak</div>
                </div>
                <div class="viz-stat-card">
                    <div class="viz-stat-value">${Math.round(completed)}%</div>
                    <div class="viz-stat-label">Progress</div>
                </div>
            </div>
        `;
    }
}

// Singleton instance
const Viz = new Visualizer();

// Export for modules
export { Viz, Visualizer };

// Global for non-module scripts
if (typeof window !== 'undefined') {
    window.Viz = Viz;
}
