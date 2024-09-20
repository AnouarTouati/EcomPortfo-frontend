import { Container, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { getAxios } from "../Axios";
const axiosInstance = await getAxios();
export const Checkout = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  async function submit() {
    try {
      const result = await axiosInstance.post("/orders", {
        email: email,
      });
      window.location.href = result.data.url;
    } catch (err) {
      setError(true);
    }
  }
  return (
    <>
      {error ? (
        <Container>
          <Typography padding={2} variant="h4">
            Something Went Wrong
          </Typography>
        </Container>
      ) : (
        <Container>
          <Typography padding={2} variant="h4">
            Please provide your email address to proceed
          </Typography>
          <TextField
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <Typography padding={2} variant="body1">
            After clicking submit you will be redirected to a page where you can
            securely input your credit/debit card credentials and process the
            request
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              submit();
            }}
          >
            Submit
          </Button>
        </Container>
      )}
    </>
  );
};
