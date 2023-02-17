/** @type {import('tailwindcss').Config} */
const konstaConfig = require("konsta/config");

// wrap your config with konstaConfig
module.exports = konstaConfig({
  // rest of your usual Tailwind CSS config here
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
