import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import axios from "axios";
import createHistory from "history/createMemoryHistory";
import rootReducer from "../src/reducers";
import config from "./config";

// Create a store and history based on a path
const createServerStore = (path = "/") => {
  const initialState = {};
  // We don't have a DOM, so let's create some fake history and push the current path
  const history = createHistory({ initialEntries: [path] });

  // All the middlewares
  const middleware = [
    thunk.withExtraArgument({ axios, paths: config.paths || {} }),
    routerMiddleware(history)
  ];
  const composedEnhancers = compose(applyMiddleware(...middleware));

  // Store it all
  const store = createStore(rootReducer, initialState, composedEnhancers);

  // Return all that I need
  return {
    history,
    store
  };
};

export default createServerStore;
