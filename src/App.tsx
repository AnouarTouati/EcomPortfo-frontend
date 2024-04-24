import React, { useEffect } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "./components/NotFound.jsx";
import { Checkout } from "./components/Checkout.jsx";
import { ShoopingCart } from "./components/ShoppingCart/ShoopingCart.jsx";
import Home from "./components/Home.jsx";
import { Layout } from "./layouts/Layout.jsx";
import { PaymentSuccess } from "./pages/PaymentSuccess.jsx";
import { PaymentFailed } from "./pages/PaymentFailed.jsx";
import getAxios from "./Axios.js";
import { AdminDashboardLayout } from "./layouts/AdminDashboardLayout.js";
import { Products } from "./components/AdminDashboard/Products.jsx";
import { Settings } from "./components/AdminDashboard/Settings.jsx";
import { Orders } from "./components/AdminDashboard/Orders.jsx";
import { Dashboard } from "./components/AdminDashboard/Dashboard.jsx";
const router = createBrowserRouter([
  {
    path:"/",
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
  {
    path:"/admin",
    element: <AdminDashboardLayout />,
    children: [
      {
        path:"",
        element: <Dashboard />
      },
      {
        path:"products",
        element: <Products />
      },
      {
        path:"orders",
        element: <Orders />
      },
      {
        path:"settings",
        element: <Settings />
      }
    ]
  }
]);

const App = () => {
  
   return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
