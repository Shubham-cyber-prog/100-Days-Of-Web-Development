/**
 * DOM Manipulator for Preview Area
 */

export class PreviewBox {
    constructor() {
        this.box = document.getElementById('preview-box');
        this.flexContainer = document.getElementById('flex-preview-box');
        this.currentMode = 'shadow'; // shadow, gradient, flexbox
    }

    setMode(mode) {
        this.currentMode = mode;

        // Reset styles first
        this.box.style = '';
        this.flexContainer.style = '';

        // Toggle visibility
        if (mode === 'flexbox') {
            this.box.classList.add('active-hidden');
            this.flexContainer.classList.remove('active-hidden');
        } else {
            this.box.classList.remove('active-hidden');
            this.flexContainer.classList.add('active-hidden');
        }
    }

    update(cssData) {
        if (this.currentMode === 'flexbox') {
            // cssData.value contains the full block in this case, but we need to apply individual properties
            // Or simpler: set cssText. Note: styles set in flexbox.js getCSS() are formatted for code output.
            // We need to parse or just set properties manually here for the DOM.
            // Better approach: Let's assume cssData passed here is tailored for DOM.

            // Actually, let's keep it simple. FlexboxGenerator returns a block string.
            // We can set style.cssText
            this.flexContainer.style.cssText = cssData.value;
        } else {
            // For shadow/gradient, it's a single property
            this.box.style[cssData.property] = cssData.value;
        }
    }
}
