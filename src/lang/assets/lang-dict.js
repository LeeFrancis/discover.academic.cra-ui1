/* eslint-disable global-require, no-unused-vars */
/* This is purely a placeholder and will be overwritten by the build when yarn intl is run */
/* Having this here just stops the build breaking if the first thing that is done is yarn start */
const allLangs = {
  en: () => import(/* webpackChunkName: 'en' */ "../en")
};
export default allLangs;
