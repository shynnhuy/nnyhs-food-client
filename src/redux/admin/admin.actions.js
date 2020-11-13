import * as AdminTypes from "./admin.types";
import Api from "Api";
import { enqueueSnackbar } from "redux/snackbar/snackbar.actions";
// import { updateToken } from "redux/auth/auth.actions";
// import { isExpired, getExpirationDate } from "redux/auth/auth.helper";

// export const tokenConfig = async (dispatch, getState) => {
//   const token =
//     getState().auth.token || JSON.parse(sessionStorage.getItem("token"));
//   const config = {
//     headers: {
//       "Content-type": "application/json",
//     },
//   };

//   if (!token) {
//     return config;
//   }
//   if (isExpired(getExpirationDate(token.accessToken))) {
//     dispatch(updateToken());
//   }
//   config.headers["Authorization"] = `Bearer ${token.accessToken}`;
//   return config;
// };

export const getAllUsers = () => (dispatch, getState) => {
  Api.get("/auth/users")
    .then((res) => {
      dispatch({
        type: AdminTypes.LOADED_USERS,
        payload: res.data,
      });
      dispatch(
        enqueueSnackbar({ message: "All users are loaded", status: "success" })
      );
    })
    .catch((err) => {
      dispatch(
        enqueueSnackbar({
          message: err.response?.data.message || "Get all users error!",
          status: "error",
        })
      );
    });
};

export const getCategories = () => (dispatch) => {
  Api.get("/product/category")
    .then((res) => {
      dispatch({
        type: AdminTypes.LOADED_CATEGORY,
        payload: res.data,
      });
      dispatch(
        enqueueSnackbar({
          message: "All categories are loaded",
          status: "success",
        })
      );
    })
    .catch((err) => {
      dispatch(
        enqueueSnackbar({
          message: err.response?.data.message || "Get all categories error!",
          status: "error",
        })
      );
    });
};
export const getShops = () => async (dispatch) => {
  try {
    const res = await Api.get("/shop/");
    dispatch({
      type: AdminTypes.LOADED_SHOPS,
      payload: res.data,
    });
    dispatch(
      enqueueSnackbar({ message: "All requests are loaded", status: "success" })
    );
  } catch (err) {
    dispatch(
      enqueueSnackbar({
        message: err.response?.data.message || "Get all requests error!",
        status: "error",
      })
    );
  }
};

export const addCategory = (newCategory) => (dispatch) => {
  Api.post("/product/createCategory", newCategory)
    .then((res) => {
      dispatch({
        type: AdminTypes.ADD_CATEGORY,
        payload: res.data.result,
      });
      dispatch(
        enqueueSnackbar({ message: res.data.message, status: "success" })
      );
    })
    .catch((err) => {
      dispatch(
        enqueueSnackbar({
          message: err.response?.data.message || "Add category error!",
          status: "error",
        })
      );
    });
};

export const changeShopStatus = (id, status = "denied") => (dispatch) => {
  Api.patch(`/shop/${id}`, { status })
    .then((res) => {
      dispatch({
        type: AdminTypes.UPDATED_SHOP,
        id,
        payload: res.data.result,
      });
      dispatch(
        enqueueSnackbar({ message: res.data.message, status: "success" })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
