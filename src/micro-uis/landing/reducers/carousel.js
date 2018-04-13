import { CAROUSEL_REQUEST, CAROUSEL_REQUEST_ERROR, CAROUSEL_REQUEST_SUCCESS }
from "../utils/constants";

const initialState = {
  isFetching: false,
  hasFetched: false,
  error: "",
  data: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
  case CAROUSEL_REQUEST:
    return { ...state, isFetching: true };
  case CAROUSEL_REQUEST_SUCCESS:
    return { ...state, isFetching: false, data: action.data, hasFetched: true };
  case CAROUSEL_REQUEST_ERROR:
    return { ...state, isFetching: false, error: action.data, hasFetched: true };
  default:
    return state;
  }
};
