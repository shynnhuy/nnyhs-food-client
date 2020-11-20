import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_FROM_CART,
  CLEAR_CART,
} from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

const inititalState = {
  cartItems: [],
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CLEAR_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        ),
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
