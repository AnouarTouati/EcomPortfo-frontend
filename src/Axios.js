import axios from "axios"

let axiosInstance = null;

async function getAxios() {
  if(axiosInstance == null){
  
    axios.defaults.withCredentials = true;
    await axios.get("http://localhost:80/sanctum/csrf-cookie");
    axios.defaults.withXSRFToken = true;
    await axios.post("http://localhost:80/api/login", {
      email: "test@example.com",
      password: "password",
    });
    axios.defaults.baseURL="http://localhost:80/api"
    axiosInstance = axios.create(axios.defaults)//create an instance with the current global config
    // await axios.post("http://localhost:80/api/logout");
  }
   
    return axiosInstance
  }

export default getAxios 