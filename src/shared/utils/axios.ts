import axios from "axios";

export const APP_API = "https://web.lead2v.my/api/v1/";

export const axiosInstance = axios.create({
  baseURL: APP_API,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json; charset=utf-8",
  },
  withCredentials: true,
  timeout: 10000,
});
