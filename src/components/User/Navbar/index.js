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
} from "@material-ui/core";
import useStyles from "./styles";
import SearchBar from "material-ui-search-bar";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "redux/auth/auth.actions";
import { filterProducts } from "redux/product/product.actions";
import { setNavbarHeight } from "redux/ui/ui.actions";
import { useThemeContext } from "context/ThemeContext";

import SIcon from "components/core/SIcon";
import { selectCartItemsCount } from "redux/cart/cart.selectors";

import { debounce } from "lodash";

export const Navbar = ({
  auth,
  shop,
  logout,
  filterProducts,
  cartCount,
  setNavbarHeight,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [profileMenu, setProfileMenu] = useState(null);

  // const ref = useRef(null);
  // useEffect(() => {
  //   setNavbarHeight(ref.current.clientHeight);
  // }, [setNavbarHeight]);

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
  const toCart = () => history.push("/cart");
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

  const onChangeSearch = (value) => debouncedSearch(value);
  const debouncedSearch = debounce(function (value) {
    filterProducts({ value });
  }, 1000);

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

      <Box className={classes.Right}>
        <SearchBar
          cancelOnEscape
          onChange={onChangeSearch}
          onRequestSearch={(value) => filterProducts({ value })}
          onCancelSearch={() => filterProducts({ value: "" })}
          placeholder="Search products, shop…"
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
  filterProducts,
};

export default connect(mapState, mapDispatch)(Navbar);
