import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "./components/NotFound.jsx";
import { Checkout } from "./components/Checkout.jsx";
import { ShoopingCart } from "./components/ShoppingCart/ShoopingCart.jsx";
import Home from "./components/Home.jsx";
import { Layout } from "./layouts/Layout.jsx";
import getAxios from "./Axios.js";
import { PaymentSuccess } from "./pages/PaymentSuccess.jsx";
import { PaymentFailed } from "./pages/PaymentFailed.jsx";
const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />,
      },
      {
        path: "cart",
        element: <ShoopingCart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path:"payment/success",
        element: <PaymentSuccess />
      },{
        path:"payment/failed",
        element:<PaymentFailed />
      }
    ],
  },
]);

const App = () => {
  
  async function test(){
    const axios = await getAxios()
    const result = await axios.get('http://localhost:80/api/checkout')
    console.log(result)
    // window.open(result.data.url, '_blank', 'noopener,noreferrer')
    window.location.href=result.data.url
  }
  // test()
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
