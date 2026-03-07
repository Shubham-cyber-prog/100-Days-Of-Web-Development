/**
 * Thermal Sight Visualizer
 * Highlighting energy-rich organisms and nutrient hotspots
 */

class ThermalView {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    render(world, organisms) {
        // 1. Draw Nutrient Background as Heatmap
        world.draw(this.ctx, 'thermal');

        // 2. Draw Organisms as Heat Sources
        for (const org of organisms) {
            const energyIntensity = org.metabolism.energy / org.metabolism.maxEnergy;

            // Outer heat glow
            const gradient = this.ctx.createRadialGradient(org.x, org.y, 1, org.x, org.y, org.size * 3);
            gradient.addColorStop(0, `rgba(239, 68, 68, ${energyIntensity})`); // High heat - Red
            gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(org.x, org.y, org.size * 3, 0, Math.PI * 2);
            this.ctx.fill();

            // Core
            this.ctx.fillStyle = "#ffffff";
            this.ctx.beginPath();
            this.ctx.arc(org.x, org.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
}

window.ThermalView = ThermalView;
Riverside: 
