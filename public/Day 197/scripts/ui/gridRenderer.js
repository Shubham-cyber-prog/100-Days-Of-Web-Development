/**
 * Grid Renderer
 * Dynamically builds the crossword UI
 */

export class GridRenderer {
    constructor(gridId, rowCluesId, colCluesId) {
        this.gridEl = document.getElementById(gridId);
        this.rowCluesEl = document.getElementById(rowCluesId);
        this.colCluesEl = document.getElementById(colCluesId);
    }

    render(level, onInput) {
        this.clear();

        // 1. Setup Grid CSS
        this.gridEl.style.gridTemplateColumns = `repeat(${level.cols}, var(--grid-size))`;
        this.gridEl.style.gridTemplateRows = `repeat(${level.rows}, var(--grid-size))`;

        // 2. Render Row Clues (Left)
        level.rowRegex.forEach((regex, idx) => {
            const clueBox = document.createElement('div');
            clueBox.className = 'clue-box';
            clueBox.id = `row-clue-${idx}`;
            clueBox.textContent = `/${regex}/`;
            clueBox.title = regex;
            this.rowCluesEl.appendChild(clueBox);
        });

        // 3. Render Column Clues (Top)
        level.colRegex.forEach((regex, idx) => {
            const clueBox = document.createElement('div');
            clueBox.className = 'col-clue';
            clueBox.id = `col-clue-${idx}`;
            clueBox.textContent = `/${regex}/`;
            clueBox.title = regex;
            this.colCluesEl.appendChild(clueBox);
        });

        // 4. Render Grid Cells
        for (let r = 0; r < level.rows; r++) {
            for (let c = 0; c < level.cols; c++) {
                const input = document.createElement('input');
                input.className = 'cell-input';
                input.maxLength = 1;
                input.dataset.row = r;
                input.dataset.col = c;

                input.addEventListener('input', (e) => onInput(e, r, c));

                // Keyboard navigation
                input.addEventListener('keydown', (e) => this.handleNavigation(e, r, c, level));

                this.gridEl.appendChild(input);
            }
        }
    }

    clear() {
        this.gridEl.innerHTML = '';
        this.rowCluesEl.innerHTML = '';
        this.colCluesEl.innerHTML = '';
    }

    updateFeedback(results) {
        results.rows.forEach((isValid, idx) => {
            const el = document.getElementById(`row-clue-${idx}`);
            if (isValid) el.classList.add('valid');
            else el.classList.remove('valid');
        });

        results.cols.forEach((isValid, idx) => {
            const el = document.getElementById(`col-clue-${idx}`);
            if (isValid) el.classList.add('valid');
            else el.classList.remove('valid');
        });
    }

    handleNavigation(e, r, c, level) {
        const key = e.key;
        let nextR = r, nextC = c;

        if (key === 'ArrowRight' || key === 'Enter') nextC++;
        else if (key === 'ArrowLeft') nextC--;
        else if (key === 'ArrowDown') nextR++;
        else if (key === 'ArrowUp') nextR--;
        else return;

        // Wrap or Boundary check
        if (nextC >= level.cols) { nextC = 0; nextR++; }
        if (nextC < 0) { nextC = level.cols - 1; nextR--; }

        const nextInput = document.querySelector(`.cell-input[data-row="${nextR}"][data-col="${nextC}"]`);
        if (nextInput) {
            e.preventDefault();
            nextInput.focus();
            nextInput.select();
        }
    }

    getGridState(rows, cols) {
        const state = Array.from({ length: rows }, () => Array(cols).fill(''));
        const inputs = this.gridEl.querySelectorAll('.cell-input');
        inputs.forEach(input => {
            state[input.dataset.row][input.dataset.col] = input.value;
        });
        return state;
    }
}
