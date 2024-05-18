import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SyntheticEvent } from "react";
import { setErrorAC } from "../../state/app-reducer";
import { useAppDispatch, useAppSelector } from "../../store/store";

export default function CustomizedSnackbars() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(state => state.app.error);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setErrorAC(null));
  };

  return (
    <div>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={"error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
