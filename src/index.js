function eval() {
    throw new Error("Do not use eval");
}

function expressionCalculator(expr) {


 	  let expression = expr.split(" ").join(""), //  remove empty spaces
         leftBrackets = expression.replace(/[^(]/g, ""),
         rightBrackets = expression.replace(/[^)]/g, ""); 

    // STEP 1: check for errors
    if(expression.includes("/0") ) {
        throw new Error("TypeError: Division by zero.");
    }
    if(leftBrackets.length != rightBrackets.length) {
      throw new Error("ExpressionError: Brackets must be paired");
    }

    // STEP 2: convert operators
     const operators = (a, operator, b) => {
        switch (operator) {
            case '*': return a * b;
            case '/': return b / a;
            case '+': return a + b;
            case '-': return b - a;
 			 }
 		}

 	// STEP 3: calculate	 
 return 0;
}

module.exports = {
    expressionCalculator
}