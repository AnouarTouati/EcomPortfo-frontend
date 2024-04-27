import React, { useContext, useEffect, useState } from "react";
import { redirect, useSearchParams } from "react-router-dom";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import AxiosContext from "../AxiosProvider";

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [progress, setProgress] = useState("loading");
  const axios = useContext(AxiosContext);
  useEffect(() => {
    const stripeSessionId = searchParams.get("session_id");
    if (!stripeSessionId) {
      setProgress('error');
    } else {
      testSessionIdAgainstDb(stripeSessionId);
    }
  }, []);
  async function testSessionIdAgainstDb(stripeSessionId : string) {
    
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
