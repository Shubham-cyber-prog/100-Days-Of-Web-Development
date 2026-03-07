/**
 * Genomic Sequencer Core
 * Orchestrates sequence processing, analysis, and UI updates.
 */

import { GenomicAnalysis } from '../analysis/metrics.js';
import { ui } from '../ui/viz.js';

class Sequencer {
    constructor() {
        this.currentSequence = "";
        this.history = [];
    }

    process(raw) {
        // Validation: remove non-DNA characters
        const clean = raw.toUpperCase().replace(/[^ATCG]/g, '');
        if (clean.length === 0) {
            this.log('Invalid sequence input.');
            return;
        }

        this.currentSequence = clean;
        this.log(`Sequence processed: ${clean.length} base pairs`);

        // Compute Metrics
        const gc = GenomicAnalysis.calculateGC(clean);
        const tm = GenomicAnalysis.calculateMeltingTemp(clean);
        const heatmap = GenomicAnalysis.getGCHeatmapData(clean, Math.ceil(clean.length / 50));
        const codons = GenomicAnalysis.getCodonFrequency(clean);

        // Update UI View
        this.updateStats(gc, tm, clean.length);
        ui.renderSequence(clean);
        ui.renderHeatmap(heatmap);
        ui.renderCodons(codons);
    }

    updateStats(gc, tm, len) {
        document.getElementById('stat-gc').textContent = `${gc.toFixed(1)}%`;
        document.getElementById('stat-tm').textContent = `${tm.toFixed(1)}°C`;
        document.getElementById('stat-len').textContent = `${len}bp`;
    }

    log(msg) {
        const feed = document.getElementById('mutation-feed');
        if (feed) {
            const item = document.createElement('p');
            item.className = 'log-entry';
            item.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
            feed.prepend(item);

            const empty = feed.querySelector('.empty-feed');
            if (empty) empty.remove();
        }
    }
}

export const sequencer = new Sequencer();
