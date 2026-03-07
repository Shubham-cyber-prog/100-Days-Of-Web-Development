/**
 * Persistence Layer
 */

class StorageSystem {
    static saveCircuit(engine, wires) {
        const data = {
            components: engine.components.map(c => ({
                id: c.id,
                type: c.type,
                x: c.x,
                y: c.y,
                label: c.label,
                state: c.state,
                isOn: c.isOn || false,
                frequency: c.frequency || 1
            })),
            wires: wires.wires.map(w => ({
                fromPinId: w.fromPin.id,
                toPinId: w.toPin.id
            }))
        };

        const json = JSON.stringify(data);
        localStorage.setItem('logic_sim_circuit', json);

        // Also provide as download
        this.downloadJSON(json, 'circuit.json');
        return true;
    }

    static loadCircuit(app) {
        const json = localStorage.getItem('logic_sim_circuit');
        if (!json) return false;

        try {
            const data = JSON.parse(json);
            this.applyData(app, data);
            return true;
        } catch (e) {
            console.error('Failed to load circuit', e);
            return false;
        }
    }

    static applyData(app, data) {
        // Clear current
        app.engine.components = [];
        app.wires.wires = [];
        app.componentsLayer.innerHTML = '';
        app.wires.svg.innerHTML = '';

        // Create components
        data.components.forEach(cData => {
            const comp = app.createComponent(cData.type, cData.x, cData.y, cData.id);
            comp.label = cData.label;
            comp.state = cData.state;
            if (cData.type === 'switch') comp.isOn = cData.isOn;
            if (cData.type === 'clock') comp.frequency = cData.frequency;

            // Update visual label
            const el = document.getElementById(comp.id);
            if (el) el.querySelector('.gate-label').textContent = comp.label;
        });

        // Create wires
        data.wires.forEach(wData => {
            const fromPin = this.findPin(app.engine.components, wData.fromPinId);
            const toPin = this.findPin(app.engine.components, wData.toPinId);
            if (fromPin && toPin) {
                app.wires.addWire(fromPin, toPin);
            }
        });

        app.wires.drawWires(app.getPinPosition.bind(app));
    }

    static findPin(components, pinId) {
        for (const comp of components) {
            const pin = [...comp.inputs, ...comp.outputs].find(p => p.id === pinId);
            if (pin) return pin;
        }
        return null;
    }

    static downloadJSON(json, filename) {
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Hook into UI
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-save').onclick = () => {
        StorageSystem.saveCircuit(window.app.engine, window.app.wires);
    };

    document.getElementById('btn-load').onclick = () => {
        if (StorageSystem.loadCircuit(window.app)) {
            alert('Circuit loaded successfully!');
        } else {
            alert('No saved circuit found.');
        }
    };
});
