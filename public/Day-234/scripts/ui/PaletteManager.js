export default class PaletteManager {
    constructor() {
        this.colors = ['#ff4d4d', '#ff944d', '#ffdb4d', '#4dff4d', '#4dffff', '#4d94ff', '#944dff', '#ff4dff', '#ffffff'];
        this.activeColor = this.colors[0];
    }

    init() {
        const container = document.getElementById('color-palette');
        this.colors.forEach(c => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            if (c === this.activeColor) swatch.classList.add('active');
            swatch.style.backgroundColor = c;

            swatch.addEventListener('click', () => {
                document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
                this.activeColor = c;
            });

            container.appendChild(swatch);
        });
    }
}
