class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;

        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;

        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        let result;
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Cannot divide by zero');
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = result.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const [integerPart, decimalPart] = number.split('.');
        const integerDisplay = isNaN(integerPart)
            ? ''
            : Number(integerPart).toLocaleString('en');

        return decimalPart != null
            ? `${integerDisplay}.${decimalPart}`
            : integerDisplay;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand);

        this.previousOperandTextElement.innerText =
            this.operation != null
                ? `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
                : '';
    }
}

/* ---------- INITIALIZATION ---------- */

document.addEventListener('DOMContentLoaded', () => {

    const numberButtons = document.querySelectorAll('.number');
    const operationButtons = document.querySelectorAll('.operator');
    const equalsButton = document.getElementById('equals');
    const deleteButton = document.getElementById('delete');
    const clearButton = document.getElementById('clear');

    const previousOperandTextElement = document.getElementById('previous-operand');
    const currentOperandTextElement = document.getElementById('current-operand');

    const calculator = new Calculator(
        previousOperandTextElement,
        currentOperandTextElement
    );

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();
        });
    });

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.chooseOperation(button.innerText);
            calculator.updateDisplay();
        });
    });

    equalsButton.addEventListener('click', () => {
        calculator.compute();
        calculator.updateDisplay();
    });

    clearButton.addEventListener('click', () => {
        calculator.clear();
        calculator.updateDisplay();
    });

    deleteButton.addEventListener('click', () => {
        calculator.delete();
        calculator.updateDisplay();
    });

    /* ---------- KEYBOARD SUPPORT ---------- */
    document.addEventListener('keydown', e => {
        if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
            calculator.appendNumber(e.key);
        } else if (['+', '-', '*', '/'].includes(e.key)) {
            const map = { '*': '×', '/': '÷' };
            calculator.chooseOperation(map[e.key] || e.key);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            calculator.compute();
        } else if (e.key === 'Backspace') {
            calculator.delete();
        } else if (e.key === 'Escape') {
            calculator.clear();
        }
        calculator.updateDisplay();
    });

    /* ---------- THEME SWITCH ---------- */
    const themeSwitcher = document.getElementById('theme-switcher');
    document.body.dataset.theme = 'light';

    themeSwitcher.addEventListener('click', () => {
        const isDark = document.body.dataset.theme === 'dark';
        document.body.dataset.theme = isDark ? 'light' : 'dark';
        themeSwitcher.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';


        themeSwitcher.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';

        themeSwitcher.textContent = isDark ? 'Toggle Dark Mode' : 'Toggle Light Mode';

    });
});
