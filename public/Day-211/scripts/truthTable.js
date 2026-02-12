/**
 * Truth Table Generator
 */

class TruthTableGenerator {
    static generate(engine) {
        // 1. Identify all inputs (Switches)
        const inputs = engine.components.filter(c => c.type === 'switch');
        // 2. Identify all outputs (Bulbs)
        const outputs = engine.components.filter(c => c.type === 'bulb');

        if (inputs.length === 0 || outputs.length === 0) {
            alert('Circuit must have at least one Switch (Input) and one Bulb (Output).');
            return null;
        }

        if (inputs.length > 8) {
            alert('Too many inputs for truth table (max 8).');
            return null;
        }

        const combinations = Math.pow(2, inputs.length);
        const table = [];

        // Save current state
        const originalStates = inputs.map(i => i.isOn);

        for (let i = 0; i < combinations; i++) {
            const row = {
                inputs: [],
                outputs: []
            };

            // Set inputs for this combination
            for (let j = 0; j < inputs.length; j++) {
                const bit = (i >> (inputs.length - 1 - j)) & 1;
                inputs[j].isOn = bit === 1;
                row.inputs.push(bit);
            }

            // Let simulation settle
            for (let pass = 0; pass < 20; pass++) {
                engine.components.forEach(c => c.update());
                if (engine.wires) engine.wires.update();
            }

            // Read outputs
            outputs.forEach(o => {
                row.outputs.push(o.inputs[0].state);
            });

            table.push(row);
        }

        // Restore original state
        inputs.forEach((input, idx) => {
            input.isOn = originalStates[idx];
        });
        engine.updateUI();

        return {
            inputLabels: inputs.map(i => i.label || 'In'),
            outputLabels: outputs.map(o => o.label || 'Out'),
            rows: table
        };
    }

    static showModal(data) {
        const modal = document.getElementById('modal-container');
        const body = document.getElementById('modal-body');
        modal.classList.remove('hidden');

        let html = '<table><thead><tr>';
        data.inputLabels.forEach(l => html += `<th>${l}</th>`);
        html += '<th class="divider-col"></th>';
        data.outputLabels.forEach(l => html += `<th>${l}</th>`);
        html += '</tr></thead><tbody>';

        data.rows.forEach(row => {
            html += '<tr>';
            row.inputs.forEach(val => html += `<td class="${val === 1 ? 'high' : 'low'}">${val}</td>`);
            html += '<td class="divider-col"></td>';
            row.outputs.forEach(val => html += `<td class="${val === 1 ? 'high' : 'low'}">${val}</td>`);
            html += '</tr>';
        });

        html += '</tbody></table>';
        body.innerHTML = html;
    }
}

// Add styles for table
const style = document.createElement('style');
style.textContent = `
    .modal-body table { width: 100%; border-collapse: collapse; font-family: 'Fira Code', monospace; }
    .modal-body th { padding: 10px; border-bottom: 2px solid var(--border); text-align: center; color: var(--accent); }
    .modal-body td { padding: 10px; border-bottom: 1px solid var(--border); text-align: center; }
    .modal-body td.high { color: #00ff88; font-weight: bold; }
    .modal-body td.low { color: #ff4444; }
    .divider-col { width: 10px; background: var(--border); padding: 0 !important; }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-truth-table').onclick = () => {
        const data = TruthTableGenerator.generate(window.app.engine);
        if (data) TruthTableGenerator.showModal(data);
    };

    document.getElementById('close-modal').onclick = () => {
        document.getElementById('modal-container').classList.add('hidden');
    };
});
