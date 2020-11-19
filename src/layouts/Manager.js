import React, { useState } from "react";
import { Box, CssBaseline, makeStyles, Paper } from "@material-ui/core";
import { Redirect, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "components/Manager";
import { connect } from "react-redux";
import styled from "styled-components";

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
        <StyledWrapper>
          <PerfectScrollbar>
            <main className={classes.main}>
              <div className={classes.toolbar} />
              <StyledPaper elevation={5}>{children}</StyledPaper>
            </main>
          </PerfectScrollbar>
          <Footer />
        </StyledWrapper>
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
    height: "100vh",
    overflow: "hidden",
  },
  main: {
    padding: theme.spacing(0, 3, 3, 3),
    // paddingBottom: "0px !important",
    // flexGrow: 1,
    maxHeight: "100%",
    overflowY: "scroll",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    marginBottom: theme.spacing(2),
    ...theme.mixins.toolbar,
  },
}));

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const StyledPaper = styled(Paper)`
  padding: 12px;
`;
