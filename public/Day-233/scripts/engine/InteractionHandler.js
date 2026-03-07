export default class InteractionHandler {
    constructor(engine) {
        this.engine = engine;
        this.draggingNode = null;
        this.selectedModule = 'AND';

        this.setupCanvasListeners();
        this.setupTrayListeners();
    }

    setupCanvasListeners() {
        this.engine.canvas.addEventListener('mousedown', (e) => {
            const rect = this.engine.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Check if clicking on existing node
            this.draggingNode = this.engine.nodes.find(n =>
                Math.abs(n.x - x) < 40 && Math.abs(n.y - y) < 30
            );

            // If not dragging, place new node
            if (!this.draggingNode) {
                this.engine.addNode(this.selectedModule, x, y);
            }
        });

        this.engine.canvas.addEventListener('mousemove', (e) => {
            if (this.draggingNode) {
                const rect = this.engine.canvas.getBoundingClientRect();
                this.draggingNode.x = e.clientX - rect.left;
                this.draggingNode.y = e.clientY - rect.top;
            }
        });

        window.addEventListener('mouseup', () => {
            this.draggingNode = null;
        });
    }

    setupTrayListeners() {
        const modules = document.querySelectorAll('.module');
        modules.forEach(m => {
            m.addEventListener('click', () => {
                modules.forEach(mod => mod.classList.remove('active'));
                m.classList.add('active');
                this.selectedModule = m.dataset.type;

                // Update info via UI (placeholder)
                const descMap = {
                    'AND': 'Outputs 1 only if BOTH inputs are 1.',
                    'OR': 'Outputs 1 if AT LEAST ONE input is 1.',
                    'NOT': 'Inverts the input signal (0 becomes 1).',
                    'XOR': 'Outputs 1 only if EXACTLY ONE input is 1.'
                };
                document.getElementById('module-name').textContent = `${this.selectedModule} Gate`;
                document.getElementById('module-desc').textContent = descMap[this.selectedModule];
            });
        });
    }
}
