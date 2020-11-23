import { createSelector } from "reselect";

const selectProducts = (state, id) =>
  state.product.products.find((product) => product._id === id);

export const productDetailsSelector = createSelector(
  [selectProducts],
  (details) => details
);
