
class Calculator {
    constructor(previousOpTextElement, currentOpTextElement) {
        this.previousOpTextElement = previousOpTextElement
        this.currentOpTextElement = currentOpTextElement
        this.clear()
    }
};

// Clear numbers/operators
function clear() {
    this.currentOp = '';
    this.previousOp = '';
    this.operation = undefined;
};


// Remove single number/operator
function del() {
    this.currentOp = this.currentOp.toString().slice(0, -1)
}

// Add numbers
function appendNumber(number) {
    if(number === '.' && this.currentOp.includes('.')) return
    this.currentOp = this.currentOp.toString() + number.toString()
}

// Select the operator
function chooseOperation(operation) {
    if(this.currentOp === '') return
    if(this.previousOp !== '') {
        this.compute()
    }
    this.operation = operation
    this.previousOp = this.currentOp
    this.currentOp = ''
}

// Display results
function compute() {
    let computation
    const prev = parseFloat(this.previousOp)
    const current = parseFloat(this.currentOp)
    if(isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case '*':
            computation = prev * current
            break
        case '÷':
            computation = prev / current
            break
        default:
            return
    }
    this.currentOp = computation
    this.operation = undefined
    this.previousOp = ''
}

// Update output values
function updateDisplay() {
    
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

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})