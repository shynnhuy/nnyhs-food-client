import api from "Api.js";

class ProductApi {
  getProduct = (id) => {
    return api.get(`/product/${id}`);
  };
  getProducts = (params) => {
    const url = "/product";
    return api.get(url, { params });
  };
}

const productApi = new ProductApi();
export default productApi;
