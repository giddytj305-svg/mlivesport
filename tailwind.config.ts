import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F1014", // Deep dark background
        card: "#1C1E26",       // Lighter dark for cards
        sidebar: "#14161B",    // Sidebar color
        primary: "#00E676",    // The bright green accent
        "primary-hover": "#00C853",
        secondary: "#2A2D35",  // Input backgrounds
        muted: "#8F95A3",      // Gray text
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
export default config;
