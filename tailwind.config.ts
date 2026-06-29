import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        nox: {
          50: "#f0f0ff",
          100: "#e0e0ff",
          200: "#c4c4ff",
          300: "#9999ff",
          400: "#6b6bff",
          500: "#4444ff",
          600: "#2222ff",
          700: "#1111ee",
          800: "#1111cc",
          900: "#0a0a88",
          950: "#050544",
        },
      },
    },
  },
  plugins: [],
};
export default config;
