import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar";
import { VerifyEmailBanner } from "../components/VerifyEmailBanner";

export const Layout = () => {
  return (
    <>
      <AppBar />
      <VerifyEmailBanner />
      <Outlet />
    </>
  );
};
