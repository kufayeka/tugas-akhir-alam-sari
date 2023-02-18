// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
//import babel from "vite-plugin-babel";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
      //
    }),
    // babel({
    //   babelConfig: {
    //     babelrc: false,
    //     configFile: false,
    //     plugins: ["@vue/babel-plugin-jsx"],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {},
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
