import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:       "#F5F0E8",
        "cream-warm":"#EDE4D4",
        ink:         "#0E100F",
        forest:      "#1C2A1E",
        ochre:       "#C8903A",
        "ochre-light":"#D4A055",
        sand:        "#D4C4A8",
        "warm-grey": "#8C8880",
        sage:        "#5C7A5E",
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans:    ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
