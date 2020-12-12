import api from "Api.js";

class CheckoutApi {
  checkout = (body) => {
    return api.post(`/checkout/pay`, body);
  };
}

const checkoutApi = new CheckoutApi();
export default checkoutApi;
