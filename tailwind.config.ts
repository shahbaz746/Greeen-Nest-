import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F3EEE2",
        paper: "#FBF9F3",
        moss: {
          DEFAULT: "#4B5A3B",
          light: "#6E7F53",
          dark: "#37432B",
        },
        clay: {
          DEFAULT: "#8B5E3C",
          light: "#B08360",
          dark: "#5F3F27",
        },
        sage: "#A9B593",
        ink: "#2B2A24",
        bark: "#463A2E",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "#2B2A24",
            "--tw-prose-headings": "#37432B",
            "--tw-prose-links": "#4B5A3B",
            "--tw-prose-bold": "#2B2A24",
            "--tw-prose-quotes": "#5F3F27",
            "--tw-prose-quote-borders": "#B08360",
            maxWidth: "68ch",
            a: {
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              fontWeight: "500",
            },
          },
        },
      }),
      keyframes: {
        "grow-in": {
          "0%": { transform: "scaleY(0)", opacity: "0" },
          "100%": { transform: "scaleY(1)", opacity: "1" },
        },
      },
      animation: {
        "grow-in": "grow-in 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
