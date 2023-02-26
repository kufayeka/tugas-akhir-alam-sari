import MainRouter from "@/router/index";

// use arrow function to render component when needed (reduces web load);
const Module = () => import("./ModuleMonitor.vue");
const Main = () => import("./views/ViewMain.vue");
const Kumbung1 = () => import("./views/ViewKumbung1.vue");
const Kumbung2 = () => import("./views/ViewKumbung2.vue");

const moduleRoute = {
  path: "/monitor",
  component: Module,
  children: [
    {
      path: "main",
      name: "monitor",
      component: Main,
    },
    {
      path: "kumbung1",
      name: "kumbung1",
      component: Kumbung1,
    },
    {
      path: "kumbung2",
      name: "kumbung2",
      component: Kumbung2,
    },
  ],
};

export default function () {
  MainRouter.addRoute(moduleRoute);
}
