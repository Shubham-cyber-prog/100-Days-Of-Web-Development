import BattleEngine from './engine/BattleEngine.js';
import ScriptCompiler from './engine/ScriptCompiler.js';
import UIManager from './ui/UIManager.js';
import AudioController from './assets/AudioController.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('ROGUE_SCRIPT_BOOT: Initializing combat kernel...');

    const ui = new UIManager();
    const sfx = new AudioController();
    const compiler = new ScriptCompiler(ui);
    const engine = new BattleEngine(ui, sfx, compiler);

    // Bootstrap listeners
    document.getElementById('btn-compile').addEventListener('click', () => engine.executePlayerTurn());
    document.getElementById('btn-clear-script').addEventListener('click', () => compiler.reset());

    // Setup command logic UI clickers
    document.querySelectorAll('.block').forEach(block => {
        block.addEventListener('click', () => {
            compiler.addStep(block.dataset.action);
            sfx.playKeypress();
        });
    });

    window.ROGUE = { engine, compiler, ui };
});
