import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { handleErrors } from "../utils/errors";
import { useStyles } from "../utils/styles";
import axios from "axios";
import { Store } from "../utils/store";
import dynamic from "next/dynamic";

const AddTransactionScreen = () => {
  const router = useRouter();
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { dispatch }: any = useContext(Store);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submitHandler = async ({ label, amount }: any) => {
    closeSnackbar();
    try {
      const { data } = await axios.post(
        `https://expensia-backend.herokuapp.com/api/transactions`,
        {
          label,
          amount,
        }
      );
      enqueueSnackbar(data.message, { variant: "success" });
      router.push("/");
      console.log(process.env.BASE_URL);
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
    <Layout title="Add Transaction">
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Add Transaction
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="label"
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
                  id="label"
                  label="Label"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.label)}
                  helperText={
                    errors.label
                      ? errors.label.type === "minLength"
                        ? "Label is not valid"
                        : "Label is required"
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
              name="amount"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="amount"
                  label="Amount"
                  inputProps={{ type: "number" }}
                  error={Boolean(errors.amount)}
                  helperText={
                    errors.amount
                      ? errors.amount.type === "minLength"
                        ? "Amount is not valid"
                        : "Amount is required"
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
              Submit
            </Button>
          </ListItem>
          <ListItem>
            <Button
              type="button"
              variant="contained"
              fullWidth
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(AddTransactionScreen), {
  ssr: false,
});
