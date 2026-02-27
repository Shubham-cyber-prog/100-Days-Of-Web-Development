/**
 * BioSynth Data Visualization
 * Renders genomic heatmaps, colored sequence views, and statistical charts.
 */

export class BioViz {
    constructor() {
        this.heatmapCanvas = document.getElementById('heatmap-canvas');
        this.seqDisplay = document.getElementById('seq-display');
        this.setupHeatmap();
    }

    setupHeatmap() {
        if (!this.heatmapCanvas) return;
        this.resizeHeatmap();
        window.addEventListener('resize', () => this.resizeHeatmap());
    }

    resizeHeatmap() {
        if (!this.heatmapCanvas) return;
        const parent = this.heatmapCanvas.parentElement;
        this.heatmapCanvas.width = parent.clientWidth;
        this.heatmapCanvas.height = parent.clientHeight;
    }

    renderSequence(sequence) {
        if (!this.seqDisplay) return;
        this.seqDisplay.innerHTML = '';

        const fragment = document.createDocumentFragment();
        sequence.split('').forEach(base => {
            const span = document.createElement('span');
            span.className = `base-${base.toLowerCase()}`;
            span.textContent = base;
            fragment.appendChild(span);
        });

        this.seqDisplay.appendChild(fragment);
    }

    renderHeatmap(data) {
        if (!this.heatmapCanvas) return;
        const ctx = this.heatmapCanvas.getContext('2d');
        const { width, height } = this.heatmapCanvas;

        ctx.clearRect(0, 0, width, height);
        const cellWidth = width / data.length;

        data.forEach((val, i) => {
            // GC content scale: Blue (low) to Orange/Red (high)
            const hue = 220 - (val / 100 * 180);
            ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
            ctx.fillRect(i * cellWidth, 0, cellWidth, height);

            // Subtle transition stroke
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.strokeRect(i * cellWidth, 0, cellWidth, height);
        });
    }

    renderCodons(codons) {
        const chart = document.getElementById('codon-chart');
        if (!chart) return;

        chart.innerHTML = '';
        const sorted = Object.entries(codons).sort((a, b) => b[1] - a[1]).slice(0, 8);

        sorted.forEach(([codon, count]) => {
            const bar = document.createElement('div');
            bar.className = 'codon-bar-container';
            bar.innerHTML = `
                <div class="codon-label">${codon}</div>
                <div class="codon-bar">
                    <div class="codon-fill" style="width: ${Math.min(count * 5, 100)}%"></div>
                </div>
                <div class="codon-count">${count}</div>
            `;
            chart.appendChild(bar);
        });
    }
}

// Inject additional styles for codon bars
const style = document.createElement('style');
style.textContent = `
    .codon-bar-container { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; font-family: var(--font-mono); font-size: 0.75rem; }
    .codon-label { width: 30px; color: var(--text-dim); }
    .codon-bar { flex: 1; height: 8px; background: #0f172a; border-radius: 4px; overflow: hidden; }
    .codon-fill { height: 100%; background: var(--accent-bio); transition: width 0.5s ease; }
    .codon-count { width: 20px; text-align: right; color: var(--accent-at); }
    .log-entry { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim); margin-bottom: 6px; border-left: 2px solid var(--accent-bio); padding-left: 8px; }
`;
document.head.appendChild(style);

export const ui = new BioViz();
