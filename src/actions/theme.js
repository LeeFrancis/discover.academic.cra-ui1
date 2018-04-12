import {
  THEME_REQUEST,
  THEME_REQUEST_ERROR,
  THEME_REQUEST_SUCCESS
} from "../utils/constants";
import themeMock from "../mocks/theme.json";

export const themeRequest = () => ({
  type: THEME_REQUEST
});

export const themeRequestError = err => ({
  type: THEME_REQUEST_ERROR,
  data: err
});

export const themeRequestSuccess = ({ branding = {} }) => ({
  type: THEME_REQUEST_SUCCESS,
  data: branding
});

/* @TODO this interfaceID needs to be pulled dynamically when it is available
 * @TODO remove mock and use real service once it is available.
 */
export const getTheme = () => dispatch => {
  dispatch(themeRequest());
  dispatch(themeRequestSuccess(themeMock.message.content));
};
