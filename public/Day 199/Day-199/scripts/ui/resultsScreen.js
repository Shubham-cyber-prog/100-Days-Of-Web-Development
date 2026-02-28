/**
 * Results Screen Component
 */

export class ResultsScreen {
    constructor() {
        this.wpmElement = document.getElementById('final-wpm');
        this.accuracyElement = document.getElementById('final-accuracy');
        this.charsElement = document.getElementById('final-chars');
        this.errorsElement = document.getElementById('final-errors');
        this.errorBreakdown = document.getElementById('error-breakdown');
        this.canvas = document.getElementById('wpm-chart');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    }

    /**
     * Display final results
     */
    show(stats) {
        // Update stat cards
        if (this.wpmElement) {
            this.wpmElement.textContent = stats.wpm;
            this.animateNumber(this.wpmElement, 0, stats.wpm, 1000);
        }

        if (this.accuracyElement) {
            this.accuracyElement.textContent = `${stats.accuracy}%`;
        }

        if (this.charsElement) {
            this.charsElement.textContent = stats.totalTyped;
        }

        if (this.errorsElement) {
            this.errorsElement.textContent = stats.errors;
        }

        // Show error breakdown
        this.showErrorBreakdown(stats);

        // Draw WPM chart
        if (this.ctx && stats.wpmHistory) {
            this.drawWPMChart(stats.wpmHistory);
        }
    }

    /**
     * Animate number counting up
     */
    animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.round(current);
        }, 16);
    }

    /**
     * Show error breakdown
     */
    showErrorBreakdown(stats) {
        if (!this.errorBreakdown) return;

        if (stats.errors === 0) {
            this.errorBreakdown.innerHTML = `
                <div style="text-align: center; color: var(--success); padding: 1.5rem;">
                    <i class="fa-solid fa-check-circle" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <p>Perfect! No errors!</p>
                </div>
            `;
            return;
        }

        this.errorBreakdown.innerHTML = `
            <h4 style="margin-bottom: 1rem; color: var(--text-secondary);">Error Breakdown</h4>
            <div class="error-detail">
                <span class="error-type">Wrong Characters:</span>
                <span class="error-count">${stats.errors}</span>
            </div>
            <div class="error-detail">
                <span class="error-type">Error Rate:</span>
                <span class="error-count">${stats.errorRate}%</span>
            </div>
        `;
    }

    /**
     * Draw WPM performance chart
     */
    drawWPMChart(wpmHistory) {
        if (!this.ctx || !wpmHistory || wpmHistory.length === 0) return;

        const canvas = this.canvas;
        const ctx = this.ctx;
        const width = canvas.width;
        const height = canvas.height;
        const padding = 40;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Background
        ctx.fillStyle = '#0d1117';
        ctx.fillRect(0, 0, width, height);

        // Find max WPM for scaling
        const maxWPM = Math.max(...wpmHistory.map(h => h.wpm), 10);
        const maxTime = Math.max(...wpmHistory.map(h => h.timestamp), 1);

        // Draw grid lines
        ctx.strokeStyle = '#30363d';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (height - 2 * padding) * (i / 5);
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();

            // Y-axis labels
            const wpmValue = Math.round(maxWPM * (1 - i / 5));
            ctx.fillStyle = '#8b949e';
            ctx.font = '12px Fira Code';
            ctx.textAlign = 'right';
            ctx.fillText(wpmValue, padding - 10, y + 4);
        }

        // Draw line chart
        ctx.strokeStyle = '#58a6ff';
        ctx.lineWidth = 3;
        ctx.beginPath();

        wpmHistory.forEach((point, index) => {
            const x = padding + ((width - 2 * padding) * (point.timestamp / maxTime));
            const y = height - padding - ((height - 2 * padding) * (point.wpm / maxWPM));

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw points
        ctx.fillStyle = '#58a6ff';
        wpmHistory.forEach(point => {
            const x = padding + ((width - 2 * padding) * (point.timestamp / maxTime));
            const y = height - padding - ((height - 2 * padding) * (point.wpm / maxWPM));

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        // X-axis label
        ctx.fillStyle = '#8b949e';
        ctx.font = '12px Fira Code';
        ctx.textAlign = 'center';
        ctx.fillText('Time (seconds)', width / 2, height - 10);

        // Y-axis label
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('WPM', 0, 0);
        ctx.restore();
    }
}
