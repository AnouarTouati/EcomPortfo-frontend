/**
 * Component based on SignIn tmeplate from MUI
 * With theme selection stripped away
 */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import CssBaseline from "@mui/material/CssBaseline";

import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

import { SitemarkIcon } from "../components/SignIn/CustomIcons";

import { getAxios } from "../Axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: 20,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));
const axiosInstance = await getAxios();
export default function PasswordReset() {
  const mode: PaletteMode = "light";

  const defaultTheme = createTheme({ palette: { mode } });

  const [error, setPasswordError] = React.useState(false);
  const [errorMessage, setPasswordErrorMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const navigate = useNavigate();

  const { token } = useParams();
  const [searchParams] = useSearchParams();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError(false);
    setPasswordErrorMessage("");
    const data = new FormData(event.currentTarget);

    await axiosInstance.get("http://localhost:80/sanctum/csrf-cookie");
    try {
      await axiosInstance.post("password-reset", {
        token: token,
        email: searchParams.get("email"),
        password: data.get("password"),
      });
      setSuccess(true);
    } catch (error: any) {
      if (error.response.status == 422) {
        if (error.response.data.errors.password ?? false) {
          setPasswordError(true);
          setPasswordErrorMessage(error.response.data.errors.password[0]);
        }
        if (error.response.data.errors.token ?? false) {
          setPasswordError(true);
          setPasswordErrorMessage(error.response.data.errors.token[0]);
        }
        if (error.response.data.errors.email ?? false) {
          setPasswordError(true);
          setPasswordErrorMessage(error.response.data.errors.email[0]);
        }
      } else {
        setPasswordError(true);
        setPasswordErrorMessage(
          "something went wrong and we could not reset your password"
        );
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        {success == false ? (
          <Card variant="outlined">
            <SitemarkIcon />
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Type in your new password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <TextField
                  error={error}
                  helperText={errorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={error ? "error" : "primary"}
                />
              </FormControl>

              <Button type="submit" fullWidth variant="contained">
                Reset password
              </Button>
            </Box>
          </Card>
        ) : (
          <Typography component={"h1"}>
            Your password was reset successfully. You may now sign in with your
            new password
          </Typography>
        )}
      </SignInContainer>
    </ThemeProvider>
  );
}
