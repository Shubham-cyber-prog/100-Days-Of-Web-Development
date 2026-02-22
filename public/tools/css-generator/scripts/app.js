/**
 * Main Controller for CSS Generator
 */

import { ShadowGenerator } from './generators/shadow.js';
import { GradientGenerator } from './generators/gradient.js';
import { FlexboxGenerator } from './generators/flexbox.js';
import { PreviewBox } from './ui/previewBox.js';
import { CodeOutput } from './ui/codeOutput.js';

class App {
    constructor() {
        // Initialize Modules
        this.generators = {
            shadow: new ShadowGenerator(),
            gradient: new GradientGenerator(),
            flexbox: new FlexboxGenerator()
        };

        this.preview = new PreviewBox();
        this.output = new CodeOutput();

        this.currentTool = 'shadow';

        // Debounce for history
        this.historyTimeout = null;

        this.init();
    }

    init() {
        this.bindGlobalEvents();
        this.bindShadowEvents();
        this.bindGradientEvents();
        this.bindFlexboxEvents();

        // Initial Update
        this.updateAll();
    }

    updateAll() {
        const css = this.generators[this.currentTool].getCSS();
        this.preview.update(css);
        this.output.update(css);

        // Add to history (debounced)
        clearTimeout(this.historyTimeout);
        this.historyTimeout = setTimeout(() => {
            this.output.addToHistory(css);
        }, 1000); // Only add to history after 1s of inactivity
    }

    setTool(tool) {
        this.currentTool = tool;
        this.preview.setMode(tool);

        // Update UI Tabs
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`[data-tool="${tool}"]`).classList.add('active');

        // Update Content Panels
        document.querySelectorAll('.tool-content').forEach(c => c.classList.remove('active'));
        document.getElementById(`${tool}-controls`).classList.add('active');

        this.updateAll();
    }

    bindGlobalEvents() {
        // Tab Switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setTool(btn.dataset.tool);
            });
        });

        // History Restoration (Global Custom Event)
        // Note: Full restoration requires state mapping which is complex. 
        // For now, we rely on the preview update only, UI inputs won't sync back 
        // in this basic version to save LOC complexity, but logic is here.
        document.addEventListener('restore-state', (e) => {
            // e.detail contains the CSS object. We can visualize it.
            // Note: Inputs won't update in this simplified logic.
            this.preview.update(e.detail);
            this.output.update(e.detail);
        });
    }

    // Helper to bind range inputs to generator updates
    bindInput(id, key, generatorName, suffix = '') {
        const el = document.getElementById(id);
        const display = el.nextElementSibling; // Value display span

        el.addEventListener('input', (e) => {
            const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

            // Update Generator State
            this.generators[generatorName].update(key, val);

            // Update Display Text if exists
            if (display && display.classList.contains('value-display')) {
                display.textContent = val + suffix;
            }

            this.updateAll();
        });
    }

    bindShadowEvents() {
        this.bindInput('shadow-x', 'x', 'shadow', 'px');
        this.bindInput('shadow-y', 'y', 'shadow', 'px');
        this.bindInput('shadow-blur', 'blur', 'shadow', 'px');
        this.bindInput('shadow-spread', 'spread', 'shadow', 'px');
        this.bindInput('shadow-color', 'color', 'shadow');
        this.bindInput('shadow-inset', 'inset', 'shadow');
    }

    bindGradientEvents() {
        // Type change logic
        document.getElementById('gradient-type').addEventListener('change', (e) => {
            const type = e.target.value;
            this.generators.gradient.update('type', type);
            // Hide angle for radial
            document.getElementById('angle-control').style.display = type === 'radial' ? 'none' : 'block';
            this.updateAll();
        });

        this.bindInput('gradient-angle', 'angle', 'gradient', 'deg');
        this.bindInput('gradient-color1', 'color1', 'gradient');
        this.bindInput('gradient-color2', 'color2', 'gradient');
    }

    bindFlexboxEvents() {
        // Buttons for Direction
        const dirBtns = document.getElementById('flex-direction').querySelectorAll('button');
        dirBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                dirBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.generators.flexbox.update('direction', btn.dataset.val);
                this.updateAll();
            });
        });

        // Selects
        const bindSelect = (id, key) => {
            document.getElementById(id).addEventListener('change', (e) => {
                this.generators.flexbox.update(key, e.target.value);
                this.updateAll();
            });
        };

        bindSelect('flex-justify', 'justify');
        bindSelect('flex-align', 'align');
        this.bindInput('flex-gap', 'gap', 'flexbox', 'px');
    }
}

// Start
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
