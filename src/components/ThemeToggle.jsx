import clsx from "clsx";
import React, { useEffect, useState } from "react";

const themes = [
  {
    label: "1",
    value: "theme-blue",
  },
  {
    label: "2",
    value: "theme-cyan",
  },
  {
    label: "3",
    value: "theme-violet",
  },
];

function Toggle({ style }) {
  return (
    <div
      className={clsx(
        "absolute rounded-full w-4 h-4 pointer-events-none",
        "transition duration-150",
        "blue:bg-red-500",
        "cyan:bg-orange-700",
        "violet:bg-cyan-500"
      )}
      style={style}
    />
  );
}

export function ThemeToggle() {
  const [active, setActive] = useState("theme-blue");

  useEffect(() => {
    themes.forEach(({ value }) =>
      document.body.classList.toggle(value, value === active)
    );
  }, [active]);

  const index = themes.findIndex(({ value }) => value === active);

  return (
    <div
      role="group"
      aria-labelledby="theme"
      className="flex items-end gap-4"
      onChangeCapture={(event) => setActive(event.target.value)}
    >
      <span id="theme" className="font-bold text-xs pb-0.5">
        THEME
      </span>

      <div>
        <div className="flex px-1.5 justify-around gap-1">
          {themes.map(({ label, value }) => (
            <label
              key={value}
              htmlFor={value}
              className="mb-0.5 font-bold text-xs"
            >
              {label}
            </label>
          ))}
        </div>

        <div
          className={clsx(
            "flex items-center rounded-full p-1.5 gap-1 relative",
            "blue:bg-blue-700",
            "cyan:bg-red-700",
            "violet:bg-violet-800"
          )}
        >
          {themes.map(({ value }) => (
            <div key={value} className="w-4 flex justify-center items-center">
              <input
                type="radio"
                name="theme"
                id={value}
                value={value}
                defaultChecked={value === active}
                className="opacity-0"
              />
            </div>
          ))}

          <Toggle
            style={{
              transform: `translateX(${index * 100}%)`,
              margin: `${index * 0.25}rem`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
