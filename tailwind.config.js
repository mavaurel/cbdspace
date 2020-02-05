const { colors: defaultColors } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    fontFamily: {
      sans: ["'Roboto'", "sans-serif"],
      secondary: ["'Merriweather'", "sans-serif"]
    },
    colors: {
      ...defaultColors,
      primary: "#6d866d",
      black: "#2f2f2f",
      grey: "#4d4d4d",
      "grey-light": "#c4c1c1",
      "grey-dark": "#797979"
    },
    container: {
      center: true
    },
    flex: {
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none",
      "1": "1 1 0%",
      "2": "0 1 50%",
      "3": "0 1 33%",
      "4": "1 0 25%",
      "80": "1 0 80%",
      "100": "1 0 100%"
    },
    maxWidth: {
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%"
    }
  },
  variants: {},
  plugins: []
};
