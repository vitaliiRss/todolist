import React from "react"
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import CustomizedSnackbars from "./components/ErrorSnackbar/ErrorSnackbar";
import { useAppDispatch, useAppSelector } from "./store/store";
import { Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { meTC } from "./state/auth-reducer";

export const App = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.app.status)
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)

  useEffect(() => {
    dispatch(meTC())
  }, [dispatch])

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