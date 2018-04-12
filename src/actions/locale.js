import { addLocaleData } from "react-intl";
import rtlDetect from "rtl-detect";
import axios from "../utils/axios/axios-interceptor";
import {
  LOCALE_CHANGE,
  LOCALE_REQUEST,
  LOCALE_REQUEST_ERROR,
  LOCALE_REQUEST_SUCCESS
} from "../utils/constants";

export const localeRequest = () => ({
  type: LOCALE_REQUEST
});

export const localeRequestError = err => ({
  type: LOCALE_REQUEST_ERROR,
  data: err
});

export const localeRequestSuccess = translation => ({
  type: LOCALE_REQUEST_SUCCESS,
  data: translation
});

export const localeChange = locale => ({
  type: LOCALE_CHANGE,
  currentLocale: locale,
  isRtl: rtlDetect.isRtlLang(locale)
});

export const getLocaleData = locale => () =>
  new Promise(resolve => {
    // eslint-disable-next-line global-require
    const langDict = require("../lang/assets/lang-dict").default;
    langDict[locale](lang => {
      addLocaleData([...lang]);
      resolve();
    });
  });

export const getLocaleTranslation = locale => (
  dispatch,
  getState,
  { localeApi }
) => {
  dispatch(localeRequest());

  return axios
    .get(`${localeApi}/${locale}`)
    .then(res => {
      dispatch(localeRequestSuccess(res.data));
      dispatch(localeChange(locale));
    })
    .catch(() => {
      dispatch(localeRequestError("Error getting translation"));
    });
};
