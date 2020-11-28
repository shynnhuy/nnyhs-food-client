import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@material-ui/core";
import { Swiper } from "components/User";
import { Content } from "components/User/Content";
import { connect } from "react-redux";

import {
  getProducts,
  sortByPrice,
  sortByAlphabet,
} from "redux/product/product.actions";
import ShynnMap from "components/core/ShynnMap";

export const Home = ({
  shop,
  products,
  getProducts,
  sortByPrice,
  sortByAlphabet,
}) => {
  const [category, setCategory] = useState("all");
  const [categoryName, setCategoryName] = useState("All Products");
  const [filter, setFilter] = useState("");

  const memoizedGetProducts = useCallback(() => {
    getProducts(category);
  }, [getProducts, category]);

  useEffect(() => {
    memoizedGetProducts();
  }, [memoizedGetProducts]);

  // const sortProducts = () => {
  //   let direction = filter.endsWith("asc") ? "asc" : "desc";
  //   if (filter.startsWith("price")) {
  //     sortByPrice({ direction });
  //   } else {
  //     sortByAlphabet({ direction });
  //   }
  // };

  const memoizedSortProducts = useCallback(() => {
    let direction = filter.endsWith("asc") ? "asc" : "desc";
    if (filter.startsWith("price")) {
      sortByPrice({ direction });
    } else {
      sortByAlphabet({ direction });
    }
  }, [filter, sortByPrice, sortByAlphabet]);

  useEffect(() => {
    memoizedSortProducts();
  }, [memoizedSortProducts]);

  const changeCategory = (id, name) => {
    setCategory(id);
    setCategoryName(name);
  };

  return (
    <React.Fragment>
      {/* <Box style={{ padding: "0 0 32px 0" }}> */}
      <Box>
        <Swiper categories={shop.categories} changeCategory={changeCategory} />
      </Box>
      <Content
        title={categoryName}
        products={products}
        filter={filter}
        setFilter={setFilter}
      />
      <ShynnMap />
    </React.Fragment>
  );
};

const mapState = (state) => ({
  shop: state.shop,
  products: state.product.filteredProducts,
});

export default connect(mapState, { getProducts, sortByPrice, sortByAlphabet })(
  Home
);
