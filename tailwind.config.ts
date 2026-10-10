import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        /* Google Brand Colors (Neo-brutalist palette) */
        "gdg-blue": "var(--gdg-blue)",
        "gdg-red": "var(--gdg-red)",
        "gdg-yellow": "var(--gdg-yellow)",
        "gdg-green": "var(--gdg-green)",
        "gdg-purple": "var(--gdg-purple)",
        "gdg-cyan": "var(--gdg-cyan)",
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "sans-serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        neo: "4px 4px 0px var(--shadow-color)",
        "neo-sm": "2px 2px 0px var(--shadow-color)",
        "neo-md": "4px 4px 0px var(--shadow-color)",
        "neo-lg": "6px 6px 0px var(--shadow-color)",
        "neo-xl": "8px 8px 0px var(--shadow-color)",
      },
      borderRadius: {
        neo: "12px",
        "neo-lg": "16px",
      },
      borderWidth: {
        neo: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
