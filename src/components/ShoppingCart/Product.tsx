import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import AxiosContext from "../../AxiosProvider";
type ProductProps = {
  name : string,
  id : number,
  description?: string,
  price:number,
  quantity? : number,
  showAddToCartButton? : boolean,
  quantityChangedCallback : ()=> void
}
export const Product = ({
  name,
  id,
  description,
  price,
  quantity,
  showAddToCartButton = false,
  quantityChangedCallback,
}:ProductProps) => {
  const axios = useContext(AxiosContext)
  async function addToCart(id:number) {
    ;
    const result = await axios.post("/cart/products", {
      product_id: id,
    });
    quantityChangedCallback();
  }
  async function increase(productId:number) {
  
    const result = await axios.post(
      `/cart/products/${productId}/quantity/increase`
    );
    quantityChangedCallback();
  }
  async function decrease(productId:number) {
 
    const result = await axios.post(
      `/cart/products/${productId}/quantity/decrease`
    );
    quantityChangedCallback();
  }
  async function remove(productId:number) {

    const result = await axios.delete(
      `cart/products/${productId}`
    );
    quantityChangedCallback();
  }
  return (
    <Card elevation={6}>
      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={quantity ? 6 : 12}>
            <Typography component="h4" variant="h4">
              {name}
            </Typography>
            <Typography variant="body1" component="h6">
              {description}
            </Typography>
            <Typography variant="h6" component="h6">
              Price : {price} $
            </Typography>

            {showAddToCartButton ? (
              <Button
                variant="contained"
                onClick={() => {
                  addToCart(id);
                }}
              >
                Add to cart
              </Button>
            ) : (
              ""
            )}
          </Grid>
          {quantity ? (
            <>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  onClick={() => {
                    increase(id);
                  }}
                >
                  Increase
                </Button>
                <Typography variant="h5" component="h5">
                  Quantity : {quantity}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    decrease(id);
                  }}
                >
                  Decrease
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" onClick={()=>{
                  remove(id);
                }}>Remove</Button>
              </Grid>
            </>
          ) : (
            ""
          )}
        </Grid>
      </Box>
    </Card>
  );
};
