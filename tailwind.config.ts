import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        jakarta: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      colors: {
        primary: "#4F46E5",
        secondary: "#EC4899",
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(90deg, #904BFF 0%, #C053C2 100%)",
      },
    },
  },
} satisfies Config;
