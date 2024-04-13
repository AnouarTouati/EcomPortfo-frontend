import { useEffect, useState } from "react";

import getAxios from "../Axios";
import { Container, Grid, Typography } from "@mui/material";
import { Product } from "./ShoppingCart/Product";
import { useOutletContext } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const getCartItemsCount = useOutletContext()

  async function testAxios() {
    const axios = await getAxios();
    const data1 = await axios.get("http://localhost:80/api/products");
    console.log(data1);
    // const result = await axios.post("http://localhost:80/api/cart/products",{product_id:1})
    // console.log(result)
    // const data = await axios.get("http://localhost:80/api/cart/products")
    // console.log(data)
  }
  async function getProducts() {
    const axios = await getAxios();
    const result = await axios.get("http://localhost:80/api/products");
    setProducts(result.data);
  }
  useEffect(() => {
    // testAxios();
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
