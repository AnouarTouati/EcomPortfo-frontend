import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { green } from "@mui/material/colors";
import { AxiosError } from "axios";
import { getAxios } from "../../../Axios";

function FormPropsTextFields({
  setStripeId,
  setName,
  setDescription,
  setPrice,
  errors,
}: {
  setStripeId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDescription: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPrice: React.Dispatch<React.SetStateAction<string | undefined>>;
  errors: any;
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
            error={errors.stripeId != null}
            helperText={errors.stripeId != null ? errors.stripeId[0] : ""}
            onChange={(e) => {
              setStripeId(e.target.value);
            }}
          />
        </Stack>

        <TextField
          required
          id="name"
          label="Required"
          defaultValue=""
          placeholder="Product Name"
          focused={true}
          error={errors.name != null}
          helperText={errors.name != null ? errors.name[0] : ""}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="description"
          label="Required"
          defaultValue=""
          placeholder="Description"
          focused={true}
          error={errors.description != null}
          helperText={errors.description != null ? errors.description[0] : ""}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="price"
          label="Required"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Price"
          focused={true}
          error={errors.price != null}
          helperText={errors.price != null ? errors.price[0] : ""}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Stack>
    </Box>
  );
}
const axiosInstance = await getAxios();
export const ProductCreate = () => {
  const [stripeId, setStripeId] = useState<string>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [status, setStatus] = useState<
    "default" | "success" | "loading" | "validationError" | "error"
  >("default");
  const [errors, setErrors] = useState({});

  const submit = async () => {
    setStatus("loading");
    axiosInstance
      .post("admin/products", {
        stripeId: stripeId,
        name: name,
        description: description,
        price: price,
      })
      .then((value) => {
        setStatus("success");
      })
      .catch((error: AxiosError) => {
        if (error.response?.status == 422) {
          setStatus("validationError");
          setErrors((error.response?.data as any).errors);
        } else {
          setStatus("error");
        }
      });
  };
  function reset() {
    setErrors({});
    setStripeId("");
    setName("");
    setDescription("");
    setPrice(undefined);
    setStatus("default");
  }
  function PanicView() {
    return (
      <Stack spacing={6}>
        <Typography variant="h4">Something went wrong</Typography>
        <Button variant="contained" onClick={reset}>
          Retry
        </Button>
      </Stack>
    );
  }
  function SuccessView() {
    return (
      <Stack spacing={6}>
        <Typography variant="h4">Success</Typography>
        <Button variant="contained" onClick={reset}>
          Create more
        </Button>
      </Stack>
    );
  }

  return (
    <Stack
      sx={{ pt: 6 }}
      spacing={2}
      direction={"column"}
      alignItems={"center"}
    >
      {status == "success" ? (
        <SuccessView />
      ) : status == "error" ? (
        <PanicView />
      ) : (
        <>
          <Typography variant="h4" align="center">
            Create a new product
          </Typography>
          <FormPropsTextFields
            setStripeId={setStripeId}
            setName={setName}
            setDescription={setDescription}
            setPrice={setPrice}
            errors={errors}
          />

          <Button
            disabled={status == "loading"}
            variant="contained"
            onClick={submit}
          >
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
      )}
    </Stack>
  );
};
