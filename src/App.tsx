import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { useAppDispatch } from "./store/store"
import { selectIsInitialized, selectStatus } from "./state/app-slice"
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar"
import LinearProgress from "@mui/material/LinearProgress"
import Container from "@mui/material/Container"
import CircularProgress from "@mui/material/CircularProgress"
import CustomizedSnackbars from "./components/ErrorSnackbar/ErrorSnackbar"
import { authThunks } from "./state/auth-slice"

export const App = () => {
  const dispatch = useAppDispatch()
  const status = useSelector(selectStatus)
  const isInitialized = useSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(authThunks.me())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <CustomizedSnackbars />
      <ButtonAppBar />
      {status === "loading" && <LinearProgress color="secondary" />}
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </div>
  )
}
