import { createApp } from "vue";
import { createPinia } from "pinia";
import MainRouter from "@/router/index";
import "./assets/tailwind.css";
import Application from "@/App.vue";

// Import Capacitor Plugins
import { App } from "@capacitor/app";
import { SplashScreen } from "@capacitor/splash-screen";

import Vue3Lottie from "vue3-lottie";
import "vue3-lottie/dist/style.css";

// Create a new instance of the Vue app
const app = createApp(Application);
// Create a new instance of Pinia store
const pinia = createPinia();
// Create a new instance of Vue router
const router = MainRouter;

const allBootstrappedModuleNames: any[] = [];
const allBootstrappedModuleRouter: any[] = [];

// Initialize the Vue.js application
const initApp = async () => {
  // Use all modules bootstrapper to add global Vue plugins and components
  allBootstrappedModuleRouter.forEach((moduleRouter) => {
    app.use(moduleRouter);
  });

  // Add the router and Pinia store to the Vue app
  app.use(router);
  app.use(pinia);

  // Load LottieAnimation component asynchronously
  app.use(Vue3Lottie, { name: "Vue3Lottie" });

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
    if (state.isActive) {
      console.log("App is active");
    }
  });
};

const bootstrapAllModules = async () => {
  // Require all module's index.ts in the modules directory
  const modules: any = import.meta.glob("./modules/**/*.ts");
  for (const modulePath in modules) {
    const x = await modules[modulePath]();

    if (x.moduleName) {
      allBootstrappedModuleNames.push(x.moduleName);
    }

    // If the module has a router, push it to the allBootstrappedModuleRouter array
    if (x.router) {
      allBootstrappedModuleRouter.push(x.router);
    }
  }

  // Loop through each module
  console.log(allBootstrappedModuleNames);
};

// Start the App
(async () => {
  try {
    await runCapacitorPluginOnInit();
    await bootstrapAllModules();
    await initApp();
  } catch (error) {
    console.error(error);
  }
})();

// Export an empty object to avoid TypeScript warnings
export {};
