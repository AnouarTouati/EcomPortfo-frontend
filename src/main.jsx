import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "./components/NotFound.jsx";
import { Checkout } from "./components/Checkout.jsx";
import { ShoopingCart } from "./components/ShoppingCart/ShoopingCart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    
    <RouterProvider router={router} />
  </>
);
