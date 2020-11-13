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
} from "@material-ui/core";
import useStyles from "./styles";
import SearchBar from "material-ui-search-bar";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "redux/auth/auth.actions";
import { useThemeContext } from "context/ThemeContext";

import SIcon from "components/core/SIcon";

export const Navbar = ({ auth, shop, logout }) => {
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
  const toShop = () => history.push("/shop");
  const toProfile = () => {
    history.push("/profile");
    handleClose();
  };

  const { darkState, handleThemeChange } = useThemeContext();
  const LightIcon = () => (
    <Tooltip
      title="Toogle Light Theme"
      placement="left"
      arrow
      TransitionComponent={Zoom}
    >
      <IconButton onClick={() => handleThemeChange()}>
        <SIcon className="fa-sun" />
      </IconButton>
    </Tooltip>
  );
  const DarkIcon = () => (
    <Tooltip
      title="Toogle Dark Theme"
      placement="left"
      arrow
      TransitionComponent={Zoom}
    >
      <IconButton onClick={() => handleThemeChange()}>
        <SIcon className="fa-eclipse-alt" />
      </IconButton>
    </Tooltip>
  );

  const renderToggle = () => (darkState ? <LightIcon /> : <DarkIcon />);

  return (
    <Box component={Container} maxWidth="lg" className={classes.Navbar}>
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

      <Box className={classes.Right}>
        <SearchBar
          onChange={() => console.log("onChange")}
          onRequestSearch={() => console.log("onRequestSearch")}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          // onFocus={() => console.log("focus")}
          // onBlur={() => console.log("Blur")}
          inputProps={{ "aria-label": "search" }}
        />
      </Box>
      {/* <Switch checked={darkState} onChange={handleThemeChange} /> */}
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
      <IconButton>
        <i className="fad fa-shopping-cart"></i>
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
    </Box>
  );
};

const mapState = (state) => ({
  auth: state.auth,
  shop: state.shop,
});

const mapDispatch = {
  logout,
};

export default connect(mapState, mapDispatch)(Navbar);
