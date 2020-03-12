const operators = {
    "+" : (a, b) => a + b,
    "-" : (a, b) => a - b,
    "*" : (a, b) => a * b,
    "/" : (a, b) => a / b
}

function calculate(expression) {
    let exp = expression.split(" ");

    function calc(a, b){
        for (let i = 1; i < e.length - 1; i++) {
            if (exp[i] == a || exp[i] == b) {
                exp[i] = operators[ exp[i] ]( +exp[i-1], +exp[i+1] );
                exp.splice(i-1, 3, exp[i]);
                i--;
            }
        }
    }
    calculate("*", "/");
    calculate("+", "-");
    return +exp[0];
}

function validate(expression){
    let validator = expression.split(" ").filter(a => a != "").join("");

    if (validator.replace(/[^(]/g, "").length != validator.replace(/[^)]/g, "").length || validator.includes("/0")) {
      throw new Error;
    }
}

function expressionCalculator(expression) {
    validate(expression);
    expression = expression.replace(/\s/g, "").replace(/(\*|\/|\+|\-)/g, " $& ");

    if (expression.match(/\(/g) != null ) {
        for (let i = expression.match(/\(/g).length; i != 0; i--) {
            let calculation = expression.match(/(\([0-9\+\/\*\-. ]+\))/g)[0];
            let expression = calculation.slice( 1, calculation.length-1 );
            expression = expression.replace(calculation, calculate(expression));
        }
    }
    return calculate(expression);
}

module.exports = {
    expressionCalculator
}