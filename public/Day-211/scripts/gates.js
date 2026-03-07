/**
 * Logic Gate Definitions
 */

class LogicComponent {
    constructor(id, type, x, y) {
        this.id = id || `comp_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        this.type = type;
        this.x = x;
        this.y = y;
        this.inputs = [];
        this.outputs = [];
        this.state = 0; // Output state
        this.label = type.toUpperCase();
    }

    addPin(type, id) {
        const pin = {
            id: id || `${this.id}_pin_${type}_${this.inputs.length + this.outputs.length}`,
            type: type, // 'input' or 'output'
            state: 0,
            connectedTo: [], // Array of wire IDs
            parentId: this.id
        };
        if (type === 'input') this.inputs.push(pin);
        else this.outputs.push(pin);
        return pin;
    }

    update() {
        // To be overridden by subclasses
    }
}

class AndGate extends LogicComponent {
    constructor(id, x, y) {
        super(id, 'and', x, y);
        this.addPin('input');
        this.addPin('input');
        this.addPin('output');
    }

    update() {
        const result = this.inputs.every(p => p.state === 1) ? 1 : 0;
        this.state = result;
        this.outputs[0].state = result;
    }
}

class OrGate extends LogicComponent {
    constructor(id, x, y) {
        super(id, 'or', x, y);
        this.addPin('input');
        this.addPin('input');
        this.addPin('output');
    }

    update() {
        const result = this.inputs.some(p => p.state === 1) ? 1 : 0;
        this.state = result;
        this.outputs[0].state = result;
    }
}

class NotGate extends LogicComponent {
    constructor(id, x, y) {
        super(id, 'not', x, y);
        this.addPin('input');
        this.addPin('output');
    }

    update() {
        const result = this.inputs[0].state === 1 ? 0 : 1;
        this.state = result;
        this.outputs[0].state = result;
    }
}

class XorGate extends LogicComponent {
    constructor(id, x, y) {
        super(id, 'xor', x, y);
        this.addPin('input');
        this.addPin('input');
        this.addPin('output');
    }

    update() {
        const result = this.inputs.filter(p => p.state === 1).length % 2 === 1 ? 1 : 0;
        this.state = result;
        this.outputs[0].state = result;
    }
}

class NandGate extends LogicComponent {
    constructor(id, x, y) {
        super(id, 'nand', x, y);
        this.addPin('input');
        this.addPin('input');
        this.addPin('output');
    }

    update() {
        const result = this.inputs.every(p => p.state === 1) ? 0 : 1;
        this.state = result;
        this.outputs[0].state = result;
    }
}

class NorGate extends LogicComponent {
    constructor(id, x, y) {
        super(id, 'nor', x, y);
        this.addPin('input');
        this.addPin('input');
        this.addPin('output');
    }

    update() {
        const result = this.inputs.some(p => p.state === 1) ? 0 : 1;
        this.state = result;
        this.outputs[0].state = result;
    }
}

class SwitchComponent extends LogicComponent {
    constructor(id, x, y) {
        super(id, 'switch', x, y);
        this.addPin('output');
        this.isOn = false;
        this.label = 'SWITCH';
    }

    toggle() {
        this.isOn = !this.isOn;
        this.state = this.isOn ? 1 : 0;
        this.outputs[0].state = this.state;
    }

    update() {
        this.outputs[0].state = this.isOn ? 1 : 0;
    }
}

class BulbComponent extends LogicComponent {
    constructor(id, x, y) {
        super(id, 'bulb', x, y);
        this.addPin('input');
        this.label = 'LIGHT';
    }

    update() {
        this.state = this.inputs[0].state;
    }
}

class ClockComponent extends LogicComponent {
    constructor(id, x, y) {
        super(id, 'clock', x, y);
        this.addPin('output');
        this.frequency = 1; // Ticks per toggle
        this.counter = 0;
        this.label = 'CLOCK';
    }

    update() {
        this.counter++;
        if (this.counter >= this.frequency) {
            this.state = this.state === 1 ? 0 : 1;
            this.counter = 0;
        }
        this.outputs[0].state = this.state;
    }
}

window.ComponentFactory = {
    create(type, x, y, id) {
        switch (type) {
            case 'and': return new AndGate(id, x, y);
            case 'or': return new OrGate(id, x, y);
            case 'not': return new NotGate(id, x, y);
            case 'xor': return new XorGate(id, x, y);
            case 'nand': return new NandGate(id, x, y);
            case 'nor': return new NorGate(id, x, y);
            case 'switch': return new SwitchComponent(id, x, y);
            case 'bulb': return new BulbComponent(id, x, y);
            case 'clock': return new ClockComponent(id, x, y);
            default: return null;
        }
    }
};
