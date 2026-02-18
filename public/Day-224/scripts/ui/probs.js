/**
 * Probability Amplitude Renderer
 * Charts the likelihood of collapsing into each computational basis state.
 */

export class ProbViz {
    render(probabilities) {
        const container = document.getElementById('probability-viz');
        if (!container) return;

        container.innerHTML = '';
        const numQubits = Math.log2(probabilities.length);

        probabilities.forEach((prob, i) => {
            const binary = i.toString(2).padStart(numQubits, '0');
            const height = prob * 100;

            const bar = document.createElement('div');
            bar.className = 'prob-bar-container';
            bar.innerHTML = `
                <div class="prob-bar">
                    <div class="prob-fill" style="height: ${height}%"></div>
                </div>
                <div class="prob-label">|${binary}⟩</div>
                <div class="prob-val">${Math.round(height)}%</div>
            `;
            container.appendChild(bar);
        });
    }
}

// Inject prob styles
const style = document.createElement('style');
style.textContent = `
    .prob-grid { display: flex; align-items: flex-end; gap: 15px; height: 160px; padding-top: 20px; overflow-x: auto; }
    .prob-bar-container { display: flex; flex-direction: column; align-items: center; min-width: 40px; }
    .prob-bar { width: 25px; height: 100px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; position: relative; }
    .prob-fill { position: absolute; bottom: 0; width: 100%; background: linear-gradient(to top, var(--accent-purple), var(--accent-quantum)); transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
    .prob-label { font-family: var(--font-mono); font-size: 0.7rem; margin-top: 8px; color: var(--text-dim); }
    .prob-val { font-size: 0.65rem; color: var(--accent-quantum); font-weight: 600; }
`;
document.head.appendChild(style);

export const uiProbs = new ProbViz();
