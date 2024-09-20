import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAxios } from "../../../Axios";

const axiosInstance = await getAxios();
export const Order = () => {
  const status = ["Unpaid", "Paid", "Uknown"];
  type ProductType = {
    id: number;
    name: string;
    pivot: { price_at_selling_time: number; quantity: number };
    price: string;
  };
  type OrderType = {
    id: number;
    email: string;
    status: number;
    products: ProductType[];
    total: number;
    stripe_session_id: string;
  };
  type FetchState = "loading" | "show" | "failed";

  const { id } = useParams();
  const [fetchState, setFetchState] = useState<FetchState>("loading");
  const [order, setOrder] = useState<OrderType | null>(null);

  async function getData() {
    try {
      const result = await axiosInstance.get(`/admin/orders/${id}`);
      if (result.status >= 300) return setFetchState("failed");
      setFetchState("show");
      setOrder(result.data);
    } catch (error) {
      setFetchState("failed");
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      {fetchState == "failed" ? (
        <Typography variant="h3">Order not found</Typography>
      ) : (
        <div>
          <Grid container>
            <Grid xs={6} item>
              <Stack direction={"column"} spacing={2}>
                <Typography variant="h3">Order</Typography>
                <Typography variant="h6">Order ID: {order?.id}</Typography>
                <Typography variant="h6">
                  Client email: {order?.email}{" "}
                </Typography>
                <Typography variant="h6">Total: {order?.total} </Typography>
                <Typography variant="h6">
                  Status:{" "}
                  {status[order?.status != undefined ? order?.status : 2]}{" "}
                  {/* index 2 is uknown */}
                </Typography>
              </Stack>
            </Grid>
            <Grid xs={6} item>
              <Typography variant="h3">Products</Typography>
              <Stack direction={"column"} spacing={2}>
                {order?.products.map((product: ProductType) => {
                  return (
                    <Card variant="outlined" key={product.id}>
                      <Typography variant="h6">
                        {product.name} price : $
                        {product.pivot.price_at_selling_time} X{" "}
                        {product.pivot.quantity} = $
                        {product.pivot.price_at_selling_time *
                          product.pivot.quantity}
                      </Typography>
                    </Card>
                  );
                })}
              </Stack>
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
};
