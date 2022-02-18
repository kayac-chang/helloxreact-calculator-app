import { calculate, isOperand, isOperator } from "./logic";
import {
  last,
  append,
  pipe,
  equals,
  unless,
  concat,
  all,
  lensIndex,
  set,
  cond,
  of,
  identity,
  T,
  findLast,
  any,
  when,
  complement,
  always,
  converge,
  map,
  __,
  pair,
  init,
  view,
} from "ramda";
import { useReducer, useMemo } from "react";

const initialState = ["0"];

const isFalsy = complement(Boolean);
const isDot = equals(".");

const withLast = (fn) => pipe(last, fn);
const checkLast = withLast;

const removeLastChar = withLast(init);

const tailLen = lensIndex(-1);
const lastChar = view(tailLen);
const setLast = set(tailLen);

const safeToNumber = unless(isNaN, Number);
const findLastOperand = findLast(pipe(safeToNumber, isOperand));

const safeCalculate = pipe(map(safeToNumber), calculate, String);

const createReducer = (handlers) => (state, action) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action)
    : state;

const reducer = createReducer({
  RESET: always(initialState),

  PUSH: (state, action) =>
    cond([
      [
        checkLast(isOperator),
        append(action.value),
        //
      ],
      [
        pipe(lastChar, pair(action.value), all(isDot)),
        identity,
        //
      ],
      [
        T,
        setLast(concat(last(state), action.value)),
        //
      ],
    ])(state),

  REMOVE: cond([
    [
      checkLast(isOperator),
      init,
      //
    ],
    [
      checkLast(isFalsy),
      always(initialState),
      //
    ],
    [
      T,
      pipe(
        converge(setLast, [removeLastChar, identity]),
        when(checkLast(isFalsy), always(initialState))
      ),
    ],
  ]),

  OPERATE: (state, action) =>
    cond([
      [
        checkLast(isOperator),
        setLast(action.value),
        //
      ],
      [
        any(isOperator),
        pipe(
          safeCalculate,
          pair(__, action.value)
          //
        ),
      ],
      [
        T,
        append(action.value),
        //
      ],
    ])(state),

  ENTER: pipe(safeCalculate, of),
});

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
  const operator = findLast(isOperator)(state);
  const output = pipe(findLastOperand, safeToNumber)(state);

  return { operator, output, actions };
}
