import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  sidebar: {
    width: 250,
  },
  marginNavbar: {
    height: 112,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  toggle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
}));
