class InputHandler {
    constructor(engine) {
        this.engine = engine;
        this.canvas = engine.canvas;
        this.mouse = { x: 0, y: 0, isDown: false };
        this.draggedBody = null;
        this.mouseConstraint = null;

        this.selectedTool = 'circle'; // circle, box, link, drag, explode
        this.linkStart = null;

        this.init();
    }

    init() {
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('mouseup', () => this.handleMouseUp());
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    handleMouseDown(e) {
        const pos = this.getMousePos(e);
        this.mouse.x = pos.x;
        this.mouse.y = pos.y;
        this.mouse.isDown = true;

        if (this.selectedTool === 'drag') {
            this.draggedBody = this.findBodyAt(pos);
            if (this.draggedBody) {
                this.mouseConstraint = new PivotConstraint(this.draggedBody, { x: pos.x, y: pos.y }, 0, 0.1);
                this.engine.addConstraint(this.mouseConstraint);
            }
        } else if (this.selectedTool === 'circle') {
            this.engine.addBody(new CircleBody(pos.x, pos.y, 15 + Math.random() * 20, {
                color: this.getRandomColor()
            }));
        } else if (this.selectedTool === 'box') {
            this.engine.addBody(new BoxBody(pos.x, pos.y, 40, 40, {
                color: this.getRandomColor()
            }));
        } else if (this.selectedTool === 'link') {
            const body = this.findBodyAt(pos);
            if (body) {
                if (!this.linkStart) {
                    this.linkStart = body;
                    body.color = '#ffffff';
                } else {
                    const dist = Math.sqrt(
                        Math.pow(body.position.x - this.linkStart.position.x, 2) +
                        Math.pow(body.position.y - this.linkStart.position.y, 2)
                    );
                    this.engine.addConstraint(new Constraint(this.linkStart, body, dist, 0.5));
                    this.linkStart = null;
                }
            }
        } else if (this.selectedTool === 'explode') {
            this.explode(pos);
        }
    }

    handleMouseMove(e) {
        const pos = this.getMousePos(e);
        this.mouse.x = pos.x;
        this.mouse.y = pos.y;

        if (this.mouseConstraint) {
            this.mouseConstraint.point.x = pos.x;
            this.mouseConstraint.point.y = pos.y;
        }
    }

    handleMouseUp() {
        this.mouse.isDown = false;
        if (this.mouseConstraint) {
            const index = this.engine.constraints.indexOf(this.mouseConstraint);
            if (index > -1) this.engine.constraints.splice(index, 1);
            this.mouseConstraint = null;
        }
        this.draggedBody = null;
    }

    findBodyAt(pos) {
        for (const body of this.engine.bodies) {
            if (body.type === 'circle') {
                const dx = body.position.x - pos.x;
                const dy = body.position.y - pos.y;
                if (dx * dx + dy * dy < body.radius * body.radius) return body;
            } else if (body.type === 'box') {
                const hw = body.width / 2;
                const hh = body.height / 2;
                if (pos.x > body.position.x - hw && pos.x < body.position.x + hw &&
                    pos.y > body.position.y - hh && pos.y < body.position.y + hh) return body;
            }
        }
        return null;
    }

    explode(pos) {
        const force = 10;
        const radius = 200;
        for (const body of this.engine.bodies) {
            if (body.isStatic) continue;
            const dx = body.position.x - pos.x;
            const dy = body.position.y - pos.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < radius * radius) {
                const dist = Math.sqrt(distSq);
                const strength = (1 - dist / radius) * force;
                body.oldPosition.x -= (dx / dist) * strength;
                body.oldPosition.y -= (dy / dist) * strength;
            }
        }
    }

    getRandomColor() {
        const colors = ['#38bdf8', '#fb7185', '#34d399', '#fbbf24', '#a78bfa'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    setTool(tool) {
        this.selectedTool = tool;
        this.linkStart = null;
    }
}

window.InputHandler = InputHandler;
