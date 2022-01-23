class Calculator {
    constructor(previousOpTextElement, currentOpTextElement) {
        this.previousOpTextElement = previousOpTextElement
        this.currentOpTextElement = currentOpTextElement
        this.clear()
    }
    
    // === | Functions | ===
    // Clear numbers/operators
    clear() {
        this.currentOp = '';
        this.previousOp = '';
        this.operation = undefined;
    };
    
    // Remove single number/operator
    del() {
        this.currentOp = this.currentOp.toString().slice(0, -1)
    }
    
    // Add numbers
    appendNumber(number) {
        if(number === '.' && this.currentOp.includes('.')) return
        this.currentOp = this.currentOp.toString() + number.toString()
    }
    
    // Select the operator
    chooseOperation(operation) {
        if(this.currentOp === '') return
        if(this.previousOp !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOp = this.currentOp
        this.currentOp = ''
    }
    
    // Compute inputs
    compute() {
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
        
    // Display number
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
        
    // Update output values
    updateDisplay() {
        this.currentOpTextElement.innerHTML = this.getDisplayNumber(this.currentOp)
        if(this.operation != null) {
            this.previousOpTextElement.innerHTML =`${this.getDisplayNumber(this.previousOp)} ${this.operation}`
        } else {
            this.previousOpTextElement.innerHTML = ''
        }
    }
};
    
// === | Variables | ===
const numberButtons = document.querySelectorAll('.data__number');
const operationButtons = document.querySelectorAll('.data__operation');
const equalsButton = document.querySelector('.data__equals');
const deleteButton = document.querySelector('.data__delete');
const allClearButton = document.querySelector('.data__allClear');
const previousOpTextElement = document.querySelector('.calc__previousOp');
const currentOpTextElement = document.querySelector('.calc__currentOp');
    
const calculator = new Calculator(previousOpTextElement, currentOpTextElement)

// === | Event Listeners | ===
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerHTML)
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

deleteButton.addEventListener('click', buttonn => {
    calculator.del()
    calculator.updateDisplay()
})

document.addEventListener('keydown', function(event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g
    // Numbers
    if(event.key.match(patternForNumbers)) {
        event.preventDefault();
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }
    // Decimal
    if(event.key === '.') {
        calculator.preventDefault();
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }
    // Operators
    if(event.key.match(patternForOperators)) {
        event.preventDefault();
        calculator.chooseOperation(event.key)
        calculator.updateDisplay()
    }
    // Equals/compute
    if(event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculator.compute()
        calculator.updateDisplay()
    }
    // Delete
    if(event.key === "Backspace") {
        event.preventDefault();
        calculator.del()
        calculator.updateDisplay()
    }
    // All clear
    if(event.key === 'Delete') {
        event.preventDefault();
        calculator.clear()
        calculator.updateDisplay()
    }
});