import clsx from "clsx";
import React from "react";

function Screen() {
  return (
    <div
      className={clsx(
        "flex justify-end items-center rounded-lg p-6 pb-4",
        "text-white text-3xl font-bold",
        "blue:bg-blue-800"
      )}
    >
      <output>399,981</output>
    </div>
  );
}

function Button({ children, className }) {
  return (
    <button
      className={clsx(
        "rounded font-bold",
        "shadow-normal active:shadow-pressed active:brightness-110",
        className
      )}
    >
      {children}
    </button>
  );
}

function Number({ className, ...props }) {
  return (
    <Button
      className={clsx(
        "text-3xl",
        "blue:text-blue-600 blue:bg-orange-500 blue:ring-orange-600",
        className
      )}
      {...props}
    />
  );
}

function Operator({ ...props }) {
  return <Number {...props} />;
}

function Reset({ className, ...props }) {
  return (
    <Button
      className={clsx(
        "blue:text-white blue:bg-blue-300 blue:ring-blue-400",
        className
      )}
      {...props}
    />
  );
}

function Confirm({ className, ...props }) {
  return (
    <Button
      className={clsx(
        "blue:text-white blue:bg-red-500 blue:ring-red-600",
        className
      )}
      {...props}
    />
  );
}

function Keypad() {
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
      <Reset>DEL</Reset>

      <Number>4</Number>
      <Number>5</Number>
      <Number>6</Number>
      <Operator>+</Operator>

      <Number>1</Number>
      <Number>2</Number>
      <Number>3</Number>
      <Operator>-</Operator>

      <Number>.</Number>
      <Number>0</Number>
      <Operator>/</Operator>
      <Operator>x</Operator>

      <Reset className="col-span-2">RESET</Reset>
      <Confirm className="col-span-2">=</Confirm>
    </div>
  );
}

export function Calculator() {
  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
      <Screen />

      <Keypad />
    </form>
  );
}
