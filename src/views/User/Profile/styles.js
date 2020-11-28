const { makeStyles } = require("@material-ui/core");

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(4),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  child: {
    display: "flex",
    width: "100%",
    // padding: "4.5% 0",
    padding: "0 15%",
    marginBottom: theme.spacing(2),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "4px 7px 7px 0 rgba(0,0,0,.05)",
  },
  tab: {
    minWidth: "90%",
  },
  radio: {
    flexDirection: "row",
    justifyContent: "center",
    margin: theme.spacing(1),
  },
  accept: {
    color: "green",
  },
  refuse: {
    color: "red",
  },
}));
