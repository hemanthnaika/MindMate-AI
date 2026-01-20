/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#6B5CFF",
        secondary: "#2D144B",
        warning: "#FD824C",
        error: "#F62B2B",
        success: "#48B231",

        black: "#111113",
        white: "#ffffff",
        card: "#25123F",
      },
      fontFamily: {
        "Inter-Regular": ["Inter-Regular", "sans-serif"],
        "Inter-Medium": ["Inter-Medium", "sans-serif"],
        "Inter-Bold": ["Inter-Bold", "sans-serif"],

        "Poppins-Medium": ["Poppins-Medium", "sans-serif"],
        "Poppins-Bold": ["Poppins-Bold", "sans-serif"],
        "Poppins-ExtraBold": ["Poppins-ExtraBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
