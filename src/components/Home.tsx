import { useContext, useEffect, useState } from "react";

import { Container, Grid, Typography } from "@mui/material";
import { Product } from "./ShoppingCart/Product";
import { useOutletContext } from "react-router-dom";
import { getCartItemsCountType } from '../layouts/Layout'
import AxiosContext from "../AxiosProvider";
type Product = {
  name : string,
  id : number,
  price:number
  description:string
}
function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const getCartItemsCount : getCartItemsCountType  = useOutletContext()
  const axios = useContext(AxiosContext);
  async function getProducts() {
    
    const result = await axios.get("/products");
    setProducts(result.data);
  }
  useEffect(() => {
    getProducts();
   
  }, []);
  return (
    <>
      <Container>
        <div>
          <Typography paddingBottom={2} align={"center"} variant="h3">
            Our Products
          </Typography>

          <Grid container spacing={2}>
            {products.map((product) => {
              return (
                <Grid key={product.id} item xs={3}>
                  <Product
                    name={product.name}
                    id={product.id}
                    price={product.price}
                    description={product.description}
                    showAddToCartButton={true}
                    quantityChangedCallback={getCartItemsCount}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Container>
    </>
  );
}

export default Home;
