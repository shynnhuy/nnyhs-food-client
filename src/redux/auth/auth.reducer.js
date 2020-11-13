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
  UPDATE_TOKEN,
  REQUEST_SHOP,
} from "./auth.types";

const initialState = {
  // token: JSON.parse(sessionStorage.getItem('token') || '') || null,
  token: JSON.parse(sessionStorage.getItem("token")) || null,
  isAuthenticated: null,
  isAdmin: false,
  isLoading: false,
  user: null,
  roles: {},
  isRequestShop: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        isRequestShop: action.payload.user.isRequestShop,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      sessionStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAdmin: false,
        isAuthenticated: false,
        isLoading: false,
      };
    case GET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    case USER_UPDATE: {
      return {
        ...state,
      };
    }
    case CHECK_ADMIN: {
      return {
        ...state,
        isAdmin: action.payload,
      };
    }
    case UPDATE_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case REQUEST_SHOP: {
      return {
        ...state,
        user: { ...state.user, isRequestShop: action.payload },
        isRequestShop: action.payload,
      };
    }
    default:
      return state;
  }
}
