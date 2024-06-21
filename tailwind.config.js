// tailwind.config.js
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // Enable dark mode based on the class 'dark'
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#1a202c", // Dark mode background color
          secondary: "#2d3748", // Dark mode secondary background color
          accent: "#4a5568", // Dark mode accent color
          text: "#cbd5e0", // Dark mode text color
          border: "#2d3748", // Dark mode border color
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark", "hover"],
      textColor: ["dark", "hover"],
      borderColor: ["dark"],
    },
  },
  plugins: [],
};
