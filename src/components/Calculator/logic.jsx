/**
 * type Operand = number
 * type Operator = "+" | "-" | "*" | "/"
 * type Operation = Operator | Operand
 */

export const isOperand = (operation) => typeof operation === "number";
export const isOperator = (operation) =>
  ["+", "-", "*", "/"].includes(operation);
export const isOperation = (operation) =>
  isOperand(operation) || isOperator(operation);

function operate(x, operator, y) {
  if (operator === "+") {
    return x + y;
  }

  if (operator === "-") {
    return x - y;
  }

  if (operator === "*") {
    return x * y;
  }

  if (operator === "/") {
    return x / y;
  }

  throw new Error(`operation ${operator} is not valid`);
}

function PEMDAS(operations) {
  const index = operations.findIndex((x) => ["*", "/"].includes(x));
  if (index !== -1) return index;

  return operations.findIndex((x) => ["+", "-"].includes(x));
}

export function calculate(operations = []) {
  if (!operations.length) return 0;

  if (operations.length === 1) {
    const [first] = operations;

    if (!isOperation(first)) throw new Error(`operation ${first} is not valid`);

    return isOperator(first) ? 0 : first;
  }

  if (operations.length === 2) {
    const [first, second] = operations;

    if (isOperator(first)) return operate(0, first, second);

    return operate(first, second, first);
  }

  const index = PEMDAS(operations);

  return calculate([
    ...operations.slice(0, index - 1),
    operate(...operations.slice(index - 1, index + 2)),
    ...operations.slice(index + 2),
  ]);
}
