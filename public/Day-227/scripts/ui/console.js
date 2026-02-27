/**
 * SOC Console Controller
 * Manages the real-time log stream and threat activity reporting.
 */

class ConsoleController {
    constructor() {
        this.container = document.getElementById('ids-console');
        this.threatLevel = document.getElementById('level-val');
        this.packetInspector = {
            src: document.getElementById('p-src'),
            dst: document.getElementById('p-dst'),
            proto: document.getElementById('p-proto'),
            sig: document.getElementById('p-sig')
        };

        this.setupListeners();
    }

    setupListeners() {
        window.addEventListener('packet-arrival', (e) => {
            const { packet, result } = e.detail;
            this.handleArrival(packet, result);
        });
    }

    handleArrival(packet, result) {
        // Update Inspector
        this.updateInspector(packet, result);

        // Update Logs if threat detected
        if (result.status === 'THREAT_DETECTED') {
            this.log(`THREAT_ALERT: ${result.signature} detected from SRC_${packet.source}`, 'threat');
            this.escalateThreat(result.level);
        } else if (Math.random() < 0.05) {
            this.log(`INBOUND: Clean handshake from ADDR_${packet.source}`, 'system');
        }
    }

    log(msg, type = 'system') {
        if (!this.container) return;
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = `> [${new Date().toLocaleTimeString()}] ${msg}`;
        this.container.prepend(entry);

        // Cap log size
        if (this.container.children.length > 50) {
            this.container.removeChild(this.container.lastChild);
        }
    }

    updateInspector(p, r) {
        if (!this.packetInspector.src) return;
        this.packetInspector.src.textContent = `10.0.0.${p.source}`;
        this.packetInspector.dst.textContent = `10.0.0.${p.target}`;
        this.packetInspector.proto.textContent = p.flags[0] || 'TCP';

        const sig = this.packetInspector.sig;
        sig.textContent = r.status === 'CLEAN' ? 'CLEAN' : r.signature;
        sig.className = r.status === 'CLEAN' ? 'sig-ok' : 'sig-threat';
    }

    escalateThreat(level) {
        if (!this.threatLevel) return;
        this.threatLevel.textContent = level;
        this.threatLevel.className = `level-${level.toLowerCase() === 'critical' ? 'high' : 'low'}`;

        // Auto-recovery after 5 seconds
        setTimeout(() => {
            this.threatLevel.textContent = 'LOW';
            this.threatLevel.className = 'level-low';
        }, 5000);
    }
}

// Global UI overrides
const style = document.createElement('style');
style.textContent = `
    .sig-threat { color: #ff0000; font-weight: 700; animation: blink 1s infinite; }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
`;
document.head.appendChild(style);

export const consoleController = new ConsoleController();
