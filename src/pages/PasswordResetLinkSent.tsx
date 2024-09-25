import { Container, Typography } from "@mui/material";
import React from "react";

export const PasswordResetLinkSent = () => {
  return (
    <Container>
      <Typography padding={6} textAlign={"center"} variant="h4">
        An email with a link to resest your password has been sent to the
        address you provided.
      </Typography>
    </Container>
  );
};
