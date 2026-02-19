/**
 * Intrusion Detection System (IDS) Heuristics
 * Analyzes packet metadata and network flows for anomalous behavior.
 */

export class IDS {
    constructor() {
        this.signatures = [
            { id: 'DDOS_BURST', threshold: 50, window: 1000 },
            { id: 'RECON_SCAN', pattern: 'sequential_ports' },
            { id: 'SYSLOG_BRUTE', pattern: 'ssh_retry' }
        ];
        this.stats = { totalAnalyzed: 0, threatsBlocked: 0 };
    }

    analyzePacket(packet) {
        this.stats.totalAnalyzed++;

        // Simulating heuristic checks
        const entropy = this.calculateEntropy(packet.payload);
        const isAnomalous = entropy > 3.8 || packet.flags.includes('URG');

        if (isAnomalous) {
            return {
                status: 'THREAT_DETECTED',
                signature: 'HEURISTIC_ENTROPY_HIGH',
                level: 'CRITICAL',
                timestamp: Date.now()
            };
        }

        // Check for specific malicious patterns in pseudo-payload
        if (packet.payload.includes('0xCC') || packet.payload.includes('SHELL')) {
            return {
                status: 'THREAT_DETECTED',
                signature: 'MALICIOUS_PAYLOAD_SIGNATURE',
                level: 'HIGH',
                timestamp: Date.now()
            };
        }

        return { status: 'CLEAN' };
    }

    calculateEntropy(str) {
        const len = str.length;
        const freq = {};
        for (let char of str) freq[char] = (freq[char] || 0) + 1;

        let entropy = 0;
        for (let char in freq) {
            const p = freq[char] / len;
            entropy -= p * Math.log2(p);
        }
        return entropy;
    }
}

export const idsEngine = new IDS();
