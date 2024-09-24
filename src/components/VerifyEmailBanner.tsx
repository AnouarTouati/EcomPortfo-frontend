import { Alert } from "@mui/material";
import React from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export const VerifyEmailBanner = () => {
  const user = useSelector((state: RootState) => state.user);

  return user.loggedIn && user.emailVerifiedAt == null ? (
    <Alert severity="warning">
      Please verify your email address by clicking the link we sent to you.
    </Alert>
  ) : (
    ""
  );
};
