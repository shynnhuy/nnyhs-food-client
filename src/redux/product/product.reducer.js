import {
  LOADING_PRODUCTS,
  LOADED_PRODUCTS,
  SORT_BY_PRICE,
  SORT_BY_ALPHABET,
  FILTER_PRODUCTS,
} from "./product.types";

const defaultState = {
  isLoadProducts: false,
  products: [],
  filteredProducts: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return {
        ...state,
        isLoadProducts: true,
        products: [],
      };
    case LOADED_PRODUCTS:
      return {
        ...state,
        isLoadProducts: false,
        products: [...action.payload],
        filteredProducts: [...action.payload],
      };
    case SORT_BY_PRICE:
      let newPriceState = { ...state };
      let sortedPriceArr =
        action.payload.direction === "asc"
          ? sortAsc(state.products, "price")
          : sortDesc(state.products, "price");
      newPriceState.filteredProducts = sortedPriceArr;
      return newPriceState;
    case SORT_BY_ALPHABET:
      let newNameState = { ...state };
      let sortedNameArr =
        action.payload.direction === "asc"
          ? sortAsc(state.products, "name")
          : sortDesc(state.products, "name");
      newNameState.filteredProducts = sortedNameArr;
      return newNameState;
    case FILTER_PRODUCTS:
      let newState = { ...state };
      let value = action.payload.value;
      let filteredProducts = state.products.filter((product) => {
        return (
          product.name.toLowerCase().includes(value) ||
          product.shop.name.toLowerCase().includes(value)
        );
      });

      if (value) {
        newState.filteredProducts = filteredProducts;
      } else {
        newState.filteredProducts = newState.products;
      }
      return newState;
    default:
      return state;
  }
};

function sortAsc(arr, field) {
  return arr.sort(function (a, b) {
    if (a[field] > b[field]) return 1;

    if (b[field] > a[field]) return -1;

    return 0;
  });
}

function sortDesc(arr, field) {
  return arr.sort(function (a, b) {
    if (a[field] > b[field]) return -1;

    if (b[field] > a[field]) return 1;

    return 0;
  });
}
