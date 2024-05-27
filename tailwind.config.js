import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Merriweather: ["Merriweather", "serif"],
        MartelSans: ["Martel Sans", "sans-serif"],
        KneWave: ["Knewave", "system-ui"],
        KronaOne: ["Krona One", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
