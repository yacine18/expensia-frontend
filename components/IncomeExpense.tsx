import { Card, Grid, List, ListItem, Typography } from "@material-ui/core";
import React from "react";
import { data } from "../utils/data";
import { useStyles } from "../utils/styles";

const IncomeExpense = () => {
    const classes = useStyles()
    const amounts = data.transactions.map(transaction => transaction.amount)
    const totalExpenses = amounts.filter(amount => amount < 0).reduce((a,c) => a+c, 0).toFixed(2)
    const totalIncomes = amounts.filter(amount => amount > 0).reduce((a,c) => a+c, 0).toFixed(2)
    
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
