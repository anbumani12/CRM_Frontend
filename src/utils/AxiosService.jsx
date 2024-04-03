import axios from "axios";

let AxiosService = axios.create({
  baseURL: "https://capstone-vbjb.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosService.interceptors.request.use(
  (config) => {
    if (config.authenticate) {
      let token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default AxiosService;
