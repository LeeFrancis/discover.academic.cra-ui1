import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import theme from "./theme";
import locale from "./locale";
import basicResearcherReducers from "../micro-uis/landing/reducers";

export default combineReducers(
  Object.assign({ router, theme, locale }, basicResearcherReducers, {
    paths(state = {}) {
      return state;
    }
  })
);
