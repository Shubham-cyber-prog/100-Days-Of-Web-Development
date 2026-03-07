/**
 * Logic for Exporting and Saving simulation state
 */

class SimulationExporter {
    static save(sim, obstacles) {
        const state = {
            particles: sim.particles.map(p => ({
                x: p.x,
                y: p.y,
                vx: p.vx,
                vy: p.vy
            })),
            obstacles: obstacles,
            params: {
                viscosity: sim.mu,
                density: sim.rho0,
                k: sim.k
            },
            timestamp: Date.now()
        };

        const blob = new Blob([JSON.stringify(state)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fluid_sim_${state.timestamp}.json`;
        a.click();
    }

    static load(file, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const state = JSON.parse(e.target.result);
                callback(state);
            } catch (err) {
                console.error("Failed to parse simulation file", err);
            }
        };
        reader.readAsText(file);
    }
}
