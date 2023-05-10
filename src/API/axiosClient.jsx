// api/axiosClient.js
import axios from "axios";
import { parse, stringify } from "qs";
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://asm3-nodejs-api.onrender.com",

  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
