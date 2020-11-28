export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingItem = cartItems.find((item) => item._id === cartItemToAdd._id);

  if (existingItem) {
    return cartItems.map((item) =>
      item._id === cartItemToAdd._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const addItemsToCart = (cartItems, cartItemToAdd, quantity) => {
  const existingItem = cartItems.find((item) => item._id === cartItemToAdd._id);

  if (existingItem) {
    return cartItems.map((item) =>
      item._id === cartItemToAdd._id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToRemove._id
  );

  if (existingItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem._id !== cartItemToRemove._id
    );
  }

  return cartItems.map((cartItem) =>
    cartItem._id === cartItemToRemove._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
