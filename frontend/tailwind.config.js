/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8b5cf6",
        "primary-dark": "#7c3aed",
        secondary: "#10b981",
        "secondary-dark": "#059669",
        background: "#0f172a",
        surface: "#1e293b",
        "surface-light": "#334155",
        text: "#f8fafc",
        "text-secondary": "#94a3b8",
        error: "#ef4444",
        success: "#22c55e",
        warning: "#f59e0b",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
