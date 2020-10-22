import axios from "axios";

export const server = "http://localhost:5000";

export const axiosRequest = async (configuration) => {
  const authToken = localStorage.getItem("token") || "";
  axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  const host = configuration.host || server;
  const path = configuration.path || "/";
  const method = configuration.method || "get";
  const data = configuration.data || null;
  return axios[method](`${host}${path}`, data);
};
