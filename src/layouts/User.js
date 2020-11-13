/* eslint-disable react/prop-types */
import React from "react";
import { Box, CssBaseline } from "@material-ui/core";
import { Redirect, Route } from "react-router-dom";
import { Navbar } from "components/User";
import { useSelector } from "react-redux";

function UserLayout({ children }) {
  return (
    <Box>
      <CssBaseline />
      <Navbar />
      {children}
    </Box>
  );
}

const UserRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  if (rest.auth && !auth.isAuthenticated) {
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

export default UserRoute;
