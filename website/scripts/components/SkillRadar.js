/**
 * SkillRadar.js
 * Visualizes user skill distribution across multiple dimensions.
 * Features a dynamic radar (spider) chart for professional skills and tools.
 */

export class SkillRadar {
    constructor(container) {
        this.container = typeof container === 'string' ? document.getElementById(container) : container;
        this.size = 350;
        this.padding = 40;
    }

    render(skills = {}) {
        if (!this.container) return;
        const keys = Object.keys(skills);
        const values = Object.values(skills);
        const center = this.size / 2;
        const radius = (this.size / 2) - this.padding;
        const angleStep = (Math.PI * 2) / keys.length;

        // Generate SVG
        const levels = [0.2, 0.4, 0.6, 0.8, 1];
        const gridPolygons = levels.map(level => {
            const points = keys.map((_, i) => {
                const x = center + radius * level * Math.cos(angleStep * i - Math.PI / 2);
                const y = center + radius * level * Math.sin(angleStep * i - Math.PI / 2);
                return `${x},${y}`;
            }).join(' ');
            return `<polygon points="${points}" fill="none" stroke="rgba(148, 163, 184, 0.1)" stroke-width="1" />`;
        }).join('');

        const axes = keys.map((key, i) => {
            const x2 = center + radius * Math.cos(angleStep * i - Math.PI / 2);
            const y2 = center + radius * Math.sin(angleStep * i - Math.PI / 2);
            return `
                <line x1="${center}" y1="${center}" x2="${x2}" y2="${y2}" stroke="rgba(148, 163, 184, 0.15)" stroke-width="1" />
                <text x="${x2}" y="${y2}" fill="#94a3b8" font-size="11" text-anchor="${this._getTextAnchor(angleStep * i)}">${key}</text>
            `;
        }).join('');

        const skillPoints = values.map((val, i) => {
            const x = center + radius * (val / 100) * Math.cos(angleStep * i - Math.PI / 2);
            const y = center + radius * (val / 100) * Math.sin(angleStep * i - Math.PI / 2);
            return `${x},${y}`;
        }).join(' ');

        this.container.innerHTML = `
            <div class="skill-radar-wrapper" style="text-align: center;">
                <svg width="${this.size}" height="${this.size}" viewBox="0 0 ${this.size} ${this.size}">
                    <!-- Background Grids -->
                    ${gridPolygons}
                    <!-- Axes -->
                    ${axes}
                    <!-- Skill Polygon -->
                    <polygon points="${skillPoints}" fill="rgba(109, 40, 217, 0.2)" stroke="#6d28d9" stroke-width="2" />
                    <!-- Skill Points -->
                    ${values.map((val, i) => {
                        const x = center + radius * (val / 100) * Math.cos(angleStep * i - Math.PI / 2);
                        const y = center + radius * (val / 100) * Math.sin(angleStep * i - Math.PI / 2);
                        return `<circle cx="${x}" cy="${y}" r="4" fill="#6d28d9" stroke="#fff" stroke-width="1.5" />`;
                    }).join('')}
                </svg>
            </div>
        `;
    }

    _getTextAnchor(angle) {
        const normAngle = angle % (Math.PI * 2);
        if (normAngle < 0.1 || normAngle > 6.1) return 'middle';
        if (normAngle < Math.PI) return 'start';
        return 'end';
    }
}
