import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@material-ui/core";
import { Swiper } from "components/User";
import { Content } from "components/User/Content";
import { connect } from "react-redux";

import { getProducts } from "redux/product/product.actions";

export const Home = ({ shop, product, getProducts }) => {
  const [category, setCategory] = useState("all");
  const [categoryName, setCategoryName] = useState("All Products");

  const memoizedCallback = useCallback(() => {
    getProducts(category);
  }, [getProducts, category]);

  useEffect(() => {
    memoizedCallback();
  }, [memoizedCallback]);

  const changeCategory = (id, name) => {
    setCategory(id);
    setCategoryName(name);
  };

  return (
    <React.Fragment>
      <Box style={{ padding: "0 0 32px 0" }}>
        <Swiper categories={shop.categories} changeCategory={changeCategory} />
      </Box>
      <Content title={categoryName} products={product.products} />
    </React.Fragment>
  );
};

const mapState = (state) => ({
  shop: state.shop,
  product: state.product,
});

export default connect(mapState, { getProducts })(Home);
