let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

// Mobile-optimized functions
function appendToDisplay(value) {
    // Prevent double operators
    if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(currentInput.slice(-1))) {
        return;
    }
    
    currentInput += value;
    display.value = currentInput;
    
    // Mobile haptic feedback (if supported)
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.value = '';
    
    if (navigator.vibrate) {
        navigator.vibrate(20);
    }
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
    
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

function calculate() {
    try {
        if (currentInput === '') return;
        
        // Replace × with * for calculation
        let expression = currentInput.replace(/×/g, '*');
        
        // Basic security check - only allow numbers and basic operators
        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            throw new Error('Invalid expression');
        }
        
        let result = eval(expression);
        
        // Handle division by zero and invalid results
        if (!isFinite(result)) {
            throw new Error('Invalid calculation');
        }
        
        // Round to avoid floating point precision issues
        result = Math.round(result * 100000000) / 100000000;
        
        display.value = result;
        currentInput = result.toString();
        
        if (navigator.vibrate) {
            navigator.vibrate([10, 50, 10]);
        }
        
    } catch (error) {
        display.value = 'Error';
        currentInput = '';
        
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
        
        setTimeout(() => {
            display.value = '';
        }, 1500);
    }
}

// Mobile touch event optimization
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        button.addEventListener('touchend', function(event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // Add visual feedback for touch
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
});

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+') {
        appendToDisplay('+');
    } else if (key === '-') {
        appendToDisplay('-');
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        event.preventDefault(); // Prevent browser search
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', function(event) {
    if (event.target.classList.contains('btn')) {
        event.preventDefault();
    }
});

// Handle orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        // Recalculate layout if needed
        window.scrollTo(0, 0);
    }, 100);
});