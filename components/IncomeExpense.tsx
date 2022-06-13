import { Card, Grid, List, ListItem, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStyles } from "../utils/styles";

const IncomeExpense = () => {
    const classes = useStyles()
    const [data, setData] = useState([]);
    const amounts = data.map((transaction:any) => Number(transaction.amount))
    const totalExpenses = amounts.filter(amount => amount < 0).reduce((a,c) => a+c, 0)
    const totalIncomes = amounts.filter(amount => amount > 0).reduce((a,c) => a+c, 0)

    useEffect(() => {
      try {
        const fetchTransactions = async () => {
          const { data } = await axios.get(
            "http://localhost:8800/api/transactions"
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
      <Grid item md={4}>
        <Card>
          <List>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>Incomes</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" className={classes.income}>
                    ${totalIncomes}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card>
          <List>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>Expenses</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" className={classes.expense}>
                    ${totalExpenses}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Card>
      </Grid>
    </>
  );
};

export default IncomeExpense;
