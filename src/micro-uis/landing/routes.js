import HomePage from "./components/Home";
import { getTheme } from "../../actions/theme";

export default [
  {
    path: "/",
    exact: true,
    component: HomePage, // Add your route here
    loadData: dispatch => {
      dispatch(getTheme());
    }
  }
];
