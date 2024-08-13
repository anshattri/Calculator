// script.js
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (button.id === 'clear') {
            clearDisplay();
        } else if (button.id === 'equal') {
            calculate();
        } else if (button.classList.contains('operator')) {
            handleOperator(value);
        } else {
            handleNumber(value);
        }
    });
});

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.innerText = '0';
}

function handleNumber(value) {
    if (currentInput.length < 10) {
        currentInput += value;
        display.innerText = currentInput;
    }
}

function handleOperator(value) {
    if (currentInput === '' && previousInput !== '') {
        operator = value;
    } else if (currentInput !== '') {
        if (previousInput !== '') {
            calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
    }
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    display.innerText = currentInput;
}
