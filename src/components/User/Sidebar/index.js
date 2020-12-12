import React from "react";
import {
  Avatar,
  Box,
  Button,
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
  Briefcase as ShopIcon
} from "react-feather";

import useStyles from "./styles";
import SidebarItem from "./SidebarItem";
import { useThemeContext } from "context/ThemeContext";
import SIcon from "components/core/SIcon";

export const Sidebar = ({
  open = true,
  handleClose,
  isAuth,
  isAdmin,
  isShop,
  logout,
  user,
  cartCount,
}) => {
  const classes = useStyles();

  const { darkState, handleThemeChange } = useThemeContext();

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
                {isShop && <SidebarItem href="/myshop" title="My Shop" icon={ShopIcon} />}
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
      <Box p={2} className={classes.toggle}>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={
            <SIcon className={darkState ? "fa-sun" : "fa-eclipse-alt"} />
          }
          onClick={handleThemeChange}
        >
          {darkState ? "Toogle Light Theme" : "Toogle Dark Theme"}
        </Button>
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
