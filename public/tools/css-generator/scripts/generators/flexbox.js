/**
 * Flexbox Generator Logic
 */

export class FlexboxGenerator {
    constructor() {
        this.state = {
            direction: 'row',
            justify: 'center',
            align: 'center',
            gap: 10
        };
    }

    update(key, value) {
        if (key in this.state) {
            this.state[key] = value;
        }
    }

    getCSS() {
        const { direction, justify, align, gap } = this.state;

        // Construct the multi-line CSS block
        const value = `display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
    gap: ${gap}px;`;

        return {
            property: 'flexbox-compound', // Special marker
            value: value
        };
    }
}
