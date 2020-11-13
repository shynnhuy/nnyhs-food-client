import React from "react";
import { Box, Container, Grid } from "@material-ui/core";

import useStyles, {
  StyledCard,
  StyledTypography,
  StyledCardImage,
  StyledCardTitle
} from "./styles";

export const Content = ({ title, products }) => {
  const classes = useStyles();
  return (
    <Box component={Container} className={classes.root}>
      <StyledTypography variant="h5">{title}</StyledTypography>
      <Grid container spacing={3}>
        {products?.map((product) => (
          <Grid item xs={3} key={product._id}>
            <Item {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const Item = (props) => {
  return (
    <StyledCard>
      <StyledCardImage image={props.imageUrl} />
      <StyledCardTitle>{props.name}</StyledCardTitle>
    </StyledCard>
  );
};
