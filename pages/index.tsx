import {
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Balance from "../components/Balance";
import IncomeExpense from "../components/IncomeExpense";
import Layout from "../components/Layout";
import Transaction from "../components/Transaction";
import { data } from "../utils/data";
import { useStyles } from "../utils/styles";

const Home: NextPage = () => {
  const classes = useStyles();
  const router = useRouter()
  return (
    <Layout title="Dashboard">
      <div>
        <h1>Dashboard</h1>
        <Grid container spacing={3} xs={12}>
          <Grid item md={4}>
            <Card>
              <List>
                <ListItem>
                  <Balance />
                </ListItem>
              </List>
            </Card>
          </Grid>

          <IncomeExpense />

          <Grid item md={12}>
            <Button onClick={() => router.push("/add-transaction")} className={classes.addButton} variant="contained" color="primary">
              Add Transaction
            </Button>
            <Card>
              <CardContent>
                <Typography>
                  <strong>Transactions</strong>
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Label</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.transactions.map((transaction) => (
                        <>
                          <Transaction transaction={transaction} />
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Home;
