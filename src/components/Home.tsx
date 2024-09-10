import { useContext, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Product } from "./ShoppingCart/Product";
import { Link, useOutletContext } from "react-router-dom";
import { getCartItemsCountType } from "../layouts/Layout";
import AxiosContext from "../AxiosProvider";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
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

  function Item({
    name,
    description,
    path,
  }: {
    name: string;
    description: string;
    path: string;
  }) {
    return (
      <>
        <Stack direction={"row"} justifyContent={"center"}>
          <img
            style={{ height: 250 }}
            srcSet={path}
            src={path}
            alt={"test"}
            loading="lazy"
          />
          <img
            style={{ height: 250 }}
            srcSet={path}
            src={path}
            alt={"test"}
            loading="lazy"
          />
          <img
            style={{ height: 250 }}
            srcSet={path}
            src={path}
            alt={"test"}
            loading="lazy"
          />
        </Stack>
      </>
    );
  }
  function MediaCard({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/src/assets/simple.gif"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }

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
              {/* <Grid item>
                <Button variant="contained">Sign Up</Button>
              </Grid> */}
              <Grid item>
                <Button variant="contained">
                <Link style={{color:'white'}} to={'/sign-in'}>Log In</Link>
                </Button>
                
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

        <Carousel>
          {/* {items.map((item, i) => (
            <Item sx={{ padding: 10 }} key={i} path={item.path} />
          ))} */}
          <Stack
            direction={"row"}
            justifyContent={"center"}
            justifyItems={"center"}
            alignItems={"center"}
            spacing={4}
          >
            <MediaCard
              title="Quota 1"
              description="Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica"
            />
            <MediaCard
              title="Quota 2"
              description="Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica"
            />
            <MediaCard
              title="Quota 3"
              description="Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica"
            />
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            justifyItems={"center"}
            alignItems={"center"}
            spacing={4}
          >
            <MediaCard
              title="Quota 4"
              description="Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica"
            />
            <MediaCard
              title="Quota 5"
              description="Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica"
            />
            <MediaCard
              title="Quota 6"
              description="Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica"
            />
          </Stack>
        </Carousel>

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
        <Box padding={6}>
          <Typography variant="h3" align="center">
            SOCIAL NETWORKS
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4} alignItems={"center"}>
              <Facebook/>
            </Grid>
            <Grid item xs={4}>
              <Twitter></Twitter>
            </Grid>
            <Grid item xs={4}>
              <Instagram></Instagram>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Home;
