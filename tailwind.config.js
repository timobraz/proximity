/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        prim: "#38c746",
        sec: "#fbfbfe",
        acc: "#657df0",
        lightacc: "#5a94f2",
        sec2: "#2F4F4F",
        seclight: "#DBDBDB",
      },
    },
  },
  plugins: [],
};
