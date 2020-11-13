import { LOADING_PRODUCTS, LOADED_PRODUCTS } from "./product.types";

const defaultState = {
  isLoadProducts: false,
  products: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return {
        ...state,
        isLoadProducts: true,
      };
    case LOADED_PRODUCTS:
      return {
        ...state,
        isLoadProducts: false,
        products: [...action.payload],
      };
    default:
      return state;
  }
};
