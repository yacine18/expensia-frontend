import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { useStyles } from "../utils/styles";

const Transaction = ({ transaction }: any) => {
  const classes = useStyles();
  return (
    <>
      <TableRow key={transaction._id}>
        <TableCell>{transaction.label}</TableCell>
        <TableCell
          className={transaction.amount < 0 ? classes.expense : classes.income}
        >
          ${Number(transaction.amount)}
        </TableCell>
        <TableCell>{transaction.createdAt.substring(0, 10)}</TableCell>
      </TableRow>
    </>
  );
};

export default Transaction;
