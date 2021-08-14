import { useMemo, useReducer } from "react";

function format(number) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 12,
  }).format(number);
}

// calculation rule
function PEMDAS(calculation) {
  const index = calculation.findIndex((operator) =>
    ["x", "/"].includes(operator)
  );

  return index !== -1
    ? index
    : calculation.findIndex((operator) => ["+", "-"].includes(operator));
}

function findLastOperator(calculation) {
  return calculation.reduce((acc, cur) => (isOperator(cur) ? cur : acc), "");
}

function isOperator(token) {
  return ["+", "-", "x", "/"].includes(token);
}

function findLast(calculation) {
  return calculation[calculation.length - 1];
}

function calculate([left, operator, right]) {
  return {
    "/": (a, b) => a / b,
    x: (a, b) => a * b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  }[operator](Number(left), Number(right));
}

function operate(calculation) {
  const index = PEMDAS(calculation);

  if (index === -1) return calculation;

  return operate([
    ...calculation.slice(0, index - 1),
    calculate(calculation.slice(index - 1, index + 2)),
    ...calculation.slice(index + 2),
  ]);
}

const initialState = ["0"];

function reducer(state, action) {
  if (action.type === "RESET") {
    return initialState;
  }

  if (action.type === "PUSH") {
    const last = findLast(state);

    if (isOperator(last)) {
      return [...state, action.value];
    }

    if (action.value === "." && last.includes(action.value)) {
      return state;
    }

    if (action.value === ".") {
      return [...state.slice(0, -1), last + action.value];
    }

    return [...state.slice(0, -1), format(last + action.value)];
  }

  if (action.type === "REMOVE") {
    const last = findLast(state);

    if (isOperator(last)) {
      return state.slice(0, -1);
    }

    return [...state.slice(0, -1), format(last.slice(0, -1))];
  }

  if (action.type === "OPERATE") {
    const last = findLast(state);

    if (isOperator(last)) {
      return [...state.slice(0, -1), action.value];
    }

    if (findLastOperator(state) === action.value) {
      return [...operate(state).map(format), action.value];
    }

    return [...state, action.value];
  }

  if (action.type === "ENTER") {
    return operate(state).map(format);
  }

  return state;
}

export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(
    () => ({
      reset: () => () => dispatch({ type: "RESET" }),
      push: (value) => () => dispatch({ type: "PUSH", value }),
      remove: () => () => dispatch({ type: "REMOVE" }),
      operate: (value) => () => dispatch({ type: "OPERATE", value }),
      enter: () => () => dispatch({ type: "ENTER" }),
    }),
    [dispatch]
  );

  //  compute
  const operator = findLastOperator(state);

  const last = findLast(state);
  const output = isOperator(last) ? state[state.length - 2] : last;

  return { operator, output, actions };
}
