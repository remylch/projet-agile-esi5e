module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primary: "#FFCB2C",
        secondary: "#006B61",
        third: "#C2FCF2",
        fourth: "#649B92",
      },
      textColor: {
        primary: "#FFCB2C",
        secondary: "#006B61",
        third: "#C2FCF2",
        fourth: "#649B92",
      },
      borderColor: {
        primary: "#FFCB2C",
        secondary: "#006B61",
        third: "#C2FCF2",
        fourth: "#649B92",
      },
      ringColor: {
        primary: "#FFCB2C",
        secondary: "#006B61",
        third: "#C2FCF2",
        fourth: "#649B92",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
