import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Product } from "./Product";
import getAxios from "../../Axios";

export const ShoopingCart = () => {
  const [products,setProducts] = useState([])
  async function getData(){
    const axios = await getAxios()
    // const result = await axios.post("http://localhost:80/api/cart/products",{product_id:2})
    const fetchResult = await axios.get("http://localhost:80/api/cart/products")
    setProducts(fetchResult.data)
  }
  useEffect(()=>{
  getData()
  },[])
  return (
    <Container>
   
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper elevation={6}>
              <Typography variant="h2" component="h2" padding={2}>
                Shopping Cart
              </Typography>
              <Divider />
             {
              products.map((item,index)=>{
                return <Product key={index} name={item.name} price={item.price}/>
              })
             }
              {/* <Product name={'Product 1'} price={34.67}description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores esse aliquam quo dolor ex delectus, voluptate ut mollitia eius ab tempora repudiandae hic, dignissimos possimus officiis ad deleniti impedit nobis."}/> */}
              {/* <Product name={'Product 2'} price={17.89} description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores esse aliquam quo dolor ex delectus, voluptate ut mollitia eius ab tempora repudiandae hic, dignissimos possimus officiis ad deleniti impedit nobis."} /> */}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            
            <Paper>
            <Box padding={2}>
              <Typography variant="h6">Subtotal and checkout </Typography>
              <Typography variant="body1">x amount of money </Typography>
              <Button variant="contained">Proceed to checkout</Button>
            </Box>
            </Paper>
          
          </Grid>
        </Grid>
     
    </Container>
  );
};
