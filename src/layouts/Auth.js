import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { Grid, CssBaseline, Fab } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import useStyles from "views/Auth/styles";
import { connect } from "react-redux";

const AuthLayout = ({ children }) => {
  const classes = useStyles();
  let history = useHistory();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={false}
        md={4}
        lg={7}
        className={classes.image}
      />
      {children}
      <Fab
        size="small"
        onClick={() => history.push("/")}
        color="secondary"
        className={classes.Fab}
      >
        <Home />
      </Fab>
    </Grid>
  );
};

const AuthRoute = ({ auth, component: Component, ...rest }) => {
  // const auth = useSelector((state) => state.auth);
  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <AuthLayout>
          <Component {...matchProps} />
        </AuthLayout>
      )}
    />
  );
};

const mapState = (state) => ({
  auth: state.auth,
});

export default connect(mapState)(AuthRoute);
