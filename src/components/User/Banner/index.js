import React from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import { useThemeContext } from "context/ThemeContext";

const Banner = () => {
  const { darkState } = useThemeContext();
  const classes = useStyles({ darkState });
  const history = useHistory();
  return (
    <Grid container component={Paper} className={classes.Paper}>
      <Grid item xs={12} sm={6} className={classes.ImgLeft} />
      <Grid item xs={false} sm={6} className={classes.Right}>
        <Typography variant="h4" color="primary">
          $0 delivery for 30days!{" "}
          <span role="img" aria-label="ic">
            🍕
          </span>
        </Typography>
        <Typography variant="body1" color="textPrimary">
          $0 delivery free for orders over $10 for 30days.
        </Typography>
        <Button
          color="primary"
          className={classes.Btn}
          onClick={() => history.push("/home")}
        >
          <Typography variant="body1">Learn More</Typography>
          <i className="fad fa-long-arrow-right fa-lg fa-acenter" />
        </Button>
      </Grid>
    </Grid>
  );
};

export default Banner;
