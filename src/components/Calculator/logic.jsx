import { useMemo, useReducer } from "react";

function format(number) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 12,
  }).format(number);
}

const operators = ["+", "-", "x", "/"];

const operations = {
  "/": (a, b) => a / b,
  x: (a, b) => a * b,
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
};

const initialState = ["0"];

function reducer(state, action) {
  if (action.type === "RESET") {
    return initialState;
  }

  if (action.type === "PUSH") {
    const last = state[state.length - 1];

    if (operators.includes(last)) {
      return [...state, action.value];
    }

    if (action.value === "." && last.includes(action.value)) {
      return state;
    }

    if (action.value !== "." && last === "0") {
      return [...state.slice(0, -1), action.value];
    }

    return [...state.slice(0, -1), last + action.value];
  }

  if (action.type === "REMOVE") {
    const last = state[state.length - 1];

    if (operators.includes(last)) {
      return state.slice(0, -1);
    }

    return [...state.slice(0, -1), format(last.slice(0, -1))];
  }

  if (action.type === "OPERATE") {
    const last = state[state.length - 1];

    if (operators.includes(last)) {
      return [...state.slice(0, -1), action.value];
    }

    return [...state, action.value];
  }

  if (action.type === "ENTER") {
    //   TODO
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

  console.log(state);

  //  compute
  const operator = state.reduce(
    (acc, cur) => (operators.includes(cur) ? cur : acc),
    ""
  );

  const last = state[state.length - 1];
  const output = operators.includes(last) ? state[state.length - 2] : last;

  return { operator, output, actions };
}
