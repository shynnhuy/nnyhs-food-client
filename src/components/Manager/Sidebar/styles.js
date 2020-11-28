const { makeStyles } = require("@material-ui/core");

const drawerWidth = 240;

export default makeStyles((theme) => ({
  SideBar: {
    width: "63px",
    height: "100vh",
    position: "fixed",
    marginTop: "72px",
    background: theme.palette.type === "light" ? "#fff" : "#000",
    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 4px 1px",
    overflow: "hidden",
    zIndex: 99,
    transition: "width .5s",
    "&:hover": {
      width: "210px",
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  Item: {
    borderLeft: `5px solid transparent`,
  },
  active: {
    borderLeft: `5px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
  },
  Icon: {
    marginLeft: "2px",
  },
  selectedIcon: {
    marginLeft: "2px",
    color: theme.palette.primary.main,
    display: "inline-flex",
    minWidth: "56px",
    flexShrink: 0,
  },
  navitem: {
    overflow: "hidden",
  },
  boxListOpen: {
    padding: theme.spacing(2),
  },
  boxListClose: {
    padding: theme.spacing(1),
  },
}));
