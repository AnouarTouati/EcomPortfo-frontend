import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { getAxios } from "../Axios";

const axiosInstance = await getAxios();
export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [progress, setProgress] = useState("loading");

  useEffect(() => {
    const stripeSessionId = searchParams.get("session_id");
    if (!stripeSessionId) {
      setProgress("error");
    } else {
      testSessionIdAgainstDb(stripeSessionId);
    }
  }, []);
  async function testSessionIdAgainstDb(stripeSessionId: string) {
    try {
      const result = await axiosInstance.get(`/orders/${stripeSessionId}`);
      console.log(result.status);
      if (result.status == 200) {
        setProgress("success");
      } else {
        setProgress("notfound");
      }
    } catch (error: any) {
      if (error.response.status == 404) {
        setProgress("notfound");
      } else {
        setProgress("error");
      }
    }
  }
  return (
    <div>
      {progress === "loading" ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{ display: "flex" }}
        >
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
