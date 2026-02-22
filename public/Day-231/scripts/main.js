import GameEngine from './engine/GameEngine.js';
import TerminalController from './engine/TerminalController.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('ZENITH_CORE_INIT: Starting bootstrap sequence...');

    // Initialize Core Modules
    const engine = new GameEngine();
    const terminal = new TerminalController(engine);

    // Link modules
    engine.attachTerminal(terminal);

    // Start Game
    engine.start();

    // Global exposure for debugging if needed
    window.ZENITH = {
        engine,
        terminal
    };
});
