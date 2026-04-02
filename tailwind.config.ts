import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "24px",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        accent: {
          DEFAULT: "#00C2B2",
          hover: "#00A99C",
          glow: "rgba(0, 194, 178, 0.18)",
          border: "rgba(0, 194, 178, 0.30)",
        },
        bg: "#0A0F1E",
        surface: {
          DEFAULT: "#111827",
          2: "#1A2235",
        },
        vtext: {
          DEFAULT: "#F0F4FF",
          muted: "#8C9AB0",
          dim: "#4A5568",
        },
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        vborder: "rgba(255, 255, 255, 0.07)",
      },
      borderRadius: {
        card: "12px",
        pill: "100px",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
