import React from "react";
import Banner from "components/User/Banner";
import { Container, Grid, Typography, Box } from "@material-ui/core";
import useStyles from "./styles";

const CardItems = [
  {
    title: "Curated restaurants",
    second:
      "From small bites to big meals, we won't limit your appetite. Go ahead and order all you want.",
    left: true,
  },
  {
    title: "More cool features on the Mobile Phone",
    second:
      "Open NnyhS Shop on Mobile to use other payment methods and enjoy seamless communication with your driver.",
    left: false,
  },
];

export const Landing = () => {
  const classes = useStyles();
  return (
    <Box component={Container} maxWidth="lg">
      <Banner />
      <Grid
        container
        component={Container}
        maxWidth="lg"
        className={classes.Container}
      >
        {CardItems.map((item, idx) => (
          <Grid
            key={idx}
            item
            xs={12}
            md={6}
            className={item.left ? classes.Left : classes.Right}
          >
            <div className={item.left ? "imgLeft" : "imgRight"} />
            <LandingCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Landing;

// eslint-disable-next-line react/prop-types
const LandingCard = ({ title, second }) => {
  const classes = useStyles();
  return (
    <Box className={classes.Card}>
      <Typography variant="h5" component="h2" className={classes.title}>
        {title}
      </Typography>
      <Typography color="textSecondary">{second}</Typography>
    </Box>
  );
};
