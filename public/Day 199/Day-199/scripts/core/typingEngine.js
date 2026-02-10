/**
 * Typing Engine - Character-by-character validation
 */

export class TypingEngine {
    constructor(codeText) {
        this.codeText = codeText;
        this.userInput = '';
        this.currentIndex = 0;
        this.errors = [];
        this.correctChars = 0;
        this.incorrectChars = 0;
    }

    /**
     * Process user input character by character
     */
    processInput(input) {
        this.userInput = input;
        const results = [];

        for (let i = 0; i < this.codeText.length; i++) {
            if (i < input.length) {
                const expected = this.codeText[i];
                const actual = input[i];

                if (expected === actual) {
                    results.push({ index: i, status: 'correct', char: expected });
                } else {
                    results.push({ index: i, status: 'incorrect', char: expected, typed: actual });

                    // Track error
                    if (!this.errors.find(e => e.index === i)) {
                        this.errors.push({
                            index: i,
                            expected: expected,
                            typed: actual,
                            type: 'wrong'
                        });
                    }
                }
            } else if (i === input.length) {
                results.push({ index: i, status: 'current', char: this.codeText[i] });
            } else {
                results.push({ index: i, status: 'pending', char: this.codeText[i] });
            }
        }

        this.currentIndex = input.length;
        return results;
    }

    /**
     * Calculate statistics
     */
    getStats() {
        const totalTyped = this.userInput.length;
        const correctChars = this.userInput.split('').filter((char, i) => char === this.codeText[i]).length;
        const incorrectChars = totalTyped - correctChars;

        const accuracy = totalTyped === 0 ? 100 : Math.round((correctChars / totalTyped) * 100);

        return {
            totalTyped,
            correctChars,
            incorrectChars,
            totalChars: this.codeText.length,
            accuracy,
            errors: this.errors.length,
            progress: Math.round((totalTyped / this.codeText.length) * 100)
        };
    }

    /**
     * Check if test is complete
     */
    isComplete() {
        return this.userInput.length >= this.codeText.length;
    }

    /**
     * Get error breakdown
     */
    getErrorBreakdown() {
        const breakdown = {
            wrong: 0,
            missed: 0,
            extra: 0
        };

        this.errors.forEach(error => {
            if (error.type === 'wrong') breakdown.wrong++;
            else if (error.type === 'missed') breakdown.missed++;
            else if (error.type === 'extra') breakdown.extra++;
        });

        return breakdown;
    }

    /**
     * Reset engine
     */
    reset() {
        this.userInput = '';
        this.currentIndex = 0;
        this.errors = [];
        this.correctChars = 0;
        this.incorrectChars = 0;
    }
}
