import { Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { productDetailsSelector } from "redux/product/product.selectors";

const ProductDetails = ({ details }) => {
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item sm={12} md={4}>
          IMAGE
        </Grid>
        <Grid item sm={12} md={8}>
          <h1>{details.name || "Product"} Details</h1>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapState = (state, props) => ({
  details: productDetailsSelector(state, props.match.params.id),
});

export default connect(mapState)(ProductDetails);
