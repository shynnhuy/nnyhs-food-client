import Api from "Api";
// import { tokenConfig } from "redux/admin/admin.actions";
import { enqueueSnackbar } from "redux/snackbar/snackbar.actions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_ROLES,
  USER_UPDATE,
  CHECK_ADMIN,
  REQUEST_SHOP,
} from "./auth.types";

import { loadShop } from "redux/shop/shop.actions";

const checkAdmin = (roles = [], admin, dispatch) => {
  // console.log("Check Admin");
  // console.log(roles, admin);
  if (roles.map((role) => role._id).includes(admin)) {
    dispatch({
      type: CHECK_ADMIN,
      payload: true,
    });
  }
};

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });
  // Api.get("/auth/userData", tokenConfig(dispatch, getState))
  Api.get("/auth/userData")
    .then((res) => {
      dispatch(
        enqueueSnackbar({ message: res.data.message, status: "success" })
      );
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      // dispatch({
      //   type: SET_REQUEST,
      //   payload: res.data.user.isRequested,
      // });
      if (res.data.user.isRequestShop) {
        dispatch(loadShop(res.data.user.shop));
      }
      if (getState().auth.isAuthenticated) {
        checkAdmin(
          res.data.user.roles,
          getState().auth.roles?.Administrator,
          dispatch
        );
      }
    })
    .catch((err) => {
      dispatch(
        enqueueSnackbar({
          message: err.response?.data.message || "Authentication Error",
          status: "error",
        })
      );
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register User
export const register = (newUser) => (dispatch) => {
  Api.post("/auth/register", newUser)
    .then((res) => {
      dispatch(
        enqueueSnackbar({ message: res.data.message, status: "success" })
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        enqueueSnackbar({
          message: err.response?.data.message || "Register Fail",
          status: "error",
        })
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Login User
export const login = ({ email, password }) => (dispatch, getState) => {
  Api.post("/auth/login", { email, password })
    .then((res) => {
      const { message, ...rest } = res.data;

      dispatch(enqueueSnackbar({ message, status: "success" }));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: rest,
      });

      if (
        checkAdmin(
          rest.user.roles,
          getState().auth.roles?.Administrator,
          dispatch
        )
      ) {
        dispatch({
          type: CHECK_ADMIN,
          payload: true,
        });
      }
    })
    .catch((err) => {
      dispatch(
        enqueueSnackbar({
          message: err.response?.data.message || "Login Fail",
          status: "error",
        })
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};
export const jsLogin = async (dispatch, { email, password }) => {
  try {
    let res = await Api.post("/auth/login", { email, password });
    const { message, ...rest } = res.data;
    dispatch(enqueueSnackbar({ message, status: "success" }));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: rest,
    });
    return rest;
  } catch (err) {
    dispatch(
      enqueueSnackbar({
        message: err.response.data.message || "Login Fail",
        status: "error",
      })
    );
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout User
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  dispatch(
    enqueueSnackbar({
      message: "Logged out successfully",
      status: "success",
    })
  );
};

export const getRoles = () => (dispatch, getState) => {
  Api.get("/auth/roles")
    .then((res) => {
      dispatch({
        type: GET_ROLES,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("Load roles error!");
    });
};

export const updateInfo = (newInfo) => (dispatch, getState) => {
  Api.patch("/auth/userData", newInfo)
    .then((res) => {
      dispatch(
        enqueueSnackbar({ message: res.data.message, status: "success" })
      );
      dispatch({
        type: USER_UPDATE,
      });
      dispatch(loadUser());
    })
    .catch((err) => {
      dispatch(
        enqueueSnackbar({
          message: err.response?.data.message || "Update Information Error",
          status: "error",
        })
      );
    });
};

export const updateToken = () => (dispatch, getState) => {
  dispatch(
    enqueueSnackbar({
      message: "Update token successfully",
      status: "success",
    })
  );
  // dispatch(loadUser());
};

export const requestShop = () => (dispatch) => {
  dispatch({
    type: REQUEST_SHOP,
    payload: true,
  });
};
// export const updateToken = () => (dispatch, getState) => {
//   Api.post("/auth/refreshToken", {
//     refreshToken: getState().auth.token?.refreshToken,
//   })
//     .then((res) => {
//       dispatch(
//         enqueueSnackbar({
//           message: res.data.message || "Update token successfully",
//           status: "success",
//         })
//       );
//       dispatch({
//         type: UPDATE_TOKEN,
//         payload: res.data,
//       });
//       // dispatch(loadUser());
//       setToken(res.data);
//     })
//     .catch((err) => {
//       dispatch(
//         enqueueSnackbar({
//           message: err.response?.data.message || "Update Token Error",
//           status: "error",
//         })
//       );
//     });
// };
