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
      backgroundImage: {
        'gradient-solar': 'var(--gradient-solar)',
        'gradient-solar-flare': 'var(--gradient-solar-flare)',
        'gradient-aurora': 'var(--gradient-aurora)',
        'gradient-aurora-animated': 'var(--gradient-aurora-animated)',
        'gradient-cosmic': 'var(--gradient-cosmic)',
        'gradient-space': 'var(--gradient-space)',
        'gradient-nebula': 'var(--gradient-nebula)',
        'gradient-plasma': 'var(--gradient-plasma)',
      },
      backdropFilter: {
        'glass': 'var(--glass-backdrop)',
      },
      backgroundColor: {
        'glass': 'var(--glass-bg)',
      },
      borderColor: {
        'glass': 'var(--glass-border)',
      },
      boxShadow: {
        'solar': 'var(--shadow-solar)',
        'aurora': 'var(--shadow-aurora)',
        'cosmic': 'var(--shadow-cosmic)',
        'plasma': 'var(--shadow-plasma)',
      },
      filter: {
        'glow-solar': 'var(--glow-solar)',
        'glow-aurora': 'var(--glow-aurora)',
      },
      transitionTimingFunction: {
        'smooth': 'var(--transition-smooth)',
        'bounce': 'var(--transition-bounce)',
      },
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "33%": { transform: "translateY(-8px) translateX(2px)" },
          "66%": { transform: "translateY(4px) translateX(-2px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        "pulse-aurora": {
          "0%, 100%": { 
            backgroundPosition: "0% 50%",
            transform: "scale(1)"
          },
          "50%": { 
            backgroundPosition: "100% 50%",
            transform: "scale(1.02)"
          },
        },
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "rotate-planet": {
          from: { transform: "rotate(0deg) translateX(100px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(100px) rotate(-360deg)" },
        },
        "solar-flare": {
          "0%": { 
            transform: "scale(1) rotate(0deg)",
            opacity: "0.8"
          },
          "50%": { 
            transform: "scale(1.2) rotate(180deg)",
            opacity: "1"
          },
          "100%": { 
            transform: "scale(1) rotate(360deg)",
            opacity: "0.8"
          },
        },
        "particle-drift": {
          "0%": { 
            transform: "translateX(-100px) translateY(0px)",
            opacity: "0"
          },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { 
            transform: "translateX(100vw) translateY(-50px)",
            opacity: "0"
          },
        },
        "aurora-wave": {
          "0%, 100%": { 
            transform: "translateY(0px) skewX(0deg)",
            opacity: "0.6"
          },
          "50%": { 
            transform: "translateY(-20px) skewX(5deg)",
            opacity: "0.9"
          },
        },
        "zoom-in": {
          from: { 
            transform: "scale(0.8) rotateX(15deg)",
            opacity: "0"
          },
          to: { 
            transform: "scale(1) rotateX(0deg)",
            opacity: "1"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "float-delayed": "float-delayed 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "pulse-aurora": "pulse-aurora 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "rotate-planet": "rotate-planet 30s linear infinite",
        "solar-flare": "solar-flare 4s ease-in-out infinite",
        "particle-drift": "particle-drift 8s linear infinite",
        "aurora-wave": "aurora-wave 6s ease-in-out infinite",
        "zoom-in": "zoom-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
