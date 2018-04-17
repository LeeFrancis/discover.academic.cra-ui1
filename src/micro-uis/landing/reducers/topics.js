import {
  TOPICS_REQUEST,
  TOPICS_REQUEST_ERROR,
  TOPICS_REQUEST_SUCCESS
} from "../utils/constants";

const initialState = {
  isFetching: false,
  hasFetched: false,
  error: "",
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOPICS_REQUEST:
      return { ...state, isFetching: true };
    case TOPICS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
        hasFetched: true
      };
    case TOPICS_REQUEST_ERROR:
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
