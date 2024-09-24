import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getAxios } from "../Axios";

const axiosInstance = await getAxios();
type Status = "loading" | "verified" | "error";
export const EmailVerification = () => {
  const { id, hash } = useParams();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");

  async function process() {
    try {
      const verified = searchParams.get("verified");
      if (verified == "1") {
        setStatus("verified");
      } else {
        const expires = searchParams.get("expires");
        const signature = searchParams.get("signature");
        await axiosInstance.get(
          `verify-email/${id}/${hash}?expires=${expires}&signature=${signature}`
        );
        setStatus("verified");
      }
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    process();
  }, []);

  return (
    <>
      <h1>Email Verification</h1>
      {status === "loading" ? (
        <h4>Loading ...</h4>
      ) : status === "verified" ? (
        <h4>Verified !</h4>
      ) : (
        <h4>Error</h4>
      )}
    </>
  );
};
