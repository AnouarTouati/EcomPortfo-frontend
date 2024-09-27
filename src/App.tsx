import React, { useEffect } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "./components/NotFound.js";
import { Checkout } from "./components/Checkout.js";
import { ShoppingCart } from "./components/ShoppingCart/ShoppingCart.tsx";
import Home from "./components/Home.tsx";
import { Layout } from "./layouts/Layout.js";
import { PaymentSuccess } from "./pages/PaymentSuccess.js";
import { PaymentFailed } from "./pages/PaymentFailed.js";
import { AdminLayout } from "./layouts/AdminLayout.tsx";
import { Products } from "./components/AdminDashboard/Products/Products.js";
import { Settings } from "./components/AdminDashboard/Settings.js";
import { Orders } from "./components/AdminDashboard/Orders/Orders.js";
import { Dashboard } from "./components/AdminDashboard/Dashboard.js";
import { ProductCreate } from "./components/AdminDashboard/Products/ProductCreate.tsx";
import { Order } from "./components/AdminDashboard/Orders/Order.tsx";
import SignUp from "./components/SignUp/SignUp.tsx";
import SignIn from "./components/SignIn/SignIn.tsx";
import { EmailVerification } from "./pages/EmailVerification.tsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store.ts";
import { getUser } from "./store/user/userSlice.ts";
import { PasswordResetLinkSent } from "./pages/PasswordResetLinkSent.tsx";
import PasswordReset from "./pages/PasswordReset.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />,
      },

      {
        path: "/sign-in",
        element: <SignIn />,
        errorElement: <NotFound />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
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
        path: "payment/success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment/failed",
        element: <PaymentFailed />,
      },
      {
        path: "verify-email/:id/:hash",
        element: <EmailVerification />,
      },
      {
        path: "password-reset-link-sent",
        element: <PasswordResetLinkSent />,
      },
      {
        path: "password-reset/:token",
        element: <PasswordReset />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/create",
        element: <ProductCreate />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:id",
        element: <Order />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return <RouterProvider router={router} />;
};
export default App;
