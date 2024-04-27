import { createContext } from "react";
import axios, { AxiosInstance } from "axios";

async function setUp(){
    axios.defaults.withCredentials = true;
    await axios.get("http://localhost:80/sanctum/csrf-cookie");
    axios.defaults.withXSRFToken = true;
    await axios.post("http://localhost:80/api/login", {
      email: "test@example.com",
      password: "password",
    });
    axios.defaults.baseURL="http://localhost:80/api"
    return axios.create(axios.defaults)
  }
//we are using only a context without a provider
//using provider requires useState and using setState to set an instance of axios causes it to make a random http request and crash
//on top of that using just a context with a default value like below insures that axios is ready before components try to use it
//which is not the case with provider with state
const AxiosContext = createContext<AxiosInstance>(await setUp());
export default AxiosContext

