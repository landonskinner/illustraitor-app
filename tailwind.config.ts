import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 1s infinite linear",
        "rainbow-wheel": "rainbow-wheel 60s infinite linear",
        "border-loader": "border-loader 30s infinite linear",
        "text-loader": "text-loader 8s infinite linear",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        "ai-pink": "rgba(var(--ai-pink), <alpha-value>)",
        "ai-purple": "rgba(var(--ai-purple), <alpha-value>)",
        "ai-blue": "rgba(var(--ai-blue), <alpha-value>)",
        "ai-orange": "rgba(var(--ai-orange), <alpha-value>)",
      },
      fontFamily: {
        nunito: "var(--font-nunito)",
        syne: "var(--font-syne)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "rainbow-wheel": {
          "100%": {
            backgroundPositionX: "-120%",
          },
        },
        shimmer: {
          "100%": {
            backgroundPositionX: "-50%",
          },
        },
        "border-loader": {
          "100%": {
            backgroundPositionX: "0px",
          },
        },
        "text-loader": {
          "100%": {
            backgroundPositionX: "0%",
          },
        },
      },
      height: {
        header: "var(--header-height)",
      },
      spacing: {
        header: "var(--header-height)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
