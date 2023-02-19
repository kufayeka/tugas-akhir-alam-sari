import { createApp, onBeforeMount, onMounted } from "vue";
import { createPinia } from "pinia";
import MainRouter from "@/router/index";
import "./assets/tailwind.css";
import Application from "@/App.vue";

// Import All Module's Bootstrapper
import bootstrapAllModules from "@/modules-bootstrapper";

// Import Capacitor Plugins
import { App } from "@capacitor/app";
import { SplashScreen } from "@capacitor/splash-screen";

// Initialize the Vue.js application
const initApp = async () => {
  // Create a new instance of Pinia store
  const pinia = createPinia();

  // Create a new instance of Vue router
  const router = MainRouter;

  // Create a new instance of the Vue app
  const app = createApp(Application);

  // Use all modules bootstrapper to add global Vue plugins and components
  bootstrapAllModules.forEach((x) => app.use(x));

  // Add the router and Pinia store to the Vue app
  app.use(router).use(pinia);

  // Mount the Vue app to the DOM element with ID "app"
  app.mount("#app");

  // Set up an error handler to report any errors to tracking services
  app.config.errorHandler = (err, instance, info) => {
    console.log("REPORT:", err, instance, info);
  };
};

// Initialize the Capacitor plugins on app start up
const runCapacitorPluginOnInit = async () => {
  // Show the splash screen while the app loads
  await SplashScreen.show();

  // Add a listener to detect when the app state changes
  await App.addListener("appStateChange", (state) => {
    console.log("App is active");
    if (state.isActive) {
      console.log("App is active");
    }
  });
};

// Run the Capacitor plugin initialization function
runCapacitorPluginOnInit();

// Run the Vue app initialization function
initApp();

// Export an empty object to avoid TypeScript warnings
export {};
