import { Button, Link, List, ListItem, TextField, Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import NextLink from "next/link"
import { Controller, useForm } from "react-hook-form";
import { useStyles } from "../utils/styles";
import dynamic from "next/dynamic";
import axios from "axios";
import { Store } from "../utils/store";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const LoginScreen = () => {
    const classes = useStyles()
    const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {state, dispatch}: any = useContext(Store)
  const {userInfo} = state

  const {enqueueSnackbar, closeSnackbar} = useSnackbar()

  useEffect(() => {
    if(userInfo) {
      router.push("/")
    }
  }, [router, userInfo])

  const loginSubmitHandler = async({email, password}: any) => {
    closeSnackbar()
    try {
      const { data } = await axios.post(
        "https://expensia-backend.herokuapp.com/api/auth/signin",
        {
          email,
          password,
        }
      );
      dispatch({type: "USER_LOGIN", payload: data})
      Cookies.set("userInfo", JSON.stringify(data))
    } catch (err: any) {
      enqueueSnackbar(
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message,
        { variant: "error" }
      );
    }
  };
  return (
    <Layout title="Login">
      <form onSubmit={handleSubmit(loginSubmitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: "email" }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Email is not valid"
                        : "Email is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === "minLength"
                        ? "Password length is more than 5"
                        : "Password is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <NextLink href="/forgot-password" passHref>
              <Link>Forgot Password?</Link>
            </NextLink>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Have not an account yet? &nbsp;
            <NextLink href="/register" passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(LoginScreen), { ssr: false });;
