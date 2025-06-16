import type {Config} from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        // Add specific theme colors from screenshots
        "brand-teal": {
          DEFAULT: "hsl(var(--primary))", // Using primary as the main teal
          "50": "#F0FDFA",
          "100": "#CCFBF1",
          "200": "#99F6E4",
          "300": "#5EEAD4",
          "400": "#2DD4BF",
          "500": "#14B8A6", // Main teal shade
          "600": "#0D9488",
          "700": "#0F766E",
          "800": "#115E59",
          "900": "#134E4A",
        },
        "brand-orange": {
          DEFAULT: "hsl(var(--accent))", // Using accent as the main orange
          "50": "#FFF7ED",
          "100": "#FFEDD5",
          "200": "#FED7AA",
          "300": "#FDBA74",
          "400": "#FB923C",
          "500": "#F97316", // Main orange shade
          "600": "#EA580C",
          "700": "#C2410C",
          "800": "#9A3412",
          "900": "#7C2D12",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        18: "4.5rem", // now you can use `mr-18`
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
