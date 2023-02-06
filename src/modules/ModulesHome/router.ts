import MainRouter from "@/router/index";

// use arrow function to render component when needed (reduces web load);
const Module = () => import("./ModuleHome.vue");

const moduleRoute = {
  path: "/",
  component: Module,
  name: "VIEW:HOME",
};

async function moduleHomeRouter() {
  MainRouter.addRoute(moduleRoute);
}

export default moduleHomeRouter;
