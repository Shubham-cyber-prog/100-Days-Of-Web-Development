/**
 * Smith-Waterman Local Alignment Algorithm
 * Implements high-precision sequence matching with dynamic programming.
 */

export class SmithWaterman {
    constructor(match = 2, mismatch = -1, gap = -2) {
        this.match = match;
        this.mismatch = mismatch;
        this.gap = gap;
    }

    align(seq1, seq2) {
        const n = seq1.length;
        const m = seq2.length;
        const matrix = Array(n + 1).fill(0).map(() => Array(m + 1).fill(0));

        let maxScore = 0;
        let maxPos = { i: 0, j: 0 };

        // Fill Score Matrix
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                const score = seq1[i - 1] === seq2[j - 1] ? this.match : this.mismatch;

                matrix[i][j] = Math.max(
                    0,
                    matrix[i - 1][j - 1] + score, // Diagonal
                    matrix[i - 1][j] + this.gap,   // Up
                    matrix[i][j - 1] + this.gap    // Left
                );

                if (matrix[i][j] >= maxScore) {
                    maxScore = matrix[i][j];
                    maxPos = { i, j };
                }
            }
        }

        return this.traceback(matrix, seq1, seq2, maxPos);
    }

    traceback(matrix, seq1, seq2, start) {
        let align1 = "";
        let align2 = "";
        let curr = { ...start };

        while (curr.i > 0 && curr.j > 0 && matrix[curr.i][curr.j] > 0) {
            const currentScore = matrix[curr.i][curr.j];
            const diagonal = matrix[curr.i - 1][curr.j - 1];
            const up = matrix[curr.i - 1][curr.j];
            const left = matrix[curr.i][curr.j - 1];

            const score = seq1[curr.i - 1] === seq2[curr.j - 1] ? this.match : this.mismatch;

            if (currentScore === diagonal + score) {
                align1 = seq1[curr.i - 1] + align1;
                align2 = seq2[curr.j - 1] + align2;
                curr.i--;
                curr.j--;
            } else if (currentScore === up + this.gap) {
                align1 = seq1[curr.i - 1] + align1;
                align2 = "-" + align2;
                curr.i--;
            } else {
                align1 = "-" + align1;
                align2 = seq2[curr.j - 1] + align2;
                curr.j--;
            }
        }

        return { align1, align2, score: matrix[start.i][start.j] };
    }
}

export const aligner = new SmithWaterman();
