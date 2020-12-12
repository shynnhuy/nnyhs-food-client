import React, { useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  Zoom,
  Badge,
  Hidden,
  Paper,
  Divider,
  InputBase,
} from "@material-ui/core";
import useStyles from "./styles";
// import SearchBar from "material-ui-search-bar";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "redux/auth/auth.actions";
import { useThemeContext } from "context/ThemeContext";

import SIcon from "components/core/SIcon";
import { selectCartItemsCount } from "redux/cart/cart.selectors";

import { DehazeTwoTone, Directions } from "@material-ui/icons";
// import ShynnMap from "components/core/ShynnMap";

export const Navbar = ({
  auth,
  shop,
  logout,
  cartCount,
  toggleSidebar,
  noSearch,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [profileMenu, setProfileMenu] = useState(null);

  const handleClick = (event) => setProfileMenu(event.currentTarget);

  const handleClose = () => setProfileMenu(null);

  const onLogout = () => {
    logout();
    handleClose();
  };
  const toHome = () => history.push("/");
  const toAdmin = () => history.push("/admin/dashboard");
  const toLogin = () => history.push("/login");
  const toShop = () => history.push("/myshop");
  const toCart = () => history.push("/cart");
  const toProfile = () => {
    history.push("/profile");
    handleClose();
  };

  const { darkState, handleThemeChange } = useThemeContext();
  const ToggleIcon = ({ title, icon }) => (
    <Tooltip title={title} placement="left" arrow TransitionComponent={Zoom}>
      <IconButton onClick={() => handleThemeChange()}>
        <SIcon className={icon} />
      </IconButton>
    </Tooltip>
  );

  const renderToggle = () =>
    darkState ? (
      <ToggleIcon title="Toogle Light Theme" icon="fa-sun" />
    ) : (
      <ToggleIcon title="Toogle Dark Theme" icon="fa-eclipse-alt" />
    );

  return (
    <Box
      component={Container}
      maxWidth="lg"
      className={classes.Navbar}
      // ref={ref}
    >
      <Box md={2} className={classes.Left}>
        <Button onClick={toHome} color="inherit">
          <Typography
            className={classes.title}
            variant="h5"
            align="center"
            noWrap
          >
            <i className="fad fa-home mr-2"></i>
            NnyhS
          </Typography>
          {/* NnyhS */}
        </Button>
      </Box>

      {noSearch ? (
        <div className={classes.grow}></div>
      ) : (
        <Box className={classes.Center}>
          {/* <TextField
              disabled
              placeholder="Choose your location"
              variant="outlined"
              onClick={() => handleModal(<ShynnMap />)}
              classes={{
                root: classes.inputRoot,
              }}
              inputProps={{ style: { padding: "9px 14px" } }}
            /> */}
          <Paper className={classes.searchBar}>
            <InputBase
              className={classes.input}
              placeholder="Enter Your Location"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              color="primary"
              className={classes.iconButton}
              aria-label="directions"
            >
              <Directions />
            </IconButton>
          </Paper>
        </Box>
      )}
      <div className={classes.Right}>
        {renderToggle()}
        {auth.isAuthenticated ? (
          <IconButton onClick={handleClick}>
            <i className="fad fa-user"></i>
          </IconButton>
        ) : (
          <IconButton onClick={toLogin}>
            <i className="fad fa-user"></i>
          </IconButton>
        )}
        {auth.isRequestShop && shop.details.status === "approval" && (
          <IconButton onClick={toShop}>
            <i className="fad fa-store"></i>
          </IconButton>
        )}
        <IconButton onClick={toCart}>
          <Badge badgeContent={cartCount} color="secondary" showZero>
            <i className="fad fa-shopping-cart"></i>
          </Badge>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={profileMenu}
          keepMounted
          open={Boolean(profileMenu)}
          onClose={handleClose}
        >
          {auth.isAdmin && <MenuItem onClick={toAdmin}>Admin</MenuItem>}
          <MenuItem onClick={toProfile}>Profile</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </div>
      <Hidden smUp>
        <IconButton onClick={toggleSidebar(true)}>
          <DehazeTwoTone />
        </IconButton>
      </Hidden>
    </Box>
  );
};

const mapState = (state) => ({
  auth: state.auth,
  shop: state.shop,
  cartCount: selectCartItemsCount(state),
});

const mapDispatch = {
  logout,
};

export default connect(mapState, mapDispatch)(Navbar);
