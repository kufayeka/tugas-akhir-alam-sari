import { createApp, onBeforeMount, onMounted } from "vue";
import { createPinia } from "pinia";
const LottieAnimation = () => import("lottie-web-vue");
import MainRouter from "@/router/index";
import "./assets/tailwind.css";
import Application from "@/App.vue";

// Import All Module's Bootstrapper
import bootstrapAllModules from "@/modules-bootstrapper";

// Import Capacitor Plugins
import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { SplashScreen } from "@capacitor/splash-screen";

const initApp = async () => {
  const pinia = createPinia();
  const router = MainRouter;

  const app = createApp(Application);

  bootstrapAllModules.forEach((x) => app.use(x));

  app.use(router).use(pinia).use(LottieAnimation);

  app.mount("#app");

  // report error to tracking services
  app.config.errorHandler = (err, instance, info) => {
    console.log("REPORT:", err, instance, info);
  };
};

const runCapacitorPluginOnInit = async () => {
  await SplashScreen.show();

  await App.addListener("appStateChange", (state) => {
    console.log("WEB SECTION: APP is active");
    if (state.isActive) {
      console.log("WEB SECTION: APP is active");
    }
  });
};

runCapacitorPluginOnInit();

initApp();

export {};
