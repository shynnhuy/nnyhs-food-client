import { List, ListItem } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";

export const Footer = () => {
  const classes = useStyles();
  return (
    <footer>
      <div className={classes.container}>
        <List className={classes.list}>
          <ListItem className={classes.inlineBlock}>
            <Link to="/" className={classes.block}>
              Home
            </Link>
          </ListItem>
        </List>
      </div>
    </footer>
  );
};

export default Footer;
