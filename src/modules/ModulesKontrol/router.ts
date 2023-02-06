import MainRouter from "@/router/index";

// use arrow function to render component when needed (reduces web load);
const Module = () => import("./ModuleKontrol.vue");

const moduleRoute = {
  path: "/kontrol",
  component: Module,
  name: "VIEW:KONTROL",
};

async function moduleKontrolRouter() {
  MainRouter.addRoute(moduleRoute);
}

export default moduleKontrolRouter;
