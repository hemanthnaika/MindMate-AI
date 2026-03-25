/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#76A1B5",
        secondary: "#000000",
        tertiary: "#C29166",
        neutral: "#1A1C1E",
      },
      fontFamily: {
        "Plus-Regular": ["Plus-Regular", "sans-serif"],
        "Plus-Medium": ["Plus-Medium", "sans-serif"],
        "Plus-Bold": ["Plus-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
