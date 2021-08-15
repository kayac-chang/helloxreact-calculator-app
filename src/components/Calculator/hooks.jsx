import {
  findLast,
  isOperator,
  findLastOperator,
  calculate,
  format,
} from "./logic";
import { useReducer, useMemo } from "react";

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
      return [...calculate(state).map(format), action.value];
    }

    return [...state, action.value];
  }

  if (action.type === "ENTER") {
    return calculate(state).map(format);
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
