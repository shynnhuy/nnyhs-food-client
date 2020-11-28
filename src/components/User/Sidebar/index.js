import React from "react";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import {
  Home,
  LogIn,
  LogOut,
  User,
  Grid as Admin,
  ShoppingCart as Cart,
} from "react-feather";

import useStyles from "./styles";
import SidebarItem from "./SidebarItem";

export const Sidebar = ({
  open = true,
  handleClose,
  isAuth,
  isAdmin,
  logout,
  user,
  cartCount,
}) => {
  const classes = useStyles();

  const list = (
    <Box display="flex" flexDirection="column">
      {!isAuth ? (
        <div className={classes.marginNavbar}>
          <Typography
            className={classes.title}
            variant="h5"
            align="center"
            noWrap
          >
            NnyhS
          </Typography>
        </div>
      ) : (
        <Box alignItems="center" display="flex" flexDirection="column" p={2}>
          <Avatar
            className={classes.avatar}
            component={RouterLink}
            src={user.photoUrl}
            to="/profile"
          />
          <Typography className={classes.name} color="textPrimary" variant="h5">
            {user.displayName}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {"Active Member"}
          </Typography>
        </Box>
      )}
      <Divider />
      <Box p={2}>
        <List>
          {isAdmin && (
            <SidebarItem href="/admin" title="Admin Dashboard" icon={Admin} />
          )}
          <SidebarItem href={"/home"} title={"Home"} icon={Home} />
          <SidebarItem
            href={"/cart"}
            title={"Cart"}
            icon={Cart}
            badge={cartCount}
            hasBadge
          />
          {!isAuth ? (
            <SidebarItem href="/login" title="Login" icon={LogIn} />
          ) : (
            <React.Fragment>
              <SidebarItem href="/profile" title="Profile" icon={User} />
              <SidebarItem
                title="Logout"
                icon={LogOut}
                onClick={logout}
                isLink={false}
              />
            </React.Fragment>
          )}
        </List>
      </Box>
    </Box>
  );

  return (
    <Hidden smUp>
      <Drawer
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.sidebar }}
      >
        {list}
      </Drawer>
    </Hidden>
  );
};

export default Sidebar;
