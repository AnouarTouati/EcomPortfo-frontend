import { Container, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { default as Header } from "./PrimarySearchAppBar";
import getAxios from "../Axios";
export const Checkout = () => {
  const [email,setEmail] = useState("")

  async function submit(){
    const axios = await getAxios()
    const result = await axios.post('http://localhost:80/api/order',{
      email:email
    })
    console.log(result)
  }
  return (
    <>
      <Header />
      <Container>
        <Typography padding={2} variant="h4">Please provide your email address to proceed</Typography>
        <TextField onChange={(event)=>{setEmail(event.target.value)}} padding={2} id="outlined-basic" label="Email" variant="outlined" />
        <Typography padding={2} variant="body1">
          After clicking submit you will be redirected to a page where you can
          securely input your credit/debit card credentials and process the
          request
        </Typography>
        <Button variant="contained" onClick={()=>{
          submit()
        }}>Submit</Button>
      </Container>
    </>
  );
};
