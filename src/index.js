function expressionCalculator(expr) {  
    //' 20 - 57 * 12 - (  58 + 84 * 32 / 27  ) '
   const expArray = expr.match(/\d+|\+|\-|\*|\/|\(|\)/g); // fixes issue with spaces in tests
         leftBrackets = expr.replace(/[^(]/g, ''),
         rightBrackets = expr.replace(/[^)]/g, ''); 

    // STEP 1: check for bracket error
    if(leftBrackets.length != rightBrackets.length) {
      throw new Error('ExpressionError: Brackets must be paired');
    }
    // STEP 2: convert operators and assign priority
    let numberArr = [],
        operatorArr = [];

    const operators = {
        '+': {
          priority: 1,
          do: (a, b) => a + b
        },
        '-': {
          priority: 1,
          do: (a, b) => a - b
        },
        '/': {
          priority: 2,
          do: (a, b) => a / b
        },
        '*': {
          priority: 2,
          do: (a, b) => a * b
        },
        '(': {},
        ')': {}
      };

     // STEP 3: catch division by 0 and calculate
     function calculate(a, b, operator) {
        if (operator === '/' && a === 0) {
          throw new Error('TypeError: Division by zero.');
        }
        return operators[operator].do(b, a);
      }

     // STEP 4: push numbers into number stack...
      for (let i = 0; i < expArray.length; i++) {
        if (!isNaN(expArray[i])) {
          numberArr.push(Number(expArray[i]));
        }

        function bracketCount() {  // ...count number of brackets
            if (operatorArr[operatorArr.length - 1] == '(') {
              return;
            }
            numberArr.push(calculate(numberArr.pop(), numberArr.pop(), operatorArr.pop()));  // ...calculate whats on top
            bracketCount();
          }
        
        function addOperator() {
          if (!operatorArr.length || operatorArr[operatorArr.length - 1] == '(' || expArray[i] == '(' ) {
            operatorArr.push(expArray[i]); // ...push operator into operator stack
          } else if (expArray[i] === ')') {
            bracketCount();
            operatorArr.pop();
          } else if (operators[expArray[i]].priority > operators[operatorArr[operatorArr.length - 1]].priority) {
            operatorArr.push(expArray[i]);
          } else {
            numberArr.push(calculate(numberArr.pop(), numberArr.pop(), operatorArr.pop()));
            addOperator();
          }
        }

        if (expArray[i] in operators) {addOperator();}
      }
    
      function stopCounting() {
        if (!operatorArr.length) { return;}
        numberArr.push(calculate(numberArr.pop(), numberArr.pop(), operatorArr.pop()));
        stopCounting();
      }
      stopCounting();
      return numberArr[0];
    }
    
    module.exports = {
      expressionCalculator
    };