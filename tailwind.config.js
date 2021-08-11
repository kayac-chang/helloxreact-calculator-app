module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    themeVariants: ["blue", "cyan", "violet"],
    extend: {
      colors: {
        blue: {
          800: `hsl(224, 36%, 15%)`,
          700: `hsl(223, 31%, 20%)`,
          600: `hsl(221, 14%, 31%)`,
          500: `hsl(222, 26%, 31%)`,
          400: `hsl(224, 28%, 35%)`,
          300: `hsl(225, 21%, 49%)`,
        },

        red: {
          600: `hsl(6, 70%, 34%)`,
          500: `hsl(6, 63%, 50%)`,
        },

        orange: {
          600: `hsl(28, 16%, 65%)`,
          500: `hsl(30, 25%, 89%)`,
        },

        gray: {
          "main-background": `hsl(0, 0%, 90%)`,
        },
      },

      boxShadow: {
        normal: `inset 0px -4px 0px var(--tw-ring-color)`,
        pressed: `inset 0px 0px 0px var(--tw-ring-color)`,
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
    },
  },
  plugins: [require("tailwindcss-multi-theme")],
};
