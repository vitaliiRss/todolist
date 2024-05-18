import React from "react"
import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { loginTC } from "../../state/auth-reducer"

type ErrorType = {
  email?: string
  password?: string
}

export type LoginType = {
  email: string,
  password: string,
  rememberMe: boolean,
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: ErrorType = {};
      const isNotValid = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)

      if (!values.email) {
        errors.email = "Required"
      } else if (isNotValid) {
        errors.email = "email is not valide"
      }

      if (!values.password) {
        errors.password = "Required"
      } else if (values.password.length < 5) {
        errors.password = "Must be more 4 symbols"
      }

      return errors;
    },
    onSubmit: values => {
      dispatch(loginTC(values))
      formik.resetForm();
    },
  });

  if (isLoggedIn) {
    return <Navigate to={"/todolists"} />
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <p>To log in get registered <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">here</a></p>
            <p>or use common test account credentials:</p>
            <p>Email: vitalii.hryshko.rss@gmail.com</p>
            <p>Password: pro100</p>
          </FormLabel>

          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                error={!!(formik.touched.email && formik.errors.email)}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}

              <TextField
                type="password"
                label="Password"
                margin="normal"
                error={!!(formik.touched.password && formik.errors.password)}
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && <div style={{ color: "red" }}>{formik.errors.password}</div>}

              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>Login</Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}