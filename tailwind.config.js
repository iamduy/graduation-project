const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

module.exports = {
  prefix: "",
  mode: "jit",
  purge: {
    content: ["./src/**/*.{html,ts,css,js}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // for background
        main: "#4caf93",
        header: "#edf4f0",
        backgroundColorBase: "#f0f0f0",
        lam: "#636C9A",

        //for text
        secondary: "#666666",
        error: "#EB5757",
        success: "#27AE60",
        pink : '#e07b9a'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
