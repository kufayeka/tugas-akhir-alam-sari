import { createApp } from "vue";
import { createPinia } from "pinia";
import { IonicVue } from "@ionic/vue";
const LottieAnimation = () => import("lottie-web-vue");
import MainRouter from "@/router/index";
import App from "@/App.vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables - copied from existing project */
import "@/ionic-themes.css";

// Import All Module's Bootstrapper
import bootstrapAllModules from "@/modules-bootstrapper";

(async () => {
  const pinia = createPinia();
  const router = MainRouter;

  const app = createApp(App);

  bootstrapAllModules.forEach((x) => app.use(x));

  app.use(router).use(pinia).use(LottieAnimation).use(IonicVue);

  app.mount("#app");

  // report error to tracking services
  app.config.errorHandler = (err, instance, info) => {
    console.log("REPORT:", err, instance, info);
  };
})();
