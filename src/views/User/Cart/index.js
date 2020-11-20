import React from "react";
import { Container, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import useStyles, { StyledCartTitle, StyledCheckOutContainer } from "./styles";
import CartList from "./CartList";
import { createStructuredSelector } from "reselect";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
} from "redux/cart/cart.selectors";
import {
  addItem,
  removeItem,
  clearItemFromCart,
} from "redux/cart/cart.actions";

const stripePromise = loadStripe(
  "pk_test_51HpaMfDXe7CZVgBqiIgpeMqMNVmDBr5QyKd1nfrmpqpjXzqqjkAj1FbpeV0Uf609BuYPh9ukKNTqoicusZ7laNag00Snv3xF30"
);

const Cart = ({
  cartItems,
  cartCount,
  cartTotal,
  addItem,
  removeItem,
  clearItemFromCart,
}) => {
  const classes = useStyles({ navheight: 112 });
  const changeQuantity = (payload, action) => {
    switch (action) {
      case -1:
        removeItem(payload);
        break;
      case 0:
        clearItemFromCart(payload);
        break;
      case 1:
        addItem(payload);
        break;
      default:
        return;
    }
  };

  return (
    <Container className={classes.container} maxWidth="lg">
      <Grid container spacing={2} style={{ height: "100%" }}>
        <Grid item xs={12} sm={12} md={8} lg={9}>
          <StyledCartTitle>Shopping Cart</StyledCartTitle>
          <CartList
            items={cartItems}
            count={cartCount}
            total={cartTotal}
            changeQuantity={changeQuantity}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <StyledCheckOutContainer>
            <Elements stripe={stripePromise}>Check Out</Elements>
          </StyledCheckOutContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  cartCount: selectCartItemsCount,
  cartTotal: selectCartTotal,
});

const mapDispatch = {
  addItem,
  removeItem,
  clearItemFromCart,
};

export default connect(mapState, mapDispatch)(Cart);
