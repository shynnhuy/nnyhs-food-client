import React from "react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

import useStyles, { StyledTypography } from "./styles";
import ProductItem from "./ProductItem";

export const Content = ({ title, products, filter, setFilter }) => {
  const classes = useStyles();
  return (
    <Box component={Container} className={classes.root}>
      <div className="flex between">
        <StyledTypography variant="h5">{title}</StyledTypography>
        <FormControl variant="outlined" className={classes.Filter}>
          <InputLabel id="sortLabel">Sort By</InputLabel>
          <Select
            label="Sort By"
            labelId="sortLabel"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {/* <MenuItem value="created_desc">Newest</MenuItem>
            <MenuItem value="created_asc">Oldest</MenuItem> */}
            <MenuItem value="alphabet_asc">Alphabet - A-Z</MenuItem>
            <MenuItem value="alphabet_desc">Alphabet - Z-A</MenuItem>
            <MenuItem value="price_asc">Price - Lowest to Highest</MenuItem>
            <MenuItem value="price_desc">Price - Highest to Lowest</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Grid container className={classes.list} spacing={3}>
        {products?.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
