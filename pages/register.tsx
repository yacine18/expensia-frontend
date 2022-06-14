import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import NextLink from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useStyles } from "../utils/styles";
import dynamic from "next/dynamic";
import { Store } from "../utils/store";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import axios from "axios";
import Cookies from "js-cookie";

const RegisterScreen = () => {
  const classes = useStyles();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { state, dispatch }: any = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [router, userInfo]);

  const registerSubmitHandler = async ({ name, email, password }: any) => {
    closeSnackbar()
    try {
      const { data } = await axios.post(
        "https://expensia-backend.herokuapp.com/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );
      dispatch({type: "USER_LOGIN", payload: data})
      Cookies.set("userInfo", JSON.stringify(data))
      enqueueSnackbar(data.message, {variant: "success"})
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
    <Layout title="Register">
      <form
        onSubmit={handleSubmit(registerSubmitHandler)}
        className={classes.form}
      >
        <Typography component="h1" variant="h1">
          Create account
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === "minLength"
                        ? "Name is not valid"
                        : "Name is required"
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
        </List>
        <List>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already Have an account? &nbsp;
            <NextLink href="/login" passHref>
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(RegisterScreen), { ssr: false });
