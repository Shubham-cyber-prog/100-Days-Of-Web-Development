/**
 * Regex Crossword Validator
 * Validates player input against regex constraints
 */

export class Validator {
    /**
     * Check if a string matches a regex
     * We add ^ and $ to ensure full string matching
     */
    static isValid(regexStr, inputStr) {
        try {
            // Ensure we match the entire string length
            const pattern = new RegExp(`^${regexStr}$`, 'i');
            return pattern.test(inputStr);
        } catch (e) {
            console.error("Invalid Regex in Level Data:", regexStr);
            return false;
        }
    }

    /**
     * Validate the entire grid state
     */
    static checkGrid(gridData, rowRegexes, colRegexes) {
        const rowResults = rowRegexes.map((regex, idx) => {
            const rowStr = gridData[idx].join('');
            return this.isValid(regex, rowStr);
        });

        const numCols = colRegexes.length;
        const colResults = colRegexes.map((regex, colIdx) => {
            let colStr = '';
            for (let rowIdx = 0; rowIdx < gridData.length; rowIdx++) {
                colStr += gridData[rowIdx][colIdx] || '';
            }
            return this.isValid(regex, colStr);
        });

        return {
            rows: rowResults,
            cols: colResults,
            isComplete: rowResults.every(r => r) && colResults.every(c => c)
        };
    }
}
