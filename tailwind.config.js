/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Skyvidya custom colors
        skyvidya: {
          deepBlue: "#1b7fa8",
          seaBlue: "#4fb3ce",
          skyBlue: "#65d0e6",
          vibrantGreen: "#69c998",
          freshGreen: "#8edc7f",
          coral: "#f7a58c",
          peach: "#ffc29e",
          teal: "#2aa1b7",
          mint: "#a5e1d2",
          lightGray: "#f5f7f9",
          mediumGray: "#e0e0e0",
          darkGray: "#555555",
          cta: "#4cc38a",
        },
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
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "fade-in-up": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-in-up-delay-100": "fade-in-up 0.5s ease-out 0.1s both",
        "fade-in-up-delay-200": "fade-in-up 0.5s ease-out 0.2s both",
        "fade-in-up-delay-300": "fade-in-up 0.5s ease-out 0.3s both",
      },
      backgroundImage: {
        "ocean-to-sky": "linear-gradient(135deg, #1b7fa8, #65d0e6)",
        "earth-tone": "linear-gradient(135deg, #69c998, #8edc7f)",
        "warm-climate": "linear-gradient(135deg, #f7a58c, #ffc29e)",
        "full-spectrum":
          "linear-gradient(135deg, #1b7fa8, #4fb3ce, #65d0e6, #69c998, #8edc7f)",
        "dark-blue": "linear-gradient(135deg, #0e3b5a, #1b7fa8)",
        "coral-gradient": "linear-gradient(135deg, #f7a58c, #ffc29e)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
