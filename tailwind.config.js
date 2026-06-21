/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5", // Premium Indigo
          light: "#6366F1",   // Light Indigo
          dark: "#3730A3",    // Deep Indigo
        },
        secondary: {
          DEFAULT: "#0F172A", // Dark Slate
          light: "#1E293B",   // Mid Slate
          dark: "#020617",    // Deep Navy
        },
        accent: "#F8FAFC",    // Off-white
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
