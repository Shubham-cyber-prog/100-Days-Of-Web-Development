/**
 * Packet Lifecycle Simulation
 * Manages the generation, traversal, and inspection of network packets.
 */

import { idsEngine } from '../core/ids.js';

export class PacketSimulator {
    constructor(nodes, links) {
        this.nodes = nodes;
        this.links = links;
        this.packets = [];
        this.maxPackets = 50;
    }

    spawnPacket() {
        if (this.packets.length >= this.maxPackets) return;

        const srcIdx = Math.floor(Math.random() * this.nodes.length);
        const dstIdx = Math.floor(Math.random() * this.nodes.length);
        if (srcIdx === dstIdx) return;

        // Generate synthetic payload
        const malicious = Math.random() < 0.1;
        const payload = malicious ? "SHELL_EXEC_0xCC_BUFFER" : "REQ_STATUS_MTU_1500";

        const packet = {
            id: 'PKT_' + Math.random().toString(36).substr(2, 5),
            source: srcIdx,
            target: dstIdx,
            progress: 0,
            speed: 0.02 + Math.random() * 0.05,
            payload: payload,
            flags: malicious ? ['URG', 'PSH'] : ['ACK'],
            isMalicious: malicious
        };

        this.packets.push(packet);
    }

    update() {
        for (let i = this.packets.length - 1; i >= 0; i--) {
            const p = this.packets[i];
            p.progress += p.speed;

            if (p.progress >= 1) {
                // Inspection on arrival
                const result = idsEngine.analyzePacket(p);
                this.onArrival(p, result);
                this.packets.splice(i, 1);
            }
        }

        if (Math.random() < 0.2) this.spawnPacket();
    }

    onArrival(packet, result) {
        // Dispatched to console and UI handlers
        const event = new CustomEvent('packet-arrival', {
            detail: { packet, result }
        });
        window.dispatchEvent(event);
    }
}
