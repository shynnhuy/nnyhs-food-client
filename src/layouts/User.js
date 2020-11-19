/* eslint-disable react/prop-types */
import React from "react";
import { Box, CssBaseline } from "@material-ui/core";
import { Redirect, Route } from "react-router-dom";
import { Navbar } from "components/User";
import { connect } from "react-redux";
import { selectIsAuthenticated } from "redux/auth/auth.selectors";

function UserLayout({ children }) {
  return (
    <Box>
      <CssBaseline />
      <Navbar />
      {children}
    </Box>
  );
}

const UserRoute = ({ isAuth, component: Component, ...rest }) => {
  if (rest.auth && !isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <Route
      {...rest}
      render={(props) => (
        <UserLayout>
          <Component {...props} />
        </UserLayout>
      )}
    />
  );
};

const mapState = (state) => ({
  isAuth: selectIsAuthenticated(state),
});

export default connect(mapState)(UserRoute);
