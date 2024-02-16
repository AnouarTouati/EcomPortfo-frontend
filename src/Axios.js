import axios from "axios"

async function getAxios() {
    axios.defaults.withCredentials = true;
    await axios.get("http://localhost:80/sanctum/csrf-cookie");
    axios.defaults.withXSRFToken = true;
    // await axios.post("http://localhost:80/api/login", {
    //   email: "test@example.com",
    //   password: "password",
    // });
    // await axios.post("http://localhost:80/api/logout");
    return axios
  }

export default getAxios 