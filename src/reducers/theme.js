import {
  THEME_REQUEST,
  THEME_REQUEST_ERROR,
  THEME_REQUEST_SUCCESS
} from "../utils/constants";

const initialState = {
  isFetching: false,
  hasFetched: false,
  error: "",
  data: {
    colors: [],
    logos: {}
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case THEME_REQUEST:
      return { ...state, isFetching: true };
    case THEME_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
        hasFetched: true
      };
    case THEME_REQUEST_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.data,
        hasFetched: true
      };
    default:
      return state;
  }
};
