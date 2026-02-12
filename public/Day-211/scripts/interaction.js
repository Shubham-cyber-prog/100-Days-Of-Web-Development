/**
 * Workspace Interaction and UI Management
 */

class App {
    constructor() {
        this.engine = new CircuitEngine();
        this.wires = new WireSystem(document.getElementById('wires-layer'));
        this.engine.wires = this.wires;

        this.canvasContainer = document.getElementById('canvas-container');
        this.componentsLayer = document.getElementById('components-layer');

        this.viewport = { x: 0, y: 0, zoom: 1 };
        this.isDraggingViewport = false;
        this.lastMousePos = { x: 0, y: 0 };

        this.selectedComponent = null;
        this.activePin = null; // Storing pin object for wire creation
        this.tempWire = null;

        this.init();
    }

    init() {
        this.setupDragDrop();
        this.setupViewport();
        this.setupControls();
        this.engine.start();
        this.render();
    }

    setupDragDrop() {
        const draggables = document.querySelectorAll('.draggable-component');
        draggables.forEach(d => {
            d.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('type', d.dataset.type);
            });
        });

        this.canvasContainer.addEventListener('dragover', (e) => e.preventDefault());
        this.canvasContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            const type = e.dataTransfer.getData('type');
            const rect = this.canvasContainer.getBoundingClientRect();

            // Calculate project coordinates
            const x = (e.clientX - rect.left - this.viewport.x) / this.viewport.zoom;
            const y = (e.clientY - rect.top - this.viewport.y) / this.viewport.zoom;

            this.createComponent(type, x, y);
        });
    }

    createComponent(type, x, y, id = null) {
        const comp = ComponentFactory.create(type, x, y, id);
        this.engine.addComponent(comp);
        this.renderComponent(comp);
        return comp;
    }

    renderComponent(comp) {
        const el = document.createElement('div');
        el.id = comp.id;
        el.className = `logic-gate gate-${comp.type}`;
        el.style.left = `${comp.x}px`;
        el.style.top = `${comp.y}px`;

        el.innerHTML = `
            <div class="gate-label">${comp.label}</div>
            <div class="gate-type">${comp.type}</div>
        `;

        if (comp.type === 'switch') {
            const toggle = document.createElement('div');
            toggle.className = 'switch-toggle';
            toggle.onclick = (e) => {
                e.stopPropagation();
                comp.toggle();
            };
            el.appendChild(toggle);
        }

        // Add Pins
        comp.inputs.forEach((pin, i) => {
            const pinEl = document.createElement('div');
            pinEl.id = pin.id;
            pinEl.className = 'pin pin-input';
            pinEl.style.top = `${20 + i * 20}px`;
            pinEl.onclick = (e) => {
                e.stopPropagation();
                this.handlePinClick(pin);
            };
            el.appendChild(pinEl);
        });

        comp.outputs.forEach((pin, i) => {
            const pinEl = document.createElement('div');
            pinEl.id = pin.id;
            pinEl.className = 'pin pin-output';
            pinEl.style.top = `${20 + i * 20}px`;
            pinEl.onclick = (e) => {
                e.stopPropagation();
                this.handlePinClick(pin);
            };
            el.appendChild(pinEl);
        });

        // Dragging component on canvas
        let isDragging = false;
        let offset = { x: 0, y: 0 };

        el.onmousedown = (e) => {
            if (e.target.classList.contains('pin')) return;
            isDragging = true;
            this.selectedComponent = comp;
            offset = {
                x: e.clientX / this.viewport.zoom - comp.x,
                y: e.clientY / this.viewport.zoom - comp.y
            };

            this.componentsLayer.querySelectorAll('.logic-gate').forEach(g => g.classList.remove('selected'));
            el.classList.add('selected');
            this.showProperties(comp);
        };

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            comp.x = e.clientX / this.viewport.zoom - offset.x; // Simplified
            comp.y = e.clientY / this.viewport.zoom - offset.y;

            // Snapping
            comp.x = Math.round(comp.x / 20) * 20;
            comp.y = Math.round(comp.y / 20) * 20;

            el.style.left = `${comp.x}px`;
            el.style.top = `${comp.y}px`;
            this.wires.drawWires(this.getPinPosition.bind(this));
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        this.componentsLayer.appendChild(el);
    }

    handlePinClick(pin) {
        if (!this.activePin) {
            // Start wire
            this.activePin = pin;
            // Highlight selected pin
            document.getElementById(pin.id).classList.add('connected');
        } else {
            // Try to finish wire
            const p1 = this.activePin;
            const p2 = pin;

            // Must be Output -> Input or Input -> Output
            if (p1.type !== p2.type && p1.parentId !== p2.parentId) {
                const outPin = p1.type === 'output' ? p1 : p2;
                const inPin = p1.type === 'input' ? p1 : p2;
                this.wires.addWire(outPin, inPin);
                this.wires.drawWires(this.getPinPosition.bind(this));
            }

            document.getElementById(this.activePin.id).classList.remove('connected');
            this.activePin = null;
        }
    }

    getPinPosition(pin) {
        const comp = this.engine.components.find(c => c.id === pin.parentId);
        if (!comp) return null;

        const pinEl = document.getElementById(pin.id);
        if (!pinEl) return null;

        // Coordinates relative to components layer
        return {
            x: comp.x + (pin.type === 'output' ? 80 : 0),
            y: comp.y + parseInt(pinEl.style.top) + 6
        };
    }

    setupViewport() {
        this.canvasContainer.addEventListener('mousedown', (e) => {
            if (e.target === this.canvasContainer || e.target === document.getElementById('grid-background')) {
                this.isDraggingViewport = true;
                this.lastMousePos = { x: e.clientX, y: e.clientY };
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (this.isDraggingViewport) {
                const dx = e.clientX - this.lastMousePos.x;
                const dy = e.clientY - this.lastMousePos.y;
                this.viewport.x += dx;
                this.viewport.y += dy;
                this.lastMousePos = { x: e.clientX, y: e.clientY };
                this.updateViewport();
            }
        });

        window.addEventListener('mouseup', () => {
            this.isDraggingViewport = false;
        });

        this.canvasContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomSpeed = 0.001;
            const delta = -e.deltaY * zoomSpeed;
            this.viewport.zoom = Math.min(Math.max(0.2, this.viewport.zoom + delta), 3);
            this.updateViewport();
        });
    }

    updateViewport() {
        const transform = `translate(${this.viewport.x}px, ${this.viewport.y}px) scale(${this.viewport.zoom})`;
        this.componentsLayer.style.transform = transform;
        this.wires.svg.style.transform = transform;

        // Update stats
        const stats = document.getElementById('viewport-stats');
        stats.innerHTML = `<span>X: ${Math.round(this.viewport.x)} Y: ${Math.round(this.viewport.y)}</span><span>Zoom: ${Math.round(this.viewport.zoom * 100)}%</span>`;

        // Parallax grid
        const grid = document.getElementById('grid-background');
        grid.style.backgroundPosition = `${this.viewport.x}px ${this.viewport.y}px`;
    }

    setupControls() {
        document.getElementById('btn-clear').onclick = () => {
            if (confirm('Clear entire circuit?')) {
                this.engine.components = [];
                this.wires.wires = [];
                this.componentsLayer.innerHTML = '';
                this.wires.svg.innerHTML = '';
                this.engine.tickCount = 0;
            }
        };

        const playBtn = document.getElementById('btn-play-pause');
        playBtn.onclick = () => {
            if (this.engine.isRunning) {
                this.engine.stop();
                playBtn.classList.remove('active');
            } else {
                this.engine.start();
                playBtn.classList.add('active');
            }
        };
    }

    showProperties(comp) {
        const props = document.getElementById('properties-panel');
        const content = props.querySelector('.props-content');
        props.classList.remove('hidden');

        content.innerHTML = `
            <div class="prop-row">
                <label>ID:</label>
                <span>${comp.id}</span>
            </div>
            <div class="prop-row">
                <label>Type:</label>
                <span>${comp.type.toUpperCase()}</span>
            </div>
            <div class="prop-row">
                <label>Label:</label>
                <input type="text" value="${comp.label}" onchange="window.app.updateLabel('${comp.id}', this.value)">
            </div>
            ${comp.outputs.length > 0 ? `<button class="action-btn" onclick="window.app.attachScope('${comp.id}')">Attach Oscilloscope</button>` : ''}
            <button class="delete-btn" onclick="window.app.deleteComponent('${comp.id}')">Delete Component</button>
        `;
    }

    attachScope(id) {
        const comp = this.engine.components.find(c => c.id === id);
        if (comp && comp.outputs.length > 0) {
            window.oscilloscope.setTarget(comp.outputs[0]);
        }
    }

    updateLabel(id, val) {
        const comp = this.engine.components.find(c => c.id === id);
        if (comp) {
            comp.label = val;
            const el = document.getElementById(id);
            if (el) el.querySelector('.gate-label').textContent = val;
        }
    }

    deleteComponent(id) {
        if (this.engine.removeComponent(id)) {
            document.getElementById(id).remove();
            document.getElementById('properties-panel').classList.add('hidden');
            this.wires.drawWires(this.getPinPosition.bind(this));
        }
    }

    render() {
        const loop = () => {
            this.wires.drawWires(this.getPinPosition.bind(this));
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
