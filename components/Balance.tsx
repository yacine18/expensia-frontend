import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Balance = () => {
  const [data, setData] = useState([]);
  const transactions = data && data.length > 0 ? data?.map((transaction: any) => Number(transaction.amount)) : null;
  const total = transactions && transactions.length > 0 ? transactions?.reduce((a: any, c: any) => (a + c), 0) : 0.00;

  useEffect(() => {
    try {
      const fetchTransactions = async () => {
        const { data } = await axios.get(
          "https://expensia-backend.herokuapp.com/api/transactions"
        );
        setData(data);
      };
      fetchTransactions();
    } catch (error:any) {
      alert(error.message)
    }
  }, []);

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
