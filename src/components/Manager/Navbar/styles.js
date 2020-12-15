const { makeStyles } = require("@material-ui/core");

const drawerWidth = 240;

export default makeStyles((theme) => ({
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
  toolbar: {
    ...theme.mixins.toolbar,
    display: "flex",
    justifyContent: "space-between",
    padding: "0 13px",
  },
  menuButton: {
    marginRight: 18,
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
