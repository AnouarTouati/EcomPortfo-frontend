import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store.ts";
import { getUser } from "../store/user/userSlice.ts";

export const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};
