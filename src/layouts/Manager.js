import React, { useState } from "react";
import { Box, CssBaseline, makeStyles } from "@material-ui/core";
import { Redirect, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "components/Manager";
import { connect } from "react-redux";

import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { createStructuredSelector } from "reselect";
import {
  selectIsAuthenticated,
  selectIsAdmin,
} from "redux/auth/auth.selectors";

const ManagerRoute = ({ isAuth, isAdmin, component: Component, ...rest }) => {
  if (!isAuth && !isAdmin) {
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
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.toolbar} />
            <PerfectScrollbar>
              <div className={classes.content}>{children}</div>
            </PerfectScrollbar>
          </div>
          <Footer />
        </div>
        {/* <StyledWrapper>
          <PerfectScrollbar>
            <main className={classes.main}>
              <div className={classes.toolbar} />
              <StyledPaper elevation={5}>{children}</StyledPaper>
            </main>
          </PerfectScrollbar>
          <Footer />
        </StyledWrapper> */}
      </Box>
    </React.Fragment>
  );
};
const mapState = createStructuredSelector({
  isAuth: selectIsAuthenticated,
  isAdmin: selectIsAdmin,
});

export default connect(mapState)(ManagerRoute);

const useStyles = makeStyles((theme) => ({
  layout: {
    maxHeight: "100vh",
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    flexDirection: "column",
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    flexDirection: "column",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflowY: "scroll",
    padding: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    ...theme.mixins.toolbar,
  },
}));
