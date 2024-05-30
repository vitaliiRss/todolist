import { SyntheticEvent } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../store/store"
import { appActions, selectError } from "../../state/app-slice"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

export default function CustomizedSnackbars() {
  const dispatch = useAppDispatch()
  const error = useSelector(selectError)

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return

    dispatch(appActions.setAppError({ error: null }))
  }

  return (
    <div>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={"error"} variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}
