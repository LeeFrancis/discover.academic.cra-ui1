import basicResearchRoutes from "./micro-uis/landing/routes";
import { getTheme } from "./actions/theme";
import NotFound from "./components/NotFound";

const defaultLoadData = dispatch => {
  // Whatever is in here will get called for every route.
  dispatch(getTheme());
};
const routes = basicResearchRoutes.map(route =>
  Object.assign({ team: "DaVincis", defaultLoadData }, route)
);

export default routes.concat([
  {
    path: "*",
    component: NotFound,
    defaultLoadData
  }
]);