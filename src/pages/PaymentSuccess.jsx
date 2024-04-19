import React, { useEffect, useState } from "react";
import { redirect, useSearchParams } from "react-router-dom";
import getAxios from "../Axios";
import { Box, CircularProgress, Container, Grid } from "@mui/material";

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [progress, setProgress] = useState("loading");
  useEffect(() => {
    const stripeSessionId = searchParams.get("session_id");
    if (!stripeSessionId) {
      setError(true);
    } else {
      testSessionIdAgainstDb(stripeSessionId);
    }
  }, []);
  async function testSessionIdAgainstDb(stripeSessionId) {
    const axios = await getAxios();
    try {
      const result = await axios.get(
        `/orders/${stripeSessionId}`
      );
      console.log(result.status)
      if (result.status == 200) {
        setProgress("success");
      } else {
        setProgress("notfound");
      }
    } catch (err) {
      if(err.response.status == 404){
        setProgress('notfound')
      }else{

        setProgress("error");
      }
    }
  }
  return (
    <div>
      {progress === "loading" ? (
        
        <Box   display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh" sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>

      ) : progress === "success" ? (
        <h1>Success</h1>
      ) : progress === "notfound" ? (
        <h1>Page not found</h1>
      ) : (
        <h1>Something went wrong</h1>
      )}
    </div>
  );
};
