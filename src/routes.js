import landingRoutes from "./micro-uis/landing/routes";
import resultsRoutes from "./micro-uis/results/routes";

import { getTheme } from "./actions/theme";
import NotFound from "./components/NotFound";

const defaultLoadData = dispatch => {
  // Whatever is in here will get called for every route.
  dispatch(getTheme());
};
const routes = landingRoutes
  .map(route => Object.assign({ team: "DaVincis", defaultLoadData }, route))
  .concat(
    resultsRoutes.map(route =>
      Object.assign({ team: "AnotherTeam", defaultLoadData }, route)
    )
  );

export default routes.concat([
  {
    path: "*",
    component: NotFound,
    defaultLoadData
  }
]);
