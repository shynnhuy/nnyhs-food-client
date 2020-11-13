import { LOADED_CATEGORY, LOADED_SHOP } from "./shop.types";

const defaultState = {
  details: {},
  categories: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOADED_CATEGORY:
      return {
        ...state,
        categories: [...action.payload],
      };
    case LOADED_SHOP:
      return {
        ...state,
        details: { ...action.payload },
      };
    default:
      return state;
  }
};
