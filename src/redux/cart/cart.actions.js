import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_FROM_CART,
  CLEAR_CART,
} from "./cart.types";

export const addItem = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeItem = (item) => ({
  type: REMOVE_FROM_CART,
  payload: item,
});

export const clearItemFromCart = (item) => ({
  type: CLEAR_FROM_CART,
  payload: item,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
