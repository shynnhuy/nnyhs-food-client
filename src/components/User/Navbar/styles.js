import { fade, makeStyles } from "@material-ui/core/styles";
import searchIc from "assets/img/search.svg";

export default makeStyles((theme) => ({
  Navbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    justifyContent: "flex-start",
  },
  Left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Center: {
    width: "100%",
  },
  Right: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  title: {
    display: "block",
    fontWeight: "bold",
    flexGrow: 1,
    textAlign: "center",
  },
  inputRoot: {
    width: "50%",
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.15),
    },
    marginLeft: theme.spacing(3),
    "&:focus-within": {
      width: "80%",
    },
    cursor: `url("${searchIc}"), pointer`,
    transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    borderRadius: theme.spacing(2),
    // [theme.breakpoints.up("md")]: {
    //   marginLeft: theme.spacing(3),
    //   "&:focus-within": {
    //     width: "80%",
    //   },
    // },
  },
  inputInput: {
    width: "100%",
    "& input": {
      cursor: `url("${searchIc}"), pointer`,
    },
  },
}));
