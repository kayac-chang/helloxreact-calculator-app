import clsx from "clsx";
import React from "react";
import { ThemeToggle, Calculator } from "./components";

function App() {
  return (
    <main
      className={clsx(
        "w-screen h-screen px-6 py-8",
        "flex flex-col gap-8",
        "blue:bg-blue-500 blue:text-white",
        "cyan:bg-gray-500 cyan:text-yellow-700",
        "violet:bg-violet-900 violet:text-yellow-400"
      )}
    >
      <header className={clsx("flex justify-between items-end")}>
        <h1 className="text-3xl font-bold">calc</h1>

        <ThemeToggle />
      </header>

      <Calculator />
    </main>
  );
}

export default App;
