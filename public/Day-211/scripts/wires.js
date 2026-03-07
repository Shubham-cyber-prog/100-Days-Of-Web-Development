/**
 * Wire Management and Bezier Drawing
 */

class Wire {
    constructor(id, fromPin, toPin) {
        this.id = id || `wire_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        this.fromPin = fromPin; // Must be an output pin
        this.toPin = toPin;     // Must be an input pin
        this.state = 0;
        this.element = null;
    }

    update() {
        this.state = this.fromPin.state;
        this.toPin.state = this.state;

        if (this.element) {
            this.element.setAttribute('class', `wire ${this.state === 1 ? 'high' : 'low'}`);
        }
    }

    getPath(viewportShift = { x: 0, y: 0 }, zoom = 1) {
        // We need to get the actual positions of the pins
        // This will be handled by the interaction/engine script
        // by passing the calculated coordinates
        return '';
    }
}

class WireSystem {
    constructor(svgElement) {
        this.svg = svgElement;
        this.wires = [];
    }

    addWire(fromPin, toPin) {
        // Prevent duplicate wires between same pins
        const exists = this.wires.find(w => w.fromPin.id === fromPin.id && w.toPin.id === toPin.id);
        if (exists) return exists;

        const wire = new Wire(null, fromPin, toPin);
        this.wires.push(wire);

        // Create SVG element
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('id', wire.id);
        path.setAttribute('class', 'wire low');
        this.svg.appendChild(path);
        wire.element = path;

        return wire;
    }

    removeWire(wireId) {
        const index = this.wires.findIndex(w => w.id === wireId);
        if (index > -1) {
            const wire = this.wires[index];
            if (wire.element) wire.element.remove();
            this.wires.splice(index, 1);
            return true;
        }
        return false;
    }

    getWiresForPin(pinId) {
        return this.wires.filter(w => w.fromPin.id === pinId || w.toPin.id === pinId);
    }

    update() {
        this.wires.forEach(w => w.update());
    }

    drawWires(getPinPosFn) {
        this.wires.forEach(wire => {
            const p1 = getPinPosFn(wire.fromPin);
            const p2 = getPinPosFn(wire.toPin);

            if (p1 && p2) {
                const d = this.calculateBezier(p1, p2);
                wire.element.setAttribute('d', d);
            }
        });
    }

    calculateBezier(p1, p2) {
        const dx = Math.abs(p1.x - p2.x) * 0.5;
        const cx1 = p1.x + dx;
        const cy1 = p1.y;
        const cx2 = p2.x - dx;
        const cy2 = p2.y;

        return `M ${p1.x} ${p1.y} C ${cx1} ${cy1} ${cx2} ${cy2} ${p2.x} ${p2.y}`;
    }
}

window.WireSystem = WireSystem;
