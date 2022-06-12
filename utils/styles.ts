import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#203040",
    "& a": {
      color: "#ffffff",
      marginLeft: 10,
    },
  },
  grow: {
    flexGrow: 1,
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  main: {
    minHeight: "80vh",
  },
  footer: {
    marginTop: 10,
    textAlign: "center",
  },
  expense: {
    color: "#d31f03",
  },
  income: {
    color: "#0fcb03",
  },
  form: {
      maxWidth: 800,
      margin: "0 auto",
  },
  addButton:{
    marginBottom: 15,
  }
});
