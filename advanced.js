let expression = "";

const expressionDisplay = document.getElementById("expressionDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const value = button.getAttribute("data-value");
        if (value === "C") {
            clearAll();
        } else if (value === "=") {
            calculateResult();
        } else {
            appendToExpression(value);
            updateDisplay();
        }
    });
});

function appendToExpression(value) {
    if (value === '.') {
        const parts = expression.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1];
        if (lastPart.includes('.')) {
            return;
        }
        if (expression === '') {
            expression = '0';
        }
    }

    if (expression === '0' && value !== '.' && !isNaN(value)) {
        expression = value;
        return;
    }

    if (expression === '' && value === '0') {
        expression = '0';
        return;
    }

    const lastChar = expression.slice(-1);
    const isOperator = ['+', '-', '*', '/'].includes(value);
    const lastCharIsOperator = ['+', '-', '*', '/'].includes(lastChar);

    if (isOperator && lastCharIsOperator) {
        expression = expression.slice(0, -1) + value;
        return;
    }

    expression += value;
}

function updateDisplay() {
    expressionDisplay.textContent = expression;
    resultDisplay.textContent = "";
}

function calculateResult() {
    try {
        if (expression === "") {
            resultDisplay.textContent = "0";
            expression = "0";
            expressionDisplay.textContent = "";
            return;
        }

        const lastChar = expression.slice(-1);
        if (['+', '-', '*', '/', '(', '.'].includes(lastChar)) {
            resultDisplay.textContent = "Error";
            expressionDisplay.textContent = expression + " =";
            expression = "";
            return;
        }

        const result = eval(expression);
        const formattedResult = parseFloat(result.toFixed(10));

        resultDisplay.textContent = formattedResult;
        expressionDisplay.textContent = expression + " =";
        expression = formattedResult.toString();

    } catch (error) {
        resultDisplay.textContent = "Error";
        expressionDisplay.textContent = expression + " =";
        expression = "";
    }
}

function clearAll() {
    expression = "";
    expressionDisplay.textContent = "";
    resultDisplay.textContent = "";
}
