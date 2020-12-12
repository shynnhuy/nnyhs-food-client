import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(10, 0),
    marginTop: theme.spacing(10),
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  icon: {
    minWidth: "unset",
  },
}));
