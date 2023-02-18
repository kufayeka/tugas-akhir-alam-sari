import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { appNavigationEventBus } from "@/composables/app-navigation-event-bus";
import useDelay from "@/composables/use-delay";

import {
  viewComponentLoadingScreenDOM,
  viewComponentLoadingScreenMethods,
  showLoadingScreen,
} from "@/views/ViewComponentLoadingScreen";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/:pathMatch(.*)",
  //   name: "VIEW:PAGE_NOT_FOUND",
  //   component: () => import("@/views/ViewError404.vue"),
  // },
  {
    path: "/",
    redirect: "/monitor/main",
  },
];

const { delay } = useDelay();

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Show the loading screen
  //showLoadingScreen.value = true;

  // Define a function to remove the loading screen after a delay
  function removeLoadingScreen() {
    //showLoadingScreen.value = false;
  }

  // Wait for the route to be rendered before removing the loading screen
  appNavigationEventBus.once((x) => {
    if (x === "componentLoaded") {
    }
  });

  router.afterEach((to, from, failure) => {
    setTimeout(removeLoadingScreen, 500);
  });

  next(); // Continue with the navigation
});

export default router;
