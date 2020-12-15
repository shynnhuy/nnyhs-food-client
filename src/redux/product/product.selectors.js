import { createSelector } from "reselect";

const selectProducts = (state, id) =>
  state.product.products.find((product) => product._id === id);

export const productDetailsSelector = createSelector(
  [selectProducts],
  (details) => details
);

export const selectProductCategory = createSelector(
  (state, props) =>
    state.shop.categories.find((item) => item._id === props.product.category),
  (item) => item.name
);
