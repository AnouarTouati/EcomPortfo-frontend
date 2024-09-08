import { createContext } from "react";
import axios, { AxiosInstance } from "axios";

async function setUp() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  axios.defaults.baseURL = "http://localhost:80/api";
  const axiosInstance = axios.create(axios.defaults);

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>  {
      if (
        error.response.status == 401 &&
        window.location.pathname != "/sign-in"
      ) {
        window.location.assign("/sign-in");
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
}
//we are using only a context without a provider
//using provider requires useState and using setState to set an instance of axios causes it to make a random http request and crash
//on top of that using just a context with a default value like below insures that axios is ready before components try to use it
//which is not the case with provider with state
const AxiosContext = createContext<AxiosInstance>(await setUp());
export default AxiosContext;
