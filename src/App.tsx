import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { useAppDispatch } from "./store/store"
import { selectIsInitialized, selectStatus } from "./state/app-slice"
import { meTC } from "./state/auth-slice"
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar"
import LinearProgress from "@mui/material/LinearProgress"
import Container from "@mui/material/Container"
import CircularProgress from "@mui/material/CircularProgress"
import CustomizedSnackbars from "./components/ErrorSnackbar/ErrorSnackbar"

export const App = () => {
  const dispatch = useAppDispatch()
  const status = useSelector(selectStatus)
  const isInitialized = useSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(meTC())
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
