import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  Zoom,
  Hidden,
} from "@material-ui/core";
import clsx from "clsx";
import { AlarmTwoTone, MenuRounded } from "@material-ui/icons";

import { useThemeContext } from "context/ThemeContext";
import SIcon from "components/core/SIcon";
import useStyles from "./styles";
import { connect } from "react-redux";

export const Navbar = ({ open, handleDrawerOpen, user }) => {
  const classes = useStyles();

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
    <AppBar
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar className={classes.toolbar}>
        <Box className={classes.Outer}>
          <Box className={classes.NavLink}>
            <IconButton
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuRounded fontSize="inherit" />
            </IconButton>
          </Box>
          <Button className={classes.NavLink}>
            <Typography variant="h5" align="center" noWrap>
              NnyhS Manager
            </Typography>
          </Button>
        </Box>
        <Hidden smDown>
          <Box className={classes.Outer}>
            {renderToggle()}
            <IconButton>
              <AlarmTwoTone fontSize="inherit" />
            </IconButton>
            <IconButton>
              <Avatar src="/assets/github/react.svg" />
            </IconButton>
          </Box>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

const mapState = (state) => ({
  user: state.auth.user,
});

export default connect(mapState)(Navbar);
