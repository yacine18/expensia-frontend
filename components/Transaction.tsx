import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { useStyles } from "../utils/styles";

const Transaction = ({ transaction }: any) => {
  const classes = useStyles();
  return (
    <>
      <TableRow key={transaction.id}>
        <TableCell>{transaction.label}</TableCell>
        <TableCell
          className={transaction.amount < 0 ? classes.expense : classes.income}
        >
          ${transaction.amount}
        </TableCell>
        <TableCell>{transaction.date}</TableCell>
      </TableRow>
    </>
  );
};

export default Transaction;
