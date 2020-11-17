import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accQuantity, cartItem) => accQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accQuantity, cartItem) => accQuantity + cartItem.quantity * cartItem.price,
    0
  )
);

export const selectSingleCartItemQuantity = createSelector(
  (state, props) =>
    state.cart.cartItems.find((item) => item._id === props.product._id),
  (item) => item
);
