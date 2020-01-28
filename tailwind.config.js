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
    }
  },
  variants: {},
  plugins: []
};
