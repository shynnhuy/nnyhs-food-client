import React from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import useStyles, { StyledCartTitle, StyledCheckOutContainer } from "./styles";
import CartList from "./CartList";
import { createStructuredSelector } from "reselect";
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
import Commitments from "components/User/Commitments";
import CheckOut from "../Checkout";
import useModal from "hooks/useModal";

// const stripePromise = loadStripe(
//   "pk_test_51HpaMfDXe7CZVgBqiIgpeMqMNVmDBr5QyKd1nfrmpqpjXzqqjkAj1FbpeV0Uf609BuYPh9ukKNTqoicusZ7laNag00Snv3xF30"
// );

const Cart = ({
  user,
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
  const { handleModal } = useModal();

  return (
    <Container className={classes.container} maxWidth="lg">
      <Grid container spacing={2} style={{ height: "100%" }}>
        <Grid item xs={12} sm={12} lg={8} md={7}>
          <StyledCartTitle>Shopping Cart</StyledCartTitle>
          <CartList
            items={cartItems}
            count={cartCount}
            changeQuantity={changeQuantity}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={4} md={5}>
          <StyledCheckOutContainer>
            <Typography variant="h4" className={classes.title}>
              Total:
            </Typography>
            <Typography variant="h1" className={classes.total}>
              {cartTotal}đ
            </Typography>
            <Typography variant="h4" className={classes.shipCost}>
              Free Shipping!
            </Typography>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              className={classes.checkout}
              onClick={() => handleModal(<CheckOut />)}
              disabled={cartItems.length === 0}
            >
              proceed to checkout
            </Button>
            <Commitments />
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
