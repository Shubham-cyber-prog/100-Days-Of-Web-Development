/**
 * UI Controls Controller
 * Bridges simulation parameters with the interactive HUD.
 */

import { simulator } from '../core/sph.js';

class UIController {
    constructor() {
        this.setupListeners();
    }

    setupListeners() {
        // Toggle Simulation
        const btnPlay = document.getElementById('btn-play');
        if (btnPlay) {
            btnPlay.addEventListener('click', () => {
                simulator.isRunning = !simulator.isRunning;
                btnPlay.textContent = simulator.isRunning ? 'PAUSE SIM' : 'RESUME SIM';
            });
        }

        // Reset Simulation
        document.getElementById('btn-reset').addEventListener('click', () => {
            simulator.particles = [];
            simulator.spawnBlock(200, 100, 30, 40);
            simulator.isRunning = false;
            if (btnPlay) btnPlay.textContent = 'START SIM';
        });

        // Sliders
        this.bindSlider('param-gravity', 'gravity');
        this.bindSlider('param-viscosity', 'viscosity');
        this.bindSlider('param-stiffness', 'stiffness');
        this.bindSlider('param-density', 'restDensity');
    }

    bindSlider(id, param) {
        const slider = document.getElementById(id);
        if (slider) {
            slider.addEventListener('input', (e) => {
                simulator.params[param] = parseFloat(e.target.value);
            });
        }
    }
}

export const ui = new UIController();
