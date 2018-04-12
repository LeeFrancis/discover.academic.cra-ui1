import {
  LOCALE_CHANGE,
  LOCALE_REQUEST,
  LOCALE_REQUEST_ERROR,
  LOCALE_REQUEST_SUCCESS
} from "../utils/constants";

const initialState = {
  currentLocale: "en",
  isRtl: false,
  isFetching: false,
  hasFetched: false,
  error: "",
  data: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCALE_CHANGE:
      return {
        ...state,
        currentLocale: action.currentLocale,
        isRtl: action.isRtl
      };
    case LOCALE_REQUEST:
      return { ...state, isFetching: true };
    case LOCALE_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
        hasFetched: true
      };
    case LOCALE_REQUEST_ERROR:
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
