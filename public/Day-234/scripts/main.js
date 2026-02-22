import StudioEngine from './engine/StudioEngine.js';
import PaletteManager from './ui/PaletteManager.js';
import ToolManager from './ui/ToolManager.js';
import StorageController from './utils/StorageController.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('VOXEL_STUDIO_BOOT: Initializing 3D sandbox...');

    const canvas = document.getElementById('voxel-canvas');
    const palette = new PaletteManager();
    const tools = new ToolManager();
    const studio = new StudioEngine(canvas, palette, tools);

    // Initial config
    palette.init();
    tools.init(studio);
    studio.start();

    // Global listeners
    document.getElementById('btn-rotate-l').addEventListener('click', () => studio.rotate(-1));
    document.getElementById('btn-rotate-r').addEventListener('click', () => studio.rotate(1));
    document.getElementById('btn-clear').addEventListener('click', () => studio.clear());

    window.VOXEL_STUDIO = { studio, palette, tools };
});
