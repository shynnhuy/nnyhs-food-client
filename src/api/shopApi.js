import api from "Api.js";

class ShopApi {
  getProducts = (params) => {
    const url = "/product";
    return api.get(url, { params });
  };
}

const shopApi = new ShopApi();
export default shopApi;
