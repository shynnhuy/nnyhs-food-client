/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Box, CssBaseline } from "@material-ui/core";
import { Redirect, Route } from "react-router-dom";
import { Navbar, Sidebar } from "components/User";
import { connect } from "react-redux";
import {
  selectIsAdmin,
  selectIsAuthenticated,
  selectUserDetails,
  selectIsShop,
} from "redux/auth/auth.selectors";

import { logout } from "redux/auth/auth.actions";
import { selectCartItemsCount } from "redux/cart/cart.selectors";
import Footer from "components/User/Footer";

function UserLayout({ children, ...rest }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenSidebar(open);
  };

  const handleClose = () => setOpenSidebar(false);

  return (
    <Box>
      <CssBaseline />
      <Navbar toggleSidebar={toggleSidebar} noSearch={rest.noSearch} />
      <Sidebar
        open={openSidebar}
        toggleSidebar={toggleSidebar}
        handleClose={handleClose}
        {...rest}
      />
      {children}
      <Footer />
    </Box>
  );
}

const UserRoute = ({
  component: Component,
  auth,
  noSearch = false,
  ...rest
}) => {
  if (auth && !rest.isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <Route
      {...rest}
      render={(props) => (
        <UserLayout {...rest} noSearch={noSearch}>
          <Component {...props} {...rest} />
        </UserLayout>
      )}
    />
  );
};

const mapState = (state) => ({
  isAuth: selectIsAuthenticated(state),
  isAdmin: selectIsAdmin(state),
  isShop: selectIsShop(state),
  user: selectUserDetails(state),
  cartCount: selectCartItemsCount(state),
});

const mapDispatch = { logout };

export default connect(mapState, mapDispatch)(UserRoute);
