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
} from "@material-ui/core";
import clsx from "clsx";
import { AlarmTwoTone, MenuRounded } from "@material-ui/icons";
import SearchBar from "material-ui-search-bar";

import { useThemeContext } from "context/ThemeContext";
import SIcon from "components/core/SIcon";
import useStyles from "./styles";

export const Navbar = ({ open, handleDrawerOpen }) => {
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
      <Toolbar>
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
        <Box className={classes.SearchContainer}>
          <SearchBar className={classes.SearchBar} />
        </Box>
        <Box className={classes.Outer}>
          {renderToggle()}
          <IconButton>
            <AlarmTwoTone fontSize="inherit" />
          </IconButton>
          <Avatar src="/assets/github/react.svg" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
