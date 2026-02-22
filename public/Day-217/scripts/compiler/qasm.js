/**
 * OpenQASM 2.0 parser/exporter
 */

class QASMCompiler {
    static export(grid) {
        let qasm = "OPENQASM 2.0;\ninclude \"qelib1.inc\";\n\n";
        let numQubits = grid.length;
        qasm += `qreg q[${numQubits}];\ncreg c[${numQubits}];\n\n`;

        for (let s = 0; s < grid[0].length; s++) {
            for (let q = 0; q < numQubits; q++) {
                let gate = grid[q][s];
                if (gate) {
                    if (gate === 'CX') {
                        // For simplicity, CNOTs are handled specially if we track target
                        // This UI needs more logic for control/target
                    } else {
                        qasm += `${gate.toLowerCase()} q[${q}];\n`;
                    }
                }
            }
        }
        return qasm;
    }

    static download(qasm) {
        const blob = new Blob([qasm], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'circuit.qasm';
        a.click();
    }
}

window.QASMCompiler = QASMCompiler;
