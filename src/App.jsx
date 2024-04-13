import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "./components/NotFound.jsx";
import { Checkout } from "./components/Checkout.jsx";
import { ShoopingCart } from "./components/ShoppingCart/ShoopingCart.jsx";
import Home from "./components/Home.jsx";
import { Layout } from "./layouts/Layout.jsx";
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
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
