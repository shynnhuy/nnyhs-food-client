import React from "react";
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
} from "@material-ui/core";

import useStyles from "./styles";
import { ChevronsLeft } from "react-feather";
import clsx from "clsx";
import routes from "routes";
import SidebarItem from "components/User/Sidebar/SidebarItem";

export const Sidebar = ({ open, handleDrawerClose }) => {
  const classes = useStyles();

  const content = (
    <React.Fragment>
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronsLeft />
        </IconButton>
      </div>
      <Divider />
      <Box p={2}>
        <List component="nav">
          {routes.map((prop, key) => {
            return (
              <SidebarItem
                href={prop.layout + prop.path}
                key={prop.name}
                title={prop.name}
                icon={prop.icon}
                className={classes.navitem}
              />
            );
          })}
        </List>
      </Box>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerClose}
          className={clsx(classes.drawer, classes.drawerOpen)}
          classes={{
            paper: clsx(classes.drawerOpen),
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

export default Sidebar;
