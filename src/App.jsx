import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Header } from "./components/Header";
import axios from "axios";
function App() {
  const [products,setProducts] = useState({})
  async function setUpAxios() {
    axios.defaults.withCredentials = true;
    await axios.get("http://localhost:80/sanctum/csrf-cookie");
    axios.defaults.withXSRFToken = true;
    await axios.post("http://localhost:80/api/login", {
      email: "test@example.com",
      password: "password",
    });
    const data1 = await axios.get("http://localhost:80/api/test");
    console.log(data1);
    const result = await axios.post("http://localhost:80/api/cart/products",{product_id:1})
    console.log(result)
    const data = await axios.get("http://localhost:80/api/cart/products")
    console.log(data) 
  }
  useEffect(() => {
    setUpAxios();
  }, []);
  return (
    <>
      <Header />
    </>
  );
}

export default App;
