import React, { useState } from "react";
import {
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import useStyles from "./styles";
import { ChevronLeftOutlined } from "@material-ui/icons";
import clsx from "clsx";
import routes from "routes";
import { useHistory } from "react-router-dom";

export const Sidebar = ({ open, handleDrawerClose }) => {
  const history = useHistory();
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const clickLink = (event, idx, layout, path) => {
    history.push(layout + path);
    setSelectedIndex(idx);
  };
  return (
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
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftOutlined />
        </IconButton>
      </div>
      <Divider />
      <List component="nav">
        {routes.map((prop, key) => {
          return (
            // <NavLink
            //   to={prop.layout + prop.path}
            //   activeClassName={classes.active}
            //   key={key}
            // >
            <ListItem
              key={key}
              button
              selected={selectedIndex === key}
              onClick={(event) => clickLink(event, key, prop.layout, prop.path)}
              classes={{
                selected: classes.active,
              }}
              className={classes.Item}
            >
              <ListItemIcon
                classes={{
                  root: selectedIndex === key ? classes.selectedIcon : classes.Icon,
                }}
              >
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <prop.icon />
                )}
              </ListItemIcon>
              <ListItemText primary={prop.name} disableTypography={true} />
            </ListItem>
            // </NavLink>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
