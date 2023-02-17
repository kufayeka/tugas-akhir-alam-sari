import { createApp } from "vue";
import { createPinia } from "pinia";
const LottieAnimation = () => import("lottie-web-vue");
import MainRouter from "@/router/index";
import "./assets/tailwind.css";
import App from "@/App.vue";

// Import All Module's Bootstrapper
import bootstrapAllModules from "@/modules-bootstrapper";

(async () => {
  const pinia = createPinia();
  const router = MainRouter;

  const app = createApp(App);

  bootstrapAllModules.forEach((x) => app.use(x));

  app.use(router).use(pinia).use(LottieAnimation);

  app.mount("#app");

  // report error to tracking services
  app.config.errorHandler = (err, instance, info) => {
    console.log("REPORT:", err, instance, info);
  };
})();
