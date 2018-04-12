import axios from "axios";

import { axiosUnauthorized } from "./axios-unauthorized";

const instance = axios.create();

instance.interceptors.response.use(
  res => res,
  error => {
    axiosUnauthorized.intercept(error);

    return Promise.reject(error);
  }
);

export default instance;
