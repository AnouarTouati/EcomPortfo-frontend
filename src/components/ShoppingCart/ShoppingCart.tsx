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
import React, { useContext, useEffect, useState } from "react";
import { Product } from "./Product";
import { useNavigate, useOutletContext } from "react-router-dom";
import AxiosContext from "../../AxiosProvider";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getItemsCountAsync } from "../../store/cart/cartSlice";
type Product = {
  id:number,
  name:string,
  price:number,
  pivot : {
    quantity : number
  }
}
export const ShoppingCart = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([]);
  const axios = useContext(AxiosContext)

  const dispatch = useDispatch<AppDispatch>()
  async function getData() {
    
    const fetchResult = await axios.get(
      "/cart/products"
    );
    setProducts(fetchResult.data);
    dispatch(getItemsCountAsync())
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
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper elevation={6}>
              <Typography variant="h2" component="h2" padding={2}>
                Shopping Cart
              </Typography>
              <Divider />

              { products.length ?
              products.map((item:Product, index) => {
                return (
                  <Product id={item.id} key={index} name={item.name} price={item.price} quantity={item.pivot.quantity} quantityChangedCallback={getData}/>
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
