import axios from "../../../utils/axios/axios-interceptor";
import { CAROUSEL_REQUEST, CAROUSEL_REQUEST_ERROR, CAROUSEL_REQUEST_SUCCESS }
from "../utils/constants";

export const carouselRequest = () => ({
  type: CAROUSEL_REQUEST
});

export const carouselRequestError = (err) => ({
  type: CAROUSEL_REQUEST_ERROR,
  data: err
});

export const carouselRequestSuccess = (carouselData = {}) => ({
  type: CAROUSEL_REQUEST_SUCCESS,
  data: carouselData
});

// @todo this is temporary
export const getCarousel = () => (dispatch, getState, { paths }) => {
  dispatch(carouselRequest());
  axios.defaults.headers.common.ebscosessionid = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJiNzgxMTZkZC01YjU1LTQ5MzktOTc5Zi1jMmUwMWE1ZGQ0YjQiLCJleHAiOjE2Njc4NjYzNTgxOTMsImlhdCI6MTUxMDA5OTk2M30.VC7pDMbKP2ScsML2PaqOVPu8FZXFNnUQesQt5x9a8U7DfDTRru0KffcNsG1F_tjl2MQucFd1GnOYkucGlZDBaJ1aRQbmdmVyTI7vFrUDME_zao1YBp8chKkSXWcLD9OLBQRe_oT2Y6Y1Y02syknuZKd8qniemYIMIA9HMb-5_eI";
  return axios.get(paths.carouselApi, {withCredentials: true})
    .then((res) => {
      dispatch(carouselRequestSuccess(res.data.message.content));
    })
    .catch(() => {
      dispatch(carouselRequestError("Error getting carousel data"));
    });
};
