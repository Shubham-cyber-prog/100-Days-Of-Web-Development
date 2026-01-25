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
        this.awaitingNextOperand = false;
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '' || this.currentOperand === '-') this.currentOperand = '0';
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;

        if (this.awaitingNextOperand) {
            this.currentOperand = (number === '.') ? '0.' : number.toString();
            this.awaitingNextOperand = false;
            return;
        }
        
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;

        if (this.operation && this.awaitingNextOperand) {
            this.operation = operation;
            return;
        }
        
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
        this.awaitingNextOperand = true;
    }

    computeUnary(operation) {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;

        let result;
        switch (operation) {
            case '√':
                if (current < 0) {
                    alert("Invalid Input");
                    return;
                }
                result = Math.sqrt(current);
                break;
            case 'x²':
                result = Math.pow(current, 2);
                break;
            default:
                return;
        }
        
        this.currentOperand = result.toString();
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
            case '%':
                if (current === 0) {
                    alert('Cannot modulo by zero');
                    return;
                }
                result = prev % current;
                break;
            case '^':
                result = Math.pow(prev, current);
                break;
            default:
                return;
        }

        this.currentOperand = result.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const [integerPart, decimalPart] = stringNumber.split('.');
        const integerDisplay = isNaN(integerPart)
            ? ''
            : Number(integerPart).toLocaleString('en', { maximumFractionDigits: 0 });
            
        return decimalPart != null
            ? `${integerDisplay}.${decimalPart}`
            : integerDisplay;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand);

        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

/* ---------- INITIALIZATION ---------- */

document.addEventListener('DOMContentLoaded', () => {

    const numberButtons = document.querySelectorAll('.number');
    const operationButtons = document.querySelectorAll('.operator');
    const scientificButtons = document.querySelectorAll('.scientific');
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

    scientificButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.computeUnary(button.innerText);
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
        } else if (['+', '-', '*', '/', '%', '^'].includes(e.key)) {
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
    
    if(!document.body.dataset.theme) {
        document.body.dataset.theme = 'light'; 
    }

    if (!themeSwitcher) return;

    themeSwitcher.addEventListener('click', () => {
        const isDark = document.body.dataset.theme === 'dark';
        document.body.dataset.theme = isDark ? 'light' : 'dark';
        themeSwitcher.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    });
});