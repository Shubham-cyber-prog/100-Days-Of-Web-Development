import Renderer from './Renderer.js';
import WorldModel from './WorldModel.js';

export default class StudioEngine {
    constructor(canvas, palette, tools) {
        this.canvas = canvas;
        this.palette = palette;
        this.tools = tools;
        this.world = new WorldModel(20, 20, 10); // 20x20 base, 10 high
        this.renderer = new Renderer(canvas, this.world);

        this.rotation = 0; // 0 to 3 for 90-deg increments
    }

    start() {
        this.renderer.render();
        this.setupInteraction();
    }

    setupInteraction() {
        this.canvas.addEventListener('mousedown', (e) => {
            const pos = this.renderer.getGridPosition(e.clientX, e.clientY);
            if (pos) {
                this.executeAction(pos.x, pos.y, pos.z);
            }
        });
    }

    executeAction(x, y, z) {
        const activeTool = this.tools.activeTool;
        const activeColor = this.palette.activeColor;

        if (activeTool === 'place') {
            this.world.setVoxel(x, y, z, activeColor);
        } else if (activeTool === 'erase') {
            this.world.setVoxel(x, y, z, null);
        }

        this.renderer.render();
        this.updateStats();
    }

    rotate(dir) {
        this.rotation = (this.rotation + dir + 4) % 4;
        this.renderer.setRotation(this.rotation);
        this.renderer.render();
    }

    clear() {
        if (confirm('REALLY_PURGE_GRID?')) {
            this.world.clear();
            this.renderer.render();
            this.updateStats();
        }
    }

    updateStats() {
        document.getElementById('voxel-count').textContent = this.world.count();
    }
}
