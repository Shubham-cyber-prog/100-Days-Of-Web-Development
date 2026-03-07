/**
 * Genomic Analysis Metrics
 * Calculates GC content, melting temperature, and sequence density.
 */

export class GenomicAnalysis {
    static calculateGC(sequence) {
        if (!sequence) return 0;
        const bases = sequence.toUpperCase().split('');
        const gc = bases.filter(b => b === 'G' || b === 'C').length;
        return (gc / sequence.length) * 100;
    }

    static calculateMeltingTemp(sequence) {
        // Wallace Rule for short sequences (<14bp)
        // Tm = 2(A+T) + 4(G+C)
        const s = sequence.toUpperCase();
        const aCount = (s.match(/A/g) || []).length;
        const tCount = (s.match(/T/g) || []).length;
        const gCount = (s.match(/G/g) || []).length;
        const cCount = (s.match(/C/g) || []).length;

        if (s.length < 14) {
            return 2 * (aCount + tCount) + 4 * (gCount + cCount);
        }

        // Salt-adjusted Marmur-Doty for longer sequences
        // Tm = 64.9 + 41 * (yG+zC-16.4) / (wA+xT+yG+zC)
        return 64.9 + 41 * (gCount + cCount - 16.4) / s.length;
    }

    static getGCHeatmapData(sequence, windowSize = 10) {
        const heatmap = [];
        for (let i = 0; i <= sequence.length - windowSize; i += windowSize) {
            const window = sequence.slice(i, i + windowSize);
            heatmap.push(this.calculateGC(window));
        }
        return heatmap;
    }

    static getCodonFrequency(sequence) {
        const codons = {};
        for (let i = 0; i < sequence.length - 2; i += 3) {
            const codon = sequence.slice(i, i + 3).toUpperCase();
            if (codon.length === 3) {
                codons[codon] = (codons[codon] || 0) + 1;
            }
        }
        return codons;
    }
}
