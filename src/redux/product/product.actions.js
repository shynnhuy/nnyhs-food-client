import productApi from "api/productApi";
import {
  LOADED_PRODUCTS,
  LOADING_PRODUCTS,
  SORT_BY_PRICE,
  SORT_BY_ALPHABET,
  FILTER_PRODUCTS,
} from "./product.types";

export const getProducts = (category) => async (dispatch) => {
  dispatch({
    type: LOADING_PRODUCTS,
  });
  try {
    const params = { category };
    const response = await productApi.getProducts(params);
    dispatch({
      type: LOADED_PRODUCTS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const sortByPrice = (payload) => ({
  type: SORT_BY_PRICE,
  payload,
});

export const sortByAlphabet = (payload) => ({
  type: SORT_BY_ALPHABET,
  payload,
});

export const filterProducts = (payload) => ({
  type: FILTER_PRODUCTS,
  payload,
});

// export const sortByPrice = (direction) => (dispatch, getState) => {
//   const products = getState().product.products;
//   let sortedPriceArr =
//     direction === "asc"
//       ? sortAsc(state.filteredProducts, "price")
//       : sortDesc(state.filteredProducts, "price");
// };
