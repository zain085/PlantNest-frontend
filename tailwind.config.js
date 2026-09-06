/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f392b",
          hover: "#164e3b",
        },
        accent: {
          DEFAULT: "#2e7d32",
          light: "#e8f5e9",
        },
        clay: "#d4a373",
        bgmain: "#f8faf9",
        card: "#ffffff",
        ink: "#1f2937",
        muted: "#6b7280",
        success: "#10b981",
        warn: "#f59e0b",
        danger: "#ef4444",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -6px rgba(15, 57, 43, 0.12)",
        card: "0 2px 12px -2px rgba(15, 57, 43, 0.08)",
        glass: "0 8px 32px 0 rgba(15, 57, 43, 0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
      opacity: {
        4: "0.04",
        6: "0.06",
        8: "0.08",
        12: "0.12",
        15: "0.15",
        35: "0.35",
        45: "0.45",
        65: "0.65",
        85: "0.85",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "scale-in": "scale-in 0.2s ease-out both",
      },
    },
  },
  plugins: [],
}
