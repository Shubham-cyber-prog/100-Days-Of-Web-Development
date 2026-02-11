class Calculator {
  constructor(prevEl, currEl) {
    this.prevEl = prevEl;
    this.currEl = currEl;
    this.clear();
  }

  clear() {
    this.current = '0';
    this.previous = '';
    this.operation = null;
    this.waiting = false;
  }

  delete() {
    if (this.current.length === 1) {
      this.current = '0';
    } else {
      this.current = this.current.slice(0, -1);
    }
  }

  appendNumber(num) {
    if (num === '.' && this.current.includes('.')) return;

    if (this.waiting) {
      this.current = num === '.' ? '0.' : num;
      this.waiting = false;
      return;
    }

    this.current = this.current === '0' && num !== '.'
      ? num
      : this.current + num;
  }

  chooseOperation(op) {
    if (this.waiting) {
      this.operation = op;
      return;
    }

    if (this.previous !== '') {
      this.compute();
    }

    this.operation = op;
    this.previous = this.current;
    this.waiting = true;
  }

  computeUnary(op) {
    const value = parseFloat(this.current);
    if (isNaN(value)) return;

    switch (op) {
      case '√':
        if (value < 0) return alert('Invalid input');
        this.current = Math.sqrt(value).toString();
        break;
      case 'x²':
        this.current = Math.pow(value, 2).toString();
        break;
    }
  }

  compute() {
    const prev = parseFloat(this.previous);
    const curr = parseFloat(this.current);
    if (isNaN(prev) || isNaN(curr)) return;

    let result;
    switch (this.operation) {
      case '+': result = prev + curr; break;
      case '-': result = prev - curr; break;
      case '×': result = prev * curr; break;
      case '÷':
        if (curr === 0) return alert('Cannot divide by zero');
        result = prev / curr;
        break;
      case '%':
        result = prev % curr;
        break;
      case '^':
        result = Math.pow(prev, curr);
        break;
      default:
        return;
    }

    this.current = result.toString();
    this.previous = '';
    this.operation = null;
  }

  format(num) {
    const [int, dec] = num.split('.');
    return dec ? `${Number(int).toLocaleString()}.${dec}` : Number(int).toLocaleString();
  }

  update() {
    this.currEl.innerText = this.format(this.current);
    this.prevEl.innerText = this.operation ? `${this.previous} ${this.operation}` : '';
  }
}

/* INIT */
document.addEventListener('DOMContentLoaded', () => {
  const calc = new Calculator(
    document.getElementById('previous-operand'),
    document.getElementById('current-operand')
  );

  document.querySelectorAll('.number').forEach(btn =>
    btn.onclick = () => { calc.appendNumber(btn.innerText); calc.update(); }
  );

  document.querySelectorAll('.operator').forEach(btn =>
    btn.onclick = () => { calc.chooseOperation(btn.innerText); calc.update(); }
  );

  document.querySelectorAll('.scientific').forEach(btn =>
    btn.onclick = () => { calc.computeUnary(btn.innerText); calc.update(); }
  );

  document.getElementById('equals').onclick = () => { calc.compute(); calc.update(); };
  document.getElementById('clear').onclick = () => { calc.clear(); calc.update(); };
  document.getElementById('delete').onclick = () => { calc.delete(); calc.update(); };

  /* Keyboard support */
  document.addEventListener('keydown', e => {
    if (!isNaN(e.key) || e.key === '.') calc.appendNumber(e.key);
    if (['+', '-', '*', '/', '%', '^'].includes(e.key)) {
      const map = { '*': '×', '/': '÷' };
      calc.chooseOperation(map[e.key] || e.key);
    }
    if (e.key === 'Enter') calc.compute();
    if (e.key === 'Backspace') calc.delete();
    if (e.key === 'Escape') calc.clear();
    calc.update();
  });

  /* Theme */
  const themeBtn = document.getElementById('theme-switcher');
  document.body.dataset.theme = 'light';

  themeBtn.onclick = () => {
    const dark = document.body.dataset.theme === 'dark';
    document.body.dataset.theme = dark ? 'light' : 'dark';
    themeBtn.innerText = dark ? 'Toggle Dark Mode' : 'Toggle Light Mode';
  };

  calc.update();
});
