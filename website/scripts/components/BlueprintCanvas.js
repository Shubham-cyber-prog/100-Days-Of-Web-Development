/**
 * Blueprint Canvas Component
 * Interactive SVG-based collaborative engine
 * Issue #1158
 */

export class BlueprintCanvas {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.svg = null;
        this.nodesLayer = null;
        this.linksLayer = null;
        this.presenceLayer = null;
        this.draggedElement = null;
        this.offset = { x: 0, y: 0 };
        this.zoom = 1;
        this.isPanning = false;

        this.init();
    }

    init() {
        this.createSVG();
        this.setupListeners();
        this.render();

        // Listen for service updates
        if (window.Blueprint) {
            window.Blueprint.onUpdate = () => this.render();
            window.Blueprint.onPresenceUpdate = (presence) => this.renderPresence(presence);
        }
    }

    createSVG() {
        this.container.innerHTML = '';
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("width", "100%");
        this.svg.setAttribute("height", "100%");
        this.svg.style.cursor = 'crosshair';
        this.svg.classList.add('blueprint-svg');

        // Add pattern for grid
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        defs.innerHTML = `
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
            </pattern>
        `;
        this.svg.appendChild(defs);

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width", "100%");
        rect.setAttribute("height", "100%");
        rect.setAttribute("fill", "url(#grid)");
        this.svg.appendChild(rect);

        this.linksLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.nodesLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.presenceLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");

        this.svg.appendChild(this.linksLayer);
        this.svg.appendChild(this.nodesLayer);
        this.svg.appendChild(this.presenceLayer);
        this.container.appendChild(this.svg);
    }

    setupListeners() {
        this.svg.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.svg.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.svg.addEventListener('mouseup', () => this.onMouseUp());
        this.svg.addEventListener('dblclick', (e) => this.onDoubleClick(e));

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Delete' && this.selectedId) {
                window.Blueprint.deleteNode(this.selectedId);
                this.selectedId = null;
                this.render();
            }
        });
    }

    onMouseDown(e) {
        const target = e.target.closest('.node-group');
        if (target) {
            this.draggedElement = target;
            this.selectedId = target.dataset.id;
            const pt = this.getSVGPoint(e);
            const node = window.Blueprint.nodes.get(this.selectedId);
            this.offset = {
                x: pt.x - node.x,
                y: pt.y - node.y
            };
            this.draggedElement.classList.add('dragging');
        } else {
            this.selectedId = null;
            this.render();
        }
    }

    onMouseMove(e) {
        const pt = this.getSVGPoint(e);

        if (this.draggedElement && this.selectedId) {
            window.Blueprint.updateNode(this.selectedId, {
                x: pt.x - this.offset.x,
                y: pt.y - this.offset.y
            });
            this.render(); // Re-render for links
        }

        // Broadast presence
        if (window.Blueprint) {
            window.Blueprint.updatePresence(window.Blueprint.userId, {
                x: pt.x,
                y: pt.y,
                name: window.Blueprint.userName
            });
        }
    }

    onMouseUp() {
        if (this.draggedElement) {
            this.draggedElement.classList.remove('dragging');
            this.draggedElement = null;
        }
    }

    onDoubleClick(e) {
        if (e.target.closest('.node-group')) return;
        const pt = this.getSVGPoint(e);
        const id = 'node_' + Date.now();
        window.Blueprint.updateNode(id, {
            x: pt.x,
            y: pt.y,
            title: 'New Objective',
            type: 'task'
        });
        this.render();
    }

    getSVGPoint(e) {
        const pt = this.svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        return pt.matrixTransform(this.svg.getScreenCTM().inverse());
    }

    render() {
        if (!window.Blueprint) return;

        this.nodesLayer.innerHTML = '';
        this.linksLayer.innerHTML = '';

        const nodes = window.Blueprint.getNodes();
        const links = window.Blueprint.getLinks();

        // Render Links
        links.forEach(link => {
            const from = window.Blueprint.nodes.get(link.from);
            const to = window.Blueprint.nodes.get(link.to);
            if (from && to) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", from.x + 60);
                line.setAttribute("y1", from.y + 30);
                line.setAttribute("x2", to.x + 60);
                line.setAttribute("y2", to.y + 30);
                line.setAttribute("stroke", "rgba(139, 92, 246, 0.4)");
                line.setAttribute("stroke-width", "2");
                line.setAttribute("stroke-dasharray", "5,5");
                this.linksLayer.appendChild(line);
            }
        });

        // Render Nodes
        nodes.forEach(node => {
            const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
            group.setAttribute("class", `node-group ${this.selectedId === node.id ? 'selected' : ''}`);
            group.setAttribute("transform", `translate(${node.x}, ${node.y})`);
            group.setAttribute("data-id", node.id);

            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("width", "120");
            rect.setAttribute("height", "60");
            rect.setAttribute("rx", "12");
            rect.setAttribute("class", "node-rect");

            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "60");
            text.setAttribute("y", "35");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("class", "node-text");
            text.textContent = node.title || 'Node';

            group.appendChild(rect);
            group.appendChild(text);
            this.nodesLayer.appendChild(group);
        });
    }

    renderPresence(presence) {
        this.presenceLayer.innerHTML = '';
        presence.forEach((data, id) => {
            if (id === window.Blueprint.userId) return; // Don't render self

            // Simple ghost cursor
            const cursor = document.createElementNS("http://www.w3.org/2000/svg", "g");
            cursor.setAttribute("transform", `translate(${data.x}, ${data.y})`);

            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("r", "5");
            circle.setAttribute("fill", "#8B5CF6");
            circle.setAttribute("opacity", "0.6");

            const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute("x", "10");
            label.setAttribute("y", "5");
            label.setAttribute("font-size", "10");
            label.setAttribute("fill", "white");
            label.textContent = data.name || 'User';

            cursor.appendChild(circle);
            cursor.appendChild(label);
            this.presenceLayer.appendChild(cursor);
        });
    }
}
