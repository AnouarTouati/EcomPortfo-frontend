import React, { useEffect } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "./components/NotFound.js";
import { Checkout } from "./components/Checkout.js";
import { ShoppingCart } from "./components/ShoppingCart/ShoppingCart.tsx";
import Home from "./components/Home.tsx";
import { Layout } from "./layouts/Layout.js";
import { PaymentSuccess } from "./pages/PaymentSuccess.js";
import { PaymentFailed } from "./pages/PaymentFailed.js";
import { AdminDashboardLayout } from "./layouts/AdminDashboardLayout.tsx";
import { Products } from "./components/AdminDashboard/Products.js";
import { Settings } from "./components/AdminDashboard/Settings.js";
import { Orders } from "./components/AdminDashboard/Orders.js";
import { Dashboard } from "./components/AdminDashboard/Dashboard.js";
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
        element: <ShoppingCart />,
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
