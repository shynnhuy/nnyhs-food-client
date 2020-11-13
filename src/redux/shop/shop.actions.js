import Api from "Api";
import { REQUEST_SHOP } from "redux/auth/auth.types";
import { enqueueSnackbar } from "redux/snackbar/snackbar.actions";
import { LOADED_CATEGORY, LOADED_SHOP } from "./shop.types";
export const getCategories = () => (dispatch) => {
  Api.get("/product/category")
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: LOADED_CATEGORY,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createShop = (newShop) => async (dispatch) => {
  try {
    const res = await Api.post("/shop/", newShop);
    dispatch(loadShop(res.data.id));
    dispatch(enqueueSnackbar({ message: res.data.message, status: "success" }));
  } catch (error) {
    dispatch(
      enqueueSnackbar({
        message: error.response?.data.message || "Create shop error!",
        status: "error",
      })
    );
  }
  return "done";
};

export const loadShop = (id) => async (dispatch) => {
  try {
    const res = await Api.get("/shop/" + id);
    dispatch({ type: REQUEST_SHOP, payload: true });
    dispatch({
      type: LOADED_SHOP,
      payload: res.data,
    });
  } catch (error) {
    dispatch(
      enqueueSnackbar({
        message: error.response?.data.message || "Load your shop error!",
        status: "error",
      })
    );
  }
};
