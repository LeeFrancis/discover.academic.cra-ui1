import axios from "../../../utils/axios/axios-interceptor";
import { TOPICS_REQUEST, TOPICS_REQUEST_ERROR, TOPICS_REQUEST_SUCCESS } from "../utils/constants";
export const topicsRequest = () => ({
  type: TOPICS_REQUEST
});

export const topicsRequestError = (err) => ({
  type: TOPICS_REQUEST_ERROR,
  data: err
});

export const topicsRequestSuccess = ({ topics = [] }) => ({
  type: TOPICS_REQUEST_SUCCESS,
  data: topics
});

// @TODO this interfaceId needs to be pulled dynamically when it is available
export const getTopics = (interfaceId = "refarch") => (dispatch, getState, { topicsApi }) => {
  dispatch(topicsRequest());

  return axios.get(`${topicsApi}/${interfaceId}`)
    .then((res) => {
      dispatch(topicsRequestSuccess(res.data.message.content));
    })
    .catch(() => {
      dispatch(topicsRequestError("Error getting Topics"));
    });
};
