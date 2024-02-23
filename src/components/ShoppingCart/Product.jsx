import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React from "react";
import getAxios from "../../Axios";

export const Product = ({
  name,
  id,
  description,
  price,
  quantity,
  showAddToCartButton = false,
  quantityChangedCallback,
}) => {
  async function addToCart(id) {
    const axios = await getAxios();
    const result = await axios.post("http://localhost:80/api/cart/products", {
      product_id: id,
    });
  }
  async function increase(productId) {
    const axios = await getAxios();
    const result = await axios.post(
      `http://localhost:80/api/cart/products/${productId}/quantity/increase`
    );
    quantityChangedCallback();
  }
  async function decrease(productId) {
    const axios = await getAxios();
    const result = await axios.post(
      `http://localhost:80/api/cart/products/${productId}/quantity/decrease`
    );
    quantityChangedCallback();
  }
  async function remove(productId) {
    const axios = await getAxios();
    const result = await axios.delete(
      `http://localhost:80/api/cart/products/${productId}`
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
