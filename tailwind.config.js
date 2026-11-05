/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        heritage: {
          bg: "#0B0F17",
          canvas: "#111827",
          card: "rgba(255, 255, 255, 0.04)",
          terracotta: "#E05A47",
          terracottaGlow: "rgba(224, 90, 71, 0.25)",
          gold: "#F59E0B",
          border: "rgba(255, 255, 255, 0.1)"
        }
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
