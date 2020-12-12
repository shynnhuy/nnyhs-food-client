import { IconButton } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

const Locate = ({ panTo }) => {
  const classes = useStyles();
  const onSuccess = ({ coords }) => {
    panTo({ lat: coords.latitude, lng: coords.longitude });
  };
  const onLocate = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, () => null);
  };
  return (
    <IconButton className={classes.locateBtn} onClick={onLocate}>
      <i className="fad fa-location"></i>
    </IconButton>
  );
};

export default Locate;
