import axios, { AxiosInstance } from "axios";
let axiosSingleton: AxiosInstance | null = null;
export async function getAxios() {
  if (axiosSingleton) {
    return axiosSingleton;
  }

  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  axios.defaults.baseURL = "http://localhost:80/api";
  axiosSingleton = axios.create(axios.defaults);

  axiosSingleton.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response.status == 401 &&
        window.location.pathname != "/sign-in"
      ) {
        window.location.assign("/sign-in");
      }
      return Promise.reject(error);
    }
  );
  return axiosSingleton;
}
