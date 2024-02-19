import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import getAxios from "../../Axios";

export const Product = ({ name, id, description, price,showAddToCartButton=false }) => {
 async function addToCart(id) {
    const axios = await getAxios()
    const result = await axios.post("http://localhost:80/api/cart/products",{product_id:id})
  }
  return (
    <Card elevation={6}>
      <Box padding={2}>
        <Typography component="h4" variant="h4">
          {name}
        </Typography>
        <Typography variant="body1" component="h6">
          {description}
        </Typography>
        <Typography variant="h6" component="h6">
          Price : {price} $
        </Typography>
        {
          showAddToCartButton ?   <Button
          variant="contained"
          onClick={() => {
            addToCart(id);
          }}
        >
          Add to cart
        </Button>:''
        }
      
      </Box>
    </Card>
  );
};
