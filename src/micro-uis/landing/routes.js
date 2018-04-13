import HomePage from "./containers/Home";

export default [
  {
    path: "/",
    exact: true,
    component: HomePage, // Add your route here
    loadData: dispatch => {}
  }
];
