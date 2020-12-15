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
  grow: {
    flex: 1,
  },
  searchBar: {
    width: "100%",
    marginLeft: 0,
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    cursor: `url("${searchIc}"), pointer`,
    transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    borderRadius: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      width: "50%",
      marginLeft: theme.spacing(3),
      "&:focus-within": {
        width: "80%",
      },
    },
  },
  input: {
    paddingLeft: theme.spacing(1),
    flex: 1,
    "& input": {
      cursor: `url("${searchIc}"), pointer`,
    },
  },
  inputRoot: {
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
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  popover: {
    width: 300,
    pointerEvents: "none",
  },
  preview: {
    // maxWidth: 400,
  },
  previewItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  previewItemBottom: {
    display: "flex",
    flexDirection: "column",
  },
}));
