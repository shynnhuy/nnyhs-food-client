import React from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";

import useStyles from "./styles";

export const Content = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container component={Container} maxWidth="lg">
        <Grid item xs={12}>
          <Typography variant="h5">Hot Products</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
