/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const konstaConfig = require("konsta/config");

// wrap your config with konstaConfig
module.exports = konstaConfig({
  konsta: {
    colors: {
      primary: "#2A9134", //default"#007aff",
    },
  },
  // rest of your usual Tailwind CSS config here
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "pasty-white-people": "#ffffff",
        "black-overlay": "rgba(0,0,0,0.5)",
      },
      boxShadow: {
        card1:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        card2:
          "rgba(50, 50, 93, 0.3) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        bottomNav:
          "rgba(0, 0, 0, 0.5) 0px 10px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      },
      scale: {
        98: "0.98",
      },
      height: {
        "custom-80": "80%",
      },
    },
  },
  plugins: [],
});
