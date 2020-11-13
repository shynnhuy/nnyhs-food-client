import {
  LOADED_USERS,
  ADD_CATEGORY,
  LOADED_CATEGORY,
  LOADED_SHOPS,
  UPDATED_SHOP,
} from "./admin.types";

const initialState = {
  users: [],
  categories: [],
  shops: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOADED_USERS:
      return {
        ...state,
        users: [...action.payload],
      };
    case LOADED_CATEGORY:
      return {
        ...state,
        categories: [...action.payload],
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, { ...action.payload }],
      };
    case LOADED_SHOPS:
      return {
        ...state,
        shops: [...action.payload],
      };
    case UPDATED_SHOP:
      return {
        ...state,
        shops: state.shops.map((shop) =>
          shop._id === action.id ? { ...action.payload } : shop
        ),
      };
    default:
      return state;
  }
};
