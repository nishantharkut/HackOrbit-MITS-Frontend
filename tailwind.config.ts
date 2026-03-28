import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body: ['Epilogue', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: "hsl(var(--bg))",
          raised: "hsl(var(--bg-raised))",
          elevated: "hsl(var(--bg-elevated))",
          card: "hsl(var(--bg-card))",
        },
        text: {
          DEFAULT: "hsl(var(--text))",
          dim: "hsl(var(--text-dim))",
          ghost: "hsl(var(--text-ghost))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          dim: "hsl(var(--accent-dim) / 0.10)",
          glow: "hsl(var(--accent-glow) / 0.18)",
        },
        keyword: {
          DEFAULT: "hsl(var(--keyword))",
          dim: "hsl(var(--keyword-dim) / 0.12)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          dim: "hsl(var(--warning-dim) / 0.10)",
        },
        positive: "hsl(var(--positive))",
        negative: "hsl(var(--negative))",
        border: {
          DEFAULT: "hsl(var(--border) / 0.07)",
          faint: "hsl(var(--border-faint) / 0.03)",
          neutral: "hsl(var(--border-neutral) / 0.05)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
