import axios from "axios";

const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyNSIsIkhldEhhblN0cmluZyI6IjE2LzEyLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY3MTE0ODgwMDAwMCIsIm5iZiI6MTY0MTU3NDgwMCwiZXhwIjoxNjcxMjk2NDAwfQ.cB7cdIfS0TKI1Yx_WRS-tEOt5K5yf3QJCot63SYEOHo";

const api = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/",
});

api.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      TokenCybersoft: TOKEN_CYBERSOFT,
      Authorization: localStorage.getItem("UserAdmin")
        ? "Bearer " + JSON.parse(localStorage.getItem("UserAdmin")).accessToken
        : "",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
