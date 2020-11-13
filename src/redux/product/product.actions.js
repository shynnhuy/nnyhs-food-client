import productApi from "api/productApi";
import { LOADED_PRODUCTS, LOADING_PRODUCTS } from "./product.types";

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
