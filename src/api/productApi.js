import api from "Api.js";

class ProductApi {
  getProducts = (params) => {
    const url = "/product";
    return api.get(url, { params });
  };
}

const productApi = new ProductApi();
export default productApi;
