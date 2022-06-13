import {
  Button,
  Card,
  CardContent,
  CircularProgress,
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
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Balance from "../components/Balance";
import IncomeExpense from "../components/IncomeExpense";
import Layout from "../components/Layout";
import Transaction from "../components/Transaction";
import { useStyles } from "../utils/styles";

const Home: NextPage = (props) => {
  const { data }: any = props;
  const classes = useStyles();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    setTransactions(data);
    setLoading(false);
  }, [data]);
  return (
    <Layout title="Dashboard">
      <div>
        <h1>Dashboard</h1>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Balance />
                </ListItem>
              </List>
            </Card>
          </Grid>
          <IncomeExpense />
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid item md={12}>
              <Button
                onClick={() => router.push("/add-transaction")}
                className={classes.addButton}
                variant="contained"
                color="primary"
              >
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
                        {transactions.map((transaction: any) => (
                          <>
                            <Transaction
                              key={transaction._id}
                              transaction={transaction}
                            />
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </div>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps() {
  const { data } = await axios.get("https://expensia-backend.herokuapp.com/api/transactions");
  return {
    props: {
      data,
    },
  };
}
