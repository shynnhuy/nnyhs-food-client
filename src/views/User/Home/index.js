import React, { useState, useEffect, useCallback } from "react";
import { Container } from "@material-ui/core";
import { Swiper } from "components/User";
import { Content } from "components/User/Content";
import { connect } from "react-redux";

import {
  getProducts,
  sortByPrice,
  sortByAlphabet,
  filterProducts,
} from "redux/product/product.actions";
// import ShynnMap from "components/core/ShynnMap";

import SearchBar from "material-ui-search-bar";
import { debounce } from "lodash";

export const Home = ({
  shop,
  products,
  getProducts,
  sortByPrice,
  sortByAlphabet,
  filterProducts,
}) => {
  const [category, setCategory] = useState("all");
  const [categoryName, setCategoryName] = useState("All Products");
  const [filter, setFilter] = useState("");

  // useEffect(() => {
  //   const onSuccess = ({ coords }) => {
  //     panTo({ lat: coords.latitude, lng: coords.longitude });
  //   };
  //   const onLocate = () => {
  //     navigator.geolocation.getCurrentPosition(onSuccess, () => null);
  //   };
  // }, []);

  const memoizedGetProducts = useCallback(() => {
    getProducts(category);
  }, [getProducts, category]);

  useEffect(() => {
    memoizedGetProducts();
  }, [memoizedGetProducts]);

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

  const onChangeSearch = (value) => debouncedSearch(value);
  const debouncedSearch = debounce(function (value) {
    filterProducts({ value });
  }, 1000);

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <SearchBar
          cancelOnEscape
          onChange={onChangeSearch}
          onRequestSearch={(value) => filterProducts({ value })}
          onCancelSearch={() => filterProducts({ value: "" })}
          placeholder={"Search for foods, drinks or shop..."}
          inputProps={{ "aria-label": "search" }}
        />
        <Swiper categories={shop.categories} changeCategory={changeCategory} />
      </Container>
      <Content
        title={categoryName}
        products={products}
        filter={filter}
        setFilter={setFilter}
      />
      {/* <ShynnMap /> */}
    </React.Fragment>
  );
};

const mapState = (state) => ({
  shop: state.shop,
  products: state.product.filteredProducts,
});

export default connect(mapState, {
  getProducts,
  sortByPrice,
  sortByAlphabet,
  filterProducts,
})(Home);
