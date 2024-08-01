document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let displayValue = '';
    let currentOperator = null;
    let firstOperand = null;
    let secondOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.innerText;

            if (value === 'C') {
                displayValue = '';
                currentOperator = null;
                firstOperand = null;
                secondOperand = null;
            } else if (value === '=') {
                secondOperand = parseFloat(displayValue);
                if (currentOperator && firstOperand !== null && secondOperand !== null) {
                    displayValue = calculate(firstOperand, secondOperand, currentOperator).toString();
                    firstOperand = null;
                    secondOperand = null;
                    currentOperator = null;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (firstOperand === null) {
                    firstOperand = parseFloat(displayValue);
                    currentOperator = value;
                    displayValue = '';
                } else if (currentOperator) {
                    secondOperand = parseFloat(displayValue);
                    displayValue = calculate(firstOperand, secondOperand, currentOperator).toString();
                    firstOperand = parseFloat(displayValue);
                    currentOperator = value;
                    displayValue = '';
                }
            } else {
                displayValue += value;
            }

            display.innerText = displayValue;
        });
    });

    function calculate(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return 0;
        }
    }
});