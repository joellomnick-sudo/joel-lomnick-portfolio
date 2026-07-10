import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        richBlack: "#050505",
        warmIvory: "#F7F1E5",
        deepBrown: "#3A2416",
        mutedGold: "#C9A24A",
        teal: "#0FA3A3",
        emerald: "#1F6F4A",
        paper: "#FBF6EA",
        ink: "#15110D",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "Cormorant Garamond",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
      },
      boxShadow: {
        premium: "0 24px 70px rgba(0, 0, 0, 0.24)",
        gold: "0 0 0 1px rgba(201, 162, 74, 0.24), 0 22px 60px rgba(0, 0, 0, 0.26)",
      },
      backgroundImage: {
        blueprint:
          "linear-gradient(rgba(201,162,74,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,74,.10) 1px, transparent 1px)",
        "paper-grain":
          "radial-gradient(circle at 1px 1px, rgba(58,36,22,.12) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

export default config;
