import basicResearchRoutes from "./micro-uis/landing/routes";

export default [
  // {
  //   path: '*',
  //   component: NotFoundPage
  // }
].concat(
  basicResearchRoutes.map(route => Object.assign({ team: "DaVincis" }, route))
);
