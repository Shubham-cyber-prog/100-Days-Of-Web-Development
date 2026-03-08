/**
 * Calendar Heatmap Component
 * GitHub-style contribution calendar showing daily coding activity
 * with streak tracking and statistics visualization
 */

import { streakService } from '../core/streakService.js';

class CalendarHeatmap {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            cellSize: 12,
            cellGap: 3,
            monthLabelHeight: 20,
            dayLabelWidth: 30,
            colorScheme: options.colorScheme || 'green',
            showMonthLabels: options.showMonthLabels !== false,
            showDayLabels: options.showDayLabels !== false,
            showTooltip: options.showTooltip !== false,
            weeksToShow: options.weeksToShow || 52,
            ...options
        };
        
        this.activityData = new Map();
        this.tooltip = null;
        this.isExporting = false;
        
        // Color schemes
        this.colorSchemes = {
            green: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
            blue: ['#161b22', '#0a3069', '#0969da', '#54aeff', '#79c0ff'],
            purple: ['#161b22', '#3d1f5c', '#6e40c9', '#9e6fef', '#c297ff'],
            orange: ['#161b22', '#5c2d0e', '#bd561d', '#e9875b', '#ffb088'],
            flame: ['#161b22', '#7c2d12', '#dc2626', '#f97316', '#fbbf24']
        };
        
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        this.init();
    }
    
    /**
     * Initialize the heatmap component
     */
    async init() {
        if (!this.container) {
            console.error('CalendarHeatmap: Container not found');
            return;
        }
        
        this.createStructure();
        this.createTooltip();
        
        // Load activity data
        await this.loadActivityData();
        
        // Render the heatmap
        this.render();
        
        // Listen for activity updates
        window.addEventListener('activityUpdated', () => {
            this.loadActivityData();
            this.render();
        });
    }
    
    /**
     * Create the base HTML structure
     */
    createStructure() {
        this.container.innerHTML = `
            <div class="calendar-heatmap">
                <div class="heatmap-header">
                    <div class="heatmap-title">
                        <h3>Activity Overview</h3>
                        <p class="contribution-count">Loading activity data...</p>
                    </div>
                    <div class="heatmap-actions">
                        <select class="color-scheme-select" aria-label="Color scheme">
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                            <option value="purple">Purple</option>
                            <option value="orange">Orange</option>
                            <option value="flame">Flame</option>
                        </select>
                        <button class="export-btn" title="Export as image">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7,10 12,15 17,10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="heatmap-body">
                    <div class="month-labels"></div>
                    <div class="heatmap-grid-wrapper">
                        <div class="day-labels"></div>
                        <div class="heatmap-cells"></div>
                    </div>
                </div>
                <div class="heatmap-footer">
                    <div class="streak-stats">
                        <div class="streak-stat current-streak">
                            <span class="streak-icon">🔥</span>
                            <span class="streak-value">0</span>
                            <span class="streak-label">Current Streak</span>
                        </div>
                        <div class="streak-stat longest-streak">
                            <span class="streak-icon">🏆</span>
                            <span class="streak-value">0</span>
                            <span class="streak-label">Longest Streak</span>
                        </div>
                        <div class="streak-stat total-active">
                            <span class="streak-icon">📅</span>
                            <span class="streak-value">0</span>
                            <span class="streak-label">Total Active Days</span>
                        </div>
                    </div>
                    <div class="legend">
                        <span class="legend-label">Less</span>
                        <div class="legend-cells"></div>
                        <span class="legend-label">More</span>
                    </div>
                </div>
            </div>
        `;
        
        // Bind event listeners
        this.bindEvents();
    }
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        const colorSelect = this.container.querySelector('.color-scheme-select');
        colorSelect.value = this.options.colorScheme;
        colorSelect.addEventListener('change', (e) => {
            this.options.colorScheme = e.target.value;
            this.render();
            this.savePreferences();
        });
        
        const exportBtn = this.container.querySelector('.export-btn');
        exportBtn.addEventListener('click', () => this.exportAsImage());
    }
    
    /**
     * Create tooltip element
     */
    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'heatmap-tooltip';
        this.tooltip.style.display = 'none';
        document.body.appendChild(this.tooltip);
    }
    
    /**
     * Load activity data from streak service
     */
    async loadActivityData() {
        try {
            const data = await streakService.getActivityData();
            this.activityData = new Map(Object.entries(data));
        } catch (error) {
            console.error('Failed to load activity data:', error);
            this.activityData = new Map();
        }
    }
    
    /**
     * Render the heatmap
     */
    render() {
        this.renderCells();
        this.renderMonthLabels();
        this.renderDayLabels();
        this.renderLegend();
        this.updateStats();
    }
    
    /**
     * Render heatmap cells
     */
    renderCells() {
        const cellsContainer = this.container.querySelector('.heatmap-cells');
        cellsContainer.innerHTML = '';
        
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - (this.options.weeksToShow * 7) + 1);
        
        // Align to start of week (Sunday)
        const dayOfWeek = startDate.getDay();
        startDate.setDate(startDate.getDate() - dayOfWeek);
        
        const colors = this.colorSchemes[this.options.colorScheme];
        
        // Create weeks
        for (let week = 0; week < this.options.weeksToShow; week++) {
            const weekColumn = document.createElement('div');
            weekColumn.className = 'heatmap-week';
            
            for (let day = 0; day < 7; day++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + (week * 7) + day);
                
                const cell = document.createElement('div');
                cell.className = 'heatmap-cell';
                
                const dateKey = this.formatDate(currentDate);
                const activityCount = this.activityData.get(dateKey) || 0;
                const level = this.getActivityLevel(activityCount);
                
                cell.style.backgroundColor = colors[level];
                cell.dataset.date = dateKey;
                cell.dataset.count = activityCount;
                cell.dataset.level = level;
                
                // Future dates styling
                if (currentDate > today) {
                    cell.classList.add('future');
                    cell.style.backgroundColor = 'transparent';
                    cell.style.border = '1px dashed rgba(255,255,255,0.1)';
                }
                
                // Today highlight
                if (this.formatDate(currentDate) === this.formatDate(today)) {
                    cell.classList.add('today');
                }
                
                // Tooltip events
                cell.addEventListener('mouseenter', (e) => this.showTooltip(e, currentDate, activityCount));
                cell.addEventListener('mouseleave', () => this.hideTooltip());
                cell.addEventListener('click', () => this.handleCellClick(dateKey));
                
                weekColumn.appendChild(cell);
            }
            
            cellsContainer.appendChild(weekColumn);
        }
    }
    
    /**
     * Render month labels
     */
    renderMonthLabels() {
        if (!this.options.showMonthLabels) return;
        
        const labelsContainer = this.container.querySelector('.month-labels');
        labelsContainer.innerHTML = '';
        
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - (this.options.weeksToShow * 7) + 1);
        startDate.setDate(startDate.getDate() - startDate.getDay());
        
        let currentMonth = -1;
        const cellWidth = this.options.cellSize + this.options.cellGap;
        
        for (let week = 0; week < this.options.weeksToShow; week++) {
            const weekDate = new Date(startDate);
            weekDate.setDate(startDate.getDate() + (week * 7));
            
            if (weekDate.getMonth() !== currentMonth && weekDate.getDate() <= 7) {
                currentMonth = weekDate.getMonth();
                const label = document.createElement('span');
                label.className = 'month-label';
                label.textContent = this.months[currentMonth];
                label.style.left = `${this.options.dayLabelWidth + (week * cellWidth)}px`;
                labelsContainer.appendChild(label);
            }
        }
    }
    
    /**
     * Render day labels
     */
    renderDayLabels() {
        if (!this.options.showDayLabels) return;
        
        const labelsContainer = this.container.querySelector('.day-labels');
        labelsContainer.innerHTML = '';
        
        const daysToShow = [1, 3, 5]; // Mon, Wed, Fri
        daysToShow.forEach(dayIndex => {
            const label = document.createElement('span');
            label.className = 'day-label';
            label.textContent = this.days[dayIndex];
            labelsContainer.appendChild(label);
        });
    }
    
    /**
     * Render legend
     */
    renderLegend() {
        const legendCells = this.container.querySelector('.legend-cells');
        legendCells.innerHTML = '';
        
        const colors = this.colorSchemes[this.options.colorScheme];
        colors.forEach((color, index) => {
            const cell = document.createElement('div');
            cell.className = 'legend-cell';
            cell.style.backgroundColor = color;
            cell.title = this.getLevelDescription(index);
            legendCells.appendChild(cell);
        });
    }
    
    /**
     * Update streak statistics
     */
    async updateStats() {
        const stats = await streakService.getStreakStats();
        
        const currentStreak = this.container.querySelector('.current-streak .streak-value');
        const longestStreak = this.container.querySelector('.longest-streak .streak-value');
        const totalActive = this.container.querySelector('.total-active .streak-value');
        const contributionCount = this.container.querySelector('.contribution-count');
        
        // Animate current streak with fire effect
        currentStreak.textContent = stats.currentStreak;
        if (stats.currentStreak > 0) {
            currentStreak.parentElement.classList.add('active-streak');
        } else {
            currentStreak.parentElement.classList.remove('active-streak');
        }
        
        longestStreak.textContent = stats.longestStreak;
        totalActive.textContent = stats.totalActiveDays;
        
        const totalContributions = Array.from(this.activityData.values()).reduce((a, b) => a + b, 0);
        contributionCount.textContent = `${totalContributions} contributions in the last year`;
    }
    
    /**
     * Show tooltip
     */
    showTooltip(event, date, count) {
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const activity = count === 0 ? 'No activity' : 
                        count === 1 ? '1 activity' : 
                        `${count} activities`;
        
        this.tooltip.innerHTML = `
            <strong>${activity}</strong>
            <span>${formattedDate}</span>
        `;
        
        this.tooltip.style.display = 'block';
        
        const rect = event.target.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();
        
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.top - tooltipRect.height - 8;
        
        // Keep tooltip within viewport
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) {
            top = rect.bottom + 8;
        }
        
        this.tooltip.style.left = `${left}px`;
        this.tooltip.style.top = `${top}px`;
    }
    
    /**
     * Hide tooltip
     */
    hideTooltip() {
        this.tooltip.style.display = 'none';
    }
    
    /**
     * Handle cell click
     */
    handleCellClick(dateKey) {
        const event = new CustomEvent('heatmapCellClick', {
            detail: { date: dateKey, count: this.activityData.get(dateKey) || 0 }
        });
        window.dispatchEvent(event);
    }
    
    /**
     * Get activity level (0-4)
     */
    getActivityLevel(count) {
        if (count === 0) return 0;
        if (count <= 2) return 1;
        if (count <= 5) return 2;
        if (count <= 10) return 3;
        return 4;
    }
    
    /**
     * Get level description for tooltip
     */
    getLevelDescription(level) {
        const descriptions = [
            'No activity',
            '1-2 activities',
            '3-5 activities',
            '6-10 activities',
            '10+ activities'
        ];
        return descriptions[level];
    }
    
    /**
     * Format date as YYYY-MM-DD
     */
    formatDate(date) {
        return date.toISOString().split('T')[0];
    }
    
    /**
     * Export heatmap as image
     */
    async exportAsImage() {
        if (this.isExporting) return;
        this.isExporting = true;
        
        const exportBtn = this.container.querySelector('.export-btn');
        exportBtn.innerHTML = '<span class="spinner"></span>';
        
        try {
            // Dynamic import of html2canvas (should be included in page)
            if (typeof html2canvas === 'undefined') {
                // Fallback: create a simple canvas representation
                await this.exportCanvasFallback();
            } else {
                const heatmapElement = this.container.querySelector('.calendar-heatmap');
                const canvas = await html2canvas(heatmapElement, {
                    backgroundColor: '#0d1117',
                    scale: 2
                });
                
                this.downloadCanvas(canvas);
            }
        } catch (error) {
            console.error('Export failed:', error);
            this.showNotification('Export failed. Please try again.', 'error');
        } finally {
            this.isExporting = false;
            exportBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
            `;
        }
    }
    
    /**
     * Fallback export using canvas
     */
    async exportCanvasFallback() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const padding = 40;
        const cellWidth = this.options.cellSize + this.options.cellGap;
        const width = (this.options.weeksToShow * cellWidth) + padding * 2;
        const height = (7 * cellWidth) + padding * 2 + 60;
        
        canvas.width = width * 2;
        canvas.height = height * 2;
        ctx.scale(2, 2);
        
        // Background
        ctx.fillStyle = '#0d1117';
        ctx.fillRect(0, 0, width, height);
        
        // Title
        ctx.fillStyle = '#c9d1d9';
        ctx.font = 'bold 16px system-ui, -apple-system, sans-serif';
        ctx.fillText('Activity Overview', padding, padding);
        
        // Cells
        const colors = this.colorSchemes[this.options.colorScheme];
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - (this.options.weeksToShow * 7) + 1);
        startDate.setDate(startDate.getDate() - startDate.getDay());
        
        for (let week = 0; week < this.options.weeksToShow; week++) {
            for (let day = 0; day < 7; day++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + (week * 7) + day);
                
                const dateKey = this.formatDate(currentDate);
                const count = this.activityData.get(dateKey) || 0;
                const level = this.getActivityLevel(count);
                
                const x = padding + (week * cellWidth);
                const y = padding + 30 + (day * cellWidth);
                
                ctx.fillStyle = currentDate > today ? 'transparent' : colors[level];
                ctx.fillRect(x, y, this.options.cellSize, this.options.cellSize);
                
                if (currentDate > today) {
                    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                    ctx.setLineDash([2, 2]);
                    ctx.strokeRect(x, y, this.options.cellSize, this.options.cellSize);
                    ctx.setLineDash([]);
                }
            }
        }
        
        // Legend
        const legendY = height - 30;
        ctx.fillStyle = '#8b949e';
        ctx.font = '12px system-ui';
        ctx.fillText('Less', padding, legendY);
        
        colors.forEach((color, i) => {
            ctx.fillStyle = color;
            ctx.fillRect(padding + 35 + (i * 15), legendY - 10, 12, 12);
        });
        
        ctx.fillStyle = '#8b949e';
        ctx.fillText('More', padding + 115, legendY);
        
        this.downloadCanvas(canvas);
    }
    
    /**
     * Download canvas as image
     */
    downloadCanvas(canvas) {
        const link = document.createElement('a');
        const date = new Date().toISOString().split('T')[0];
        link.download = `activity-heatmap-${date}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        this.showNotification('Heatmap exported successfully!', 'success');
    }
    
    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `heatmap-notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    /**
     * Save user preferences
     */
    savePreferences() {
        localStorage.setItem('heatmapPreferences', JSON.stringify({
            colorScheme: this.options.colorScheme
        }));
    }
    
    /**
     * Load user preferences
     */
    loadPreferences() {
        try {
            const prefs = JSON.parse(localStorage.getItem('heatmapPreferences'));
            if (prefs) {
                this.options.colorScheme = prefs.colorScheme || 'green';
            }
        } catch (e) {
            // Use defaults
        }
    }
    
    /**
     * Cleanup
     */
    destroy() {
        if (this.tooltip) {
            this.tooltip.remove();
        }
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// Export for module use
export { CalendarHeatmap };
export default CalendarHeatmap;
