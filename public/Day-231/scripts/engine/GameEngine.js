import { StoryNodes } from '../data/adventure.js';
import { PlayerBase } from '../data/entities.js';

export default class GameEngine {
    constructor() {
        this.player = { ...PlayerBase };
        this.currentNode = 'START';
        this.terminal = null;
        this.isGameOver = false;
        this.flags = new Set();
    }

    attachTerminal(terminal) {
        this.terminal = terminal;
    }

    start() {
        this.updateHUD();
        this.processNode(this.currentNode);
    }

    processCommand(rawInput) {
        if (this.isGameOver) return "Neural link severed. Restart required.";

        const input = rawInput.toLowerCase().trim();
        const parts = input.split(' ');
        const cmd = parts[0];

        // Global Commands
        if (cmd === 'help') return "AVAILABLE_PROTOCOLS: [look, status, inv, scan, move <sector>]";
        if (cmd === 'status') return `HP: ${this.player.hp}/${this.player.maxHp} | ENERGY: ${this.player.energy}/${this.player.maxEnergy} | LVL: ${this.player.level}`;
        if (cmd === 'inv') return this.player.inventory.length > 0 ? `DECK_CARGO: ${this.player.inventory.join(', ')}` : "CARGO_HOLD_EMPTY.";

        // Node-specific Commands
        const node = StoryNodes[this.currentNode];
        if (node.actions && node.actions[cmd]) {
            return node.actions[cmd](this);
        }

        return `ERROR: Protocol '${cmd}' not recognized. Reach out to Zenith Support.`;
    }

    processNode(nodeId) {
        this.currentNode = nodeId;
        const node = StoryNodes[nodeId];

        this.terminal.write(node.description, 'active');
        if (node.onEnter) node.onEnter(this);
        this.updateHUD();
    }

    updateHUD() {
        document.getElementById('hp-bar').style.width = `${(this.player.hp / this.player.maxHp) * 100}%`;
        document.getElementById('en-bar').style.width = `${(this.player.energy / this.player.maxEnergy) * 100}%`;
        document.getElementById('player-name').textContent = this.player.name;
        document.getElementById('current-sector').textContent = this.currentNode;
    }
}
