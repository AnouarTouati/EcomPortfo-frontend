import { useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Product } from "./ShoppingCart/Product";
import { useOutletContext } from "react-router-dom";
import { getCartItemsCountType } from "../layouts/Layout";
import AxiosContext from "../AxiosProvider";
type Product = {
  name: string;
  id: number;
  price: number;
  description: string;
};
function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const getCartItemsCount: getCartItemsCountType = useOutletContext();
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
        <Stack direction={"row"} alignItems={"center"} spacing={4}>
          <Box flexGrow={"1"}>
            <Typography mt={1} variant="body1">
              For Everyone
            </Typography>
            <Typography mt={2} variant="h4">
              Empowering Your Life,
            </Typography>
            <Typography mt={2} variant="h4">
              Enriching Your Business,
            </Typography>
            <Typography mt={2} variant="body1">
              Pay Online, Send & Receive Goods And Earn Credibility
              <br></br> Points With A Digital Wallet Used By Thousands To Accept
              And Make Payment Everywhere…
            </Typography>
            <Typography mt={2} mb={2} variant="body1">
              See More ...
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained">Sign Up</Button>
              </Grid>
              <Grid item>
                <Button variant="contained">Log In</Button>
              </Grid>
            </Grid>
          </Box>
          <img
            style={{ height: 450 }}
            srcSet={"/src/assets/simple2.gif"}
            src={"/src/assets/simple.gif"}
            alt={"test"}
            loading="lazy"
          />
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={4}>
          <img
            style={{ width: 500, height: 450 }}
            srcSet={"/src/assets/simple.gif"}
            src={"/src/assets/simple.gif"}
            alt={"test"}
            loading="lazy"
          />
          <Box flexGrow={"1"}>
            <Typography mt={1} variant="body1">
              For Businesses and Individuals
            </Typography>
            <Typography mt={2} variant="h3">
              Path way to your success in a competitive field
            </Typography>
            <Typography mt={2} variant="body1">
              From Startups To Big Companies, Businesses Of All Sizes<br></br>
              Can Uses Chargily Epay Gateway And Our Open Sources <br></br>
              Apis To Accept Payments Online, Send Payouts, And More.
            </Typography>
            <Typography mt={2} variant="body1">
              See More ...
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained">Sign Up</Button>
              </Grid>
              <Grid item>
                <Button variant="contained">Log In</Button>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Box component={"section"}>
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
        </Box>
      </Container>
    </>
  );
}

export default Home;
