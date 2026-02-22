/**
 * Genome Session State Manager
 * Tracks sequence snapshots, mutations, and user projects.
 */

export class GenomeState {
    constructor() {
        this.snapshots = [];
        this.activeId = null;
        this.loadFromStorage();
    }

    saveSnapshot(sequence, name = "Auto-save") {
        const snapshot = {
            id: Date.now(),
            name,
            sequence,
            timestamp: new Date().toISOString()
        };
        this.snapshots.push(snapshot);
        this.persist();
        this.updateNav();
    }

    persist() {
        localStorage.setItem('biosynth_snapshots', JSON.stringify(this.snapshots.slice(-10)));
    }

    loadFromStorage() {
        const data = localStorage.getItem('biosynth_snapshots');
        if (data) {
            this.snapshots = JSON.parse(data);
            this.updateNav();
        }
    }

    updateNav() {
        const list = document.getElementById('sequence-list');
        if (!list) return;

        list.innerHTML = '';
        this.snapshots.forEach(s => {
            const li = document.createElement('li');
            li.className = 'seq-item';
            li.innerHTML = `
                <span class="s-name">${s.name}</span>
                <span class="s-date">${new Date(s.timestamp).toLocaleDateString()}</span>
            `;
            li.addEventListener('click', () => {
                import('./sequencer.js').then(m => m.sequencer.process(s.sequence));
            });
            list.appendChild(li);
        });
    }
}

// Inject nav styles
const style = document.createElement('style');
style.textContent = `
    .seq-list { list-style: none; margin-top: 10px; }
    .seq-item { padding: 12px; border-radius: 6px; cursor: pointer; transition: background 0.2s; border: 1px solid transparent; margin-bottom: 8px; }
    .seq-item:hover { background: #1e293b; border-color: var(--border); }
    .s-name { display: block; font-size: 0.85rem; font-weight: 600; }
    .s-date { font-size: 0.7rem; color: var(--text-dim); }
`;
document.head.appendChild(style);

export const genomeState = new GenomeState();
