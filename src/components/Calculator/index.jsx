import clsx from "clsx";
import React, { memo } from "react";
import { useCalculator } from "./logic";

function Screen({ children }) {
  return (
    <div
      className={clsx(
        "flex justify-end items-center rounded-lg p-6 pb-4",
        "text-white text-3xl font-bold",
        "blue:bg-blue-800"
      )}
    >
      <output>{children}</output>
    </div>
  );
}

function Button({ type = "button", children, className, ...props }) {
  return (
    <button
      type={type}
      className={clsx(
        "rounded font-bold",
        "shadow-normal active:shadow-pressed active:brightness-110",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Toggle({ children, className, name, checked, onChange, ...props }) {
  return (
    <div>
      <input
        type="radio"
        id={children}
        name={name}
        className="hidden peer"
        checked={checked}
        onChange={onChange}
      />

      <label
        className={clsx(
          "h-full rounded font-bold",
          "shadow-normal peer-checked:brightness-110",
          className
        )}
        {...props}
        htmlFor={children}
      >
        {children}
      </label>
    </div>
  );
}

const Keypad = memo(
  ({ operator, actions: { reset, push, remove, operate, enter } }) => {
    console.log("render", operator);

    function Number({ className, ...props }) {
      return (
        <Button
          className={clsx(
            "text-3xl",
            "blue:text-blue-600 blue:bg-orange-500 blue:ring-orange-600",
            className
          )}
          onClick={push(props.children)}
          {...props}
        />
      );
    }

    function Fraction(props) {
      return <Number {...props} />;
    }

    function Operator(props) {
      return (
        <Toggle
          name="operator"
          className={clsx(
            "text-3xl flex justify-center items-center",
            "blue:text-blue-600 blue:bg-orange-500 blue:ring-orange-600"
          )}
          onChange={operate(props.children)}
          checked={operator === props.children}
          {...props}
        />
      );
    }

    function Del({ className, ...props }) {
      return (
        <Button
          className={clsx(
            "blue:text-white blue:bg-blue-300 blue:ring-blue-400",
            className
          )}
          onClick={remove()}
          {...props}
        />
      );
    }

    function Reset({ className, ...props }) {
      return (
        <Del
          type="reset"
          className={clsx("col-span-2", className)}
          onClick={reset()}
          {...props}
        />
      );
    }

    function Enter({ className, ...props }) {
      return (
        <Button
          className={clsx(
            "col-span-2",
            "blue:text-white blue:bg-red-500 blue:ring-red-600",
            className
          )}
          onClick={enter()}
          {...props}
        />
      );
    }

    return (
      <div
        className={clsx(
          "p-6 rounded-lg min-h-[26rem]",
          "grid grid-cols-4 gap-3",
          "blue:bg-blue-700"
        )}
      >
        <Number>7</Number>
        <Number>8</Number>
        <Number>9</Number>
        <Del>DEL</Del>

        <Number>4</Number>
        <Number>5</Number>
        <Number>6</Number>
        <Operator>+</Operator>

        <Number>1</Number>
        <Number>2</Number>
        <Number>3</Number>
        <Operator>-</Operator>

        <Fraction>.</Fraction>
        <Number>0</Number>
        <Operator>/</Operator>
        <Operator>x</Operator>

        <Reset>RESET</Reset>
        <Enter>=</Enter>
      </div>
    );
  }
);

export function Calculator() {
  const { output, operator, actions } = useCalculator();

  return (
    <form className="flex flex-col gap-6">
      <Screen>{output}</Screen>

      <Keypad operator={operator} actions={actions} />
    </form>
  );
}
