import { Button, Divider, Box, Typography } from "@material-ui/core";
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import checkoutApi from "api/checkoutApi";
import React from "react";
import { connect } from "react-redux";
import { selectCartTotal } from "redux/cart/cart.selectors";
import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SHAREABLE);

const PaymentForm = ({ shippingData, backStep, items, total }) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const {
        firstName,
        lastName,
        email,
        address,
        district,
        ward,
      } = shippingData;
      const orderData = {
        items,
        total,
        customer: {
          firstName,
          lastName,
          email,
        },
        shipping: {
          name: "Primary",
          street: address,
          ward,
          district,
        },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      // console.log("Items: ", items);
      // console.log("Shipping: ", shippingData);
      // console.log("paymentMethod: ", paymentMethod);
      await checkoutApi.checkout(orderData);
    }
  };
  return (
    <div>
      <Review items={items} total={total} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <Box display="flex" justifyContent="space-between">
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay {total}đ
                </Button>
              </Box>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

const mapState = (state) => ({
  items: state.cart.cartItems,
  total: selectCartTotal(state),
});

export default connect(mapState)(PaymentForm);
