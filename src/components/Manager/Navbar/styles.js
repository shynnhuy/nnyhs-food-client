const { makeStyles } = require("@material-ui/core");

const drawerWidth = 240;

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    background: theme.palette.type === "light" ? "#fff" : "#000",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    boxShadow: theme.shadows[5],
  },
  appBar: {
    // background: theme.palette.type === "light" ? "#fff" : "#000",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  NavLink: {
    fontSize: "17px",
  },
  Logo: {},
  SearchContainer: {
    position: "relative",
    margin: "auto",
    width: "50%",
  },
  SearchBar: {
    border: "none",
    outline: "none",
    width: "100%",
    borderRadius: "20px",
    padding: "0 20px",
    color: "#212592",
    background: "#f1f1f1",
  },
  Outer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0px 10px",
    fontSize: "21px",
  },
}));
