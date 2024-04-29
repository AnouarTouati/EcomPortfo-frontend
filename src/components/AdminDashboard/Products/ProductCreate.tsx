import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import AxiosContext from "../../../AxiosProvider";
import { green } from "@mui/material/colors";

function FormPropsTextFields({
  setStripeId,
  setName,
  setDescription,
  setPrice,
}: {
  setStripeId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDescription: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack>
        <Stack alignItems={"center"} direction={"row"} spacing={6}>
          <TextField
            required
            id="stripeProductId"
            label="Required"
            defaultValue=""
            placeholder="Stripe Product Id"
            focused={true}
            helperText="This form does not verify the existence of this Id on Stripe"
            onChange={(e) => setStripeId(e.target.value)}
          />
        </Stack>

        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue=""
          placeholder="Product Name"
          focused={true}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue=""
          placeholder="Description"
          focused={true}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="outlined-number"
          label="Required"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Price"
          focused={true}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Stack>
    </Box>
  );
}
export const ProductCreate = () => {
  const [stripeId, setStripeId] = useState<string>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [status, setStatus] = useState<"ok" | "loading" | "error">("ok");
  const axios = useContext(AxiosContext);
  const submit = async () => {
    setStatus("loading");
    axios
      .post("admin/products", {
        stripeId: stripeId,
        name: name,
        description: description,
        price: price,
      })
      .then((value) => {
        console.log(value);
        setStatus("ok");
      })
      .catch((error: any) => {
        console.log(error);
        setStatus("error");
      });
  };
  return (
    <div>
      <Stack spacing={2} direction={"column"} alignItems={"center"}>
        {status == "ok" || status == "loading" ? (
          <>
            <Typography variant="h4" align="center">
              Create a new product
            </Typography>
            <FormPropsTextFields
              setStripeId={setStripeId}
              setName={setName}
              setDescription={setDescription}
              setPrice={setPrice}
            />

            <Button disabled={status == "loading"} variant="contained" onClick={submit}>
              Submit
              {status == "loading" && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Button>
          </>
        ) : (
          <div>Something went wrong</div>
        )}
      </Stack>
    </div>
  );
};
