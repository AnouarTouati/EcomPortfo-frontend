import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import { getAxios } from "../../Axios";
import { useNavigate } from "react-router-dom";
import { FormHelperText } from "@mui/material";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}
const axiosInstance = await getAxios();
export default function ForgotPassword({
  open,
  handleClose,
}: ForgotPasswordProps) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);

    try {
      await axiosInstance.post("/forgot-password", {
        email: data.get("email"),
      });
      navigate("/password-reset-link-sent");
    } catch (error) {
      if (error.status === 422) {
        setErrorMessage(
          "We can't find an account with a corresponding email adddress"
        );
      } else {
        setErrorMessage(
          "Something went wrong and we could not proceed with your request."
        );
      }
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        setErrorMessage("");
        handleClose();
      }}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleSubmit(event);
        },
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a
          link to reset your password.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
        />
        {errorMessage == "" ? (
          ""
        ) : (
          <FormHelperText sx={{ color: "red" }}>{errorMessage}</FormHelperText>
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button
          onClick={() => {
            setErrorMessage("");
            handleClose();
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
