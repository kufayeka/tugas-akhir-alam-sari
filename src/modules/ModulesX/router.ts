import MainRouter from "@/router/index";

// use arrow function to render component when needed (reduces web load);
const Module = () => import("./ModuleHome.vue");

const moduleRoute = {
  path: "/module",
  component: Module,
  name: "VIEW:MODULE",
};

async function moduleHomeRouter() {
  MainRouter.addRoute(moduleRoute);
}

export default moduleHomeRouter;
