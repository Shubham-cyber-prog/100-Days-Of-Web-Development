/**
 * Metrics Tracker
 * Real-time efficiency and cost charting
 */

export class MetricsTracker {
    constructor() {
        this.convergenceChart = document.getElementById('convergence-chart');
        this.chartCtx = this.convergenceChart?.getContext('2d');
        this.convergenceData = [];
        this.maxDataPoints = 100;
    }

    /**
     * Update performance metrics display
     */
    updateMetrics(data) {
        if (data.computationTime !== undefined) {
            document.getElementById('metric-time').textContent =
                Math.round(data.computationTime) + ' ms';
        }

        if (data.distance !== undefined) {
            document.getElementById('metric-distance').textContent =
                Math.round(data.distance) + ' km';
            document.getElementById('total-distance').textContent =
                Math.round(data.distance) + ' km';
        }

        if (data.iterations !== undefined) {
            document.getElementById('metric-iterations').textContent = data.iterations;
        }

        if (data.improvement !== undefined) {
            document.getElementById('metric-improvement').textContent =
                data.improvement.toFixed(1) + '%';
        }
    }

    /**
     * Update convergence chart
     */
    updateChart(convergenceHistory) {
        if (!this.chartCtx) return;

        this.convergenceData = convergenceHistory;
        this.drawChart();
    }

    /**
     * Draw convergence chart
     */
    drawChart() {
        const ctx = this.chartCtx;
        const canvas = this.convergenceChart;
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        if (this.convergenceData.length === 0) return;

        // Find min/max for scaling
        const minValue = Math.min(...this.convergenceData);
        const maxValue = Math.max(...this.convergenceData);
        const range = maxValue - minValue || 1;

        // Draw axes
        ctx.strokeStyle = '#dee2e6';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, 10);
        ctx.lineTo(40, height - 30);
        ctx.lineTo(width - 10, height - 30);
        ctx.stroke();

        // Draw labels
        ctx.fillStyle = '#6c757d';
        ctx.font = '10px Inter';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxValue), 35, 15);
        ctx.fillText(Math.round(minValue), 35, height - 25);

        ctx.textAlign = 'center';
        ctx.fillText('Iteration', width / 2, height - 10);

        // Draw line
        ctx.strokeStyle = '#0066cc';
        ctx.lineWidth = 2;
        ctx.beginPath();

        const xStep = (width - 50) / Math.max(this.convergenceData.length - 1, 1);

        this.convergenceData.forEach((value, index) => {
            const x = 40 + index * xStep;
            const y = height - 30 - ((value - minValue) / range) * (height - 40);

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw points
        ctx.fillStyle = '#0066cc';
        this.convergenceData.forEach((value, index) => {
            if (index % Math.ceil(this.convergenceData.length / 20) === 0) {
                const x = 40 + index * xStep;
                const y = height - 30 - ((value - minValue) / range) * (height - 40);

                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }

    /**
     * Update route details panel
     */
    updateRouteDetails(path, nodes) {
        const container = document.getElementById('route-details');

        if (!path || path.length === 0) {
            container.innerHTML = '<p class="placeholder">Run an algorithm to see route details</p>';
            return;
        }

        let html = '<div style="font-size: 0.75rem;">';
        html += `<p><strong>Route Order:</strong></p>`;
        html += '<ol style="margin-left: 20px; margin-top: 8px;">';

        path.forEach((nodeId, index) => {
            const node = nodes.find(n => n.id === nodeId);
            if (node) {
                html += `<li>${node.label || nodeId}</li>`;
            }
        });

        html += '</ol></div>';
        container.innerHTML = html;
    }

    /**
     * Calculate improvement percentage
     */
    calculateImprovement(initialDistance, finalDistance) {
        if (initialDistance === 0) return 0;
        return ((initialDistance - finalDistance) / initialDistance) * 100;
    }

    /**
     * Reset metrics
     */
    reset() {
        this.convergenceData = [];
        this.updateMetrics({
            computationTime: 0,
            distance: 0,
            iterations: 0,
            improvement: 0
        });

        if (this.chartCtx) {
            this.chartCtx.clearRect(0, 0, this.convergenceChart.width, this.convergenceChart.height);
        }

        document.getElementById('route-details').innerHTML =
            '<p class="placeholder">Run an algorithm to see route details</p>';
    }
}
