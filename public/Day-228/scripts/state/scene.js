/**
 * Scene & Collider State
 * Manages simulation boundaries and static obstacles.
 */

class Scene {
    constructor() {
        this.width = 800;
        this.height = 600;
        this.margin = 20;
    }

    getBounds() {
        const container = document.getElementById('stage-container');
        if (container) {
            this.width = container.clientWidth;
            this.height = container.clientHeight;
        }

        return {
            left: this.margin,
            right: this.width - this.margin,
            top: this.margin,
            bottom: this.height - this.margin
        };
    }
}

export const scene = new Scene();
