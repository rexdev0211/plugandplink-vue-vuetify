module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        plprimary: "#4eaf33",
        plsecondary: "#c1c7d1",
        plthird: "#333"
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"]
    }
  },
  plugins: []
};
