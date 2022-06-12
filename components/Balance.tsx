import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { data } from "../utils/data";

const Balance = () => {
  const transactions = data.transactions.map(transaction => transaction.amount)
  const total = transactions.reduce((a,c) => a+c, 0).toFixed(2)
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Typography component="h1">
            <strong>Balance</strong>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="h1" align="right">
            <strong>${total}</strong>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Balance;
