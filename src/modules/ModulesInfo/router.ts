import MainRouter from "@/router/index";

// use arrow function to render component when needed (reduces web load);
const Module = () => import("./ModuleInfo.vue");

const moduleRoute = {
  path: "/info",
  component: Module,
  name: "VIEW:INFO",
};

async function moduleInfoRouter() {
  MainRouter.addRoute(moduleRoute);
}

export default moduleInfoRouter;
