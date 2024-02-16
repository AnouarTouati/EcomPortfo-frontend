import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Header } from "./components/Header";
import getAxios from "./Axios";
import { Link } from "react-router-dom";
function App() {
  const [products,setProducts] = useState({})
   async function testAxios(){
    const axios = await getAxios();
    const data1 = await axios.get("http://localhost:80/api/test");
    console.log(data1);
    const result = await axios.post("http://localhost:80/api/cart/products",{product_id:1})
    console.log(result)
    const data = await axios.get("http://localhost:80/api/cart/products")
    console.log(data) 
   }
  useEffect(() => {
   
    testAxios()
  }, []);
  return (
    <>
      <Header />
      <Link to='cart'>Cart</Link>
    </>
  );
}

export default App;
