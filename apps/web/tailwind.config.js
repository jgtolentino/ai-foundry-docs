/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
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
      colors: {
        // Tabler-inspired color palette
        primary: {
          50:  "#eef6ff",
          100: "#d9eaff",
          200: "#b7d4ff",
          300: "#8fbaff",
          400: "#5f9bff",
          500: "#2f7bff",   // main Tabler-like blue
          600: "#1f60d6",
          700: "#184bb0",
          800: "#163f8f",
          900: "#132f69",
          DEFAULT: "#2f7bff",
          foreground: "#ffffff",
        },
        slate: {
          25:  "#fbfcfe",
          50:  "#f6f7fb",
          100: "#eef0f6",
          200: "#e3e6ef",
          300: "#cfd5e3",
          400: "#a9b3c8",
          500: "#7e8aa3",
          600: "#5f6a82",
          700: "#485164",
          800: "#333a48",
          900: "#222734",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#f6f7fb",
        foreground: "#222734",
        secondary: {
          DEFAULT: "#f6f7fb",
          foreground: "#485164",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#eef0f6",
          foreground: "#7e8aa3",
        },
        accent: {
          DEFAULT: "#eef0f6",
          foreground: "#222734",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#222734",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#222734",
        },
      },
      borderRadius: {
        lg: "0.5rem", // 8px, Tabler card feel
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
        'tabler': '0.5rem'
      },
      boxShadow: {
        'tabler': '0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.1)'
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
  plugins: [],
}