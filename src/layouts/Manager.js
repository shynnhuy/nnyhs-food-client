import React, { useState } from "react";
import { Box, CssBaseline, makeStyles } from "@material-ui/core";
import { Redirect, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "components/Manager";
import { connect } from "react-redux";

const ManagerRoute = ({ auth, component: Component, ...rest }) => {
  if (!auth.isAuthenticated && !auth.isAdmin) {
    return <Redirect to="/" />;
  }
  return (
    <Route
      {...rest}
      render={(props) => (
        <ManagerLayout {...props}>
          <Component {...props} />
        </ManagerLayout>
      )}
    />
  );
};

const ManagerLayout = ({ children }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box display="flex" className={classes.layout}>
        <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
        <main className={classes.wrapper}>
          <div className={classes.toolbar} />
          {children}
          <Footer />
        </main>
      </Box>
    </React.Fragment>
  );
};
const mapState = (state) => ({
  auth: state.auth,
});

export default connect(mapState)(ManagerRoute);

const useStyles = makeStyles((theme) => ({
  layout: {
    maxHeight: "100vh",
    height: "100vh",
    overflow: "hidden",
  },
  wrapper: {
    padding: theme.spacing(0, 3, 3, 3),
    // paddingBottom: "0px !important",
    flexGrow: 1,
    maxHeight: "100%",
    overflow: "scroll",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));
