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
import { default as Header } from "../PrimarySearchAppBar";
import { useNavigate } from "react-router-dom";
export const ShoopingCart = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  async function getData() {
    const axios = await getAxios();
    const fetchResult = await axios.get(
      "http://localhost:80/api/cart/products"
    );
    setProducts(fetchResult.data);
  }
  useEffect(() => {
    getData();
  }, []);
  function sum() {
    let sum = 0;
    products.forEach((product) => {
      sum += Number(product.price) * product.pivot.quantity;
    });
    return sum;
  }
  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper elevation={6}>
              <Typography variant="h2" component="h2" padding={2}>
                Shopping Cart
              </Typography>
              <Divider />

              { products.length ?
              products.map((item, index) => {
                return (
                  <Product key={index} name={item.name} price={item.price} />
                );
              }):
              <Typography padding={2} align="center" variant="h6">No items</Typography>
              }
        
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Box padding={2}>
                <Typography variant="h6">Subtotal and checkout </Typography>
                <Typography variant="body1">SubTotal : {sum()} $ </Typography>
                <Button variant="contained" onClick={()=>{navigate('/checkout')}} disabled={!products.length}>Proceed to checkout</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
