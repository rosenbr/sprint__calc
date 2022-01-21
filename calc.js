
class Calculator {
    constructor(previousOpTextElement, currentOpTextElement) {
        this.previousOpTextElement = previousOpTextElement
        this.currentOpTextElement = currentOpTextElement
        this.clear()
    }
};

// Clear numbers/operators
clear() {
    this.currentOp = '';
    this.previousOp = '';
    this.operation = undefined;
};


// Remove single number/operator
delete() {
    this.currentOp = this.currentOp.toString().slice(0, -1)
}

// Add numbers
appendNumber(number) {
    if(number === '.' && this.currentOp.includes('.')) return
    this.currentOp = this.currentOp.toString() + number.toString()
}

// Select the operator
chooseOperation(operation) {
    
}

// Display results
compute() {
    
}

// Update output values
updateDisplay() {
    
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOpTextElement = document.querySelector('[data-previous-op]');
const currentOpTextElement = document.querySelector('[data-current-op]');
const calculator = new Calculator(previousOpTextElement, currentOpTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})