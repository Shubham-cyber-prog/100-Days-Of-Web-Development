import PuzzleEngine from './engine/PuzzleEngine.js';
import InteractionHandler from './engine/InteractionHandler.js';
import UIManager from './ui/UIManager.js';
import { Levels } from './data/levels.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('NEURAL_LINK_BOOT: Initializing logic mesh...');

    const canvas = document.getElementById('neural-canvas');
    const ui = new UIManager();
    const engine = new PuzzleEngine(canvas, ui);
    const interaction = new InteractionHandler(engine);

    // Load initial level
    engine.loadLevel(Levels[0]);

    // Setup global tools
    document.getElementById('btn-simulate').addEventListener('click', () => engine.evaluate());
    document.getElementById('btn-reset').addEventListener('click', () => engine.reset());

    // Expose for debugging
    window.NEURAL = { engine, interaction };
});
