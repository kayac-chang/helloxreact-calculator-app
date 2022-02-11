module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    themeVariants: ["blue", "cyan", "violet"],
    extend: {
      colors: {
        blue: {
          900: `hsl(198, 20%, 13%)`,
          800: `hsl(224, 36%, 15%)`,
          700: `hsl(223, 31%, 20%)`,
          600: `hsl(221, 14%, 31%)`,
          500: `hsl(222, 26%, 31%)`,
          400: `hsl(224, 28%, 35%)`,
          300: `hsl(225, 21%, 49%)`,
        },

        red: {
          700: `hsl(0, 5%, 81%)`,
          600: `hsl(6, 70%, 34%)`,
          500: `hsl(6, 63%, 50%)`,
        },

        orange: {
          800: `hsl(25, 99%, 27%)`,
          700: `hsl(25, 98%, 40%)`,
          600: `hsl(28, 16%, 65%)`,
          500: `hsl(30, 25%, 89%)`,
        },

        yellow: {
          700: `hsl(60, 10%, 19%)`,
          600: `hsl(35, 11%, 61%)`,
          500: `hsl(45, 7%, 89%)`,
          400: `hsl(52, 100%, 62%)`,
        },

        violet: {
          900: `hsl(268, 75%, 9%)`,
          800: `hsl(268, 71%, 12%)`,
          700: `hsl(268, 47%, 21%)`,
          600: `hsl(281, 89%, 26%)`,
        },

        magenta: {
          600: `hsl(290, 70%, 36%)`,
          500: `hsl(285, 91%, 52%)`,
        },

        cyan: {
          700: `hsl(185, 58%, 25%)`,
          600: `hsl(185, 42%, 37%)`,
          500: `hsl(176, 100%, 44%)`,
          400: `hsl(177, 92%, 70%)`,
        },

        gray: {
          500: `hsl(0, 0%, 90%)`,
          400: `hsl(0, 0%, 93%)`,
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
