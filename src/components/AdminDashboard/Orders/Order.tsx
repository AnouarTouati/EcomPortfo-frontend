import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import AxiosContext from "../../../AxiosProvider";

export const Order = () => {
  const status = ['Unpaid','Paid']
  // type Product = {
  //   id: number;
  //   name: string;
  //   price: string;
  // };
  // type OrderType = {
  //   id: number;
  //   products: Product[];
  //   email: string;
  //   status: Status;
  //   stripe_session_id: string;
  //   total: number;
  // };
  type FetchState = 'loading' | 'show' | 'failed' 
  const axios = useContext(AxiosContext);
  const { id } = useParams();
  const [fetchState,setFetchState] = useState<FetchState>('loading');
  const [products, setProducts] = useState([1, 2, 3]);
  const [data, setData] = useState<any>(null);

  async function getData() {
    try{
      const result = await axios.get(`/admin/orders/${id}`);
      console.log(result);
      if(result.status >= 300)
        return setFetchState('failed')
      setFetchState('show')
      setData(result.data);
    } catch(error){
       setFetchState('failed')
    }
   
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      {
        fetchState == 'failed' ? <Typography variant="h3">Order not found</Typography> : <div>
        <Grid container>
          <Grid xs={6} item>
            <Stack direction={"column"} spacing={2}>
              <Typography variant="h3">Order</Typography>
              <Typography variant="h6">Order ID: {data?.id}</Typography>
              <Typography variant="h6">Client email: {data?.email} </Typography>
              <Typography variant="h6">Total: {data?.total} </Typography>
              <Typography variant="h6">Status: {status[data?.status]}</Typography>
            </Stack>
          </Grid>
          <Grid xs={6} item>
            <Typography variant="h3">Products</Typography>
            <Stack direction={"column"} spacing={2}>
              {data?.products.map((product:any) => {
                return (
                  <Card variant="outlined" key={product.id}>
                    <Typography variant="h6">{product.name}  price : ${product.pivot.price_at_selling_time} X {product.pivot.quantity} = ${product.pivot.price_at_selling_time * product.pivot.quantity}</Typography>
                  </Card>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
        </div>
        
      }
     
     
    </Container>
  );
};
