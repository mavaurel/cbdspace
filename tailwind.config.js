const { colors: defaultColors } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    fontFamily: {
      sans: ["'Roboto'", "sans-serif"]
    },
    colors: {
      ...defaultColors,
      primary: "#6D866D",
      black: "#2f2f2f",
      grey: "#4D4D4D",
      "grey-light": "#797979"
    },
    container: {
      center: true
    },
    flex: {
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none",
      "1": "1 1 0%",
      "2": "1 0 50%",
      "100": "1 0 80%"
    }
  },
  variants: {},
  plugins: []
};
