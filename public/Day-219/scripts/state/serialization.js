/**
 * Binary State Serialization
 * Efficiently saving/loading the entire ecosystem state
 */

class EcosystemState {
    static serialize(world, organisms) {
        const state = {
            timestamp: Date.now(),
            nutrients: Array.from(world.nutrients),
            organisms: organisms.map(org => ({
                x: org.x,
                y: org.y,
                rot: org.rotation,
                genome: Array.from(org.genome.data),
                energy: org.metabolism.energy,
                age: org.metabolism.age
            }))
        };

        const blob = new Blob([JSON.stringify(state)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `biosim_state_${state.timestamp}.json`;
        a.click();
    }

    static load(file, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const state = JSON.parse(e.target.result);
                callback(state);
            } catch (err) {
                console.error("Critical: Failed to restore ecosystem state", err);
            }
        };
        reader.readAsText(file);
    }
}

window.EcosystemState = EcosystemState;
