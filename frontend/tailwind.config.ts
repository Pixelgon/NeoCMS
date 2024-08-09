import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "pxlgn-gradient": "linear-gradient(90deg, #00CCFF 0%, #1CD2E6 57%, #58DEB1 80%, #91E97E 100%)",
        "navbar": "linear-gradient(180deg, rgba(21, 28, 36, 40%) 0%, rgba(21, 28, 36, 80%) 100%)",
        "prim-gradient": "linear-gradient(180deg, rgba(34,38,42,1) 80%, rgba(21,28,36,1) 100%)",
        "sec-gradient": "linear-gradient(180deg, rgba(34,38,42,1) 0%, rgba(21,28,36,1) 10%, rgba(21,28,36,1) 90%, rgba(34,38,42,1) 100%)",
        "header-gradient": "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(34,38,42,1) 100%)",
      },
      colors: {
        "prim": "#00ccff",
        "wh": "rgba(255 255 255 / 0.9)",
        "bg-sec": "#151c24",
        "bg": "#22262a",
        "btn-txt": "#373737",
        "menu": "#151c24cc"
      },
      fontFamily: {
        "quicksand": "var(--quicksand)",
        "open-sans": "var(--open-sans)",
      },
    },
  },
  plugins: [],
};
export default config;
