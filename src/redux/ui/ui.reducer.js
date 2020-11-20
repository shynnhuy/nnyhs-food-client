import { SET_NAVBAR_HEIGHT } from "./ui.types";

const initialState = {
  navbarHeight: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NAVBAR_HEIGHT:
      return {
        ...state,
        navbarHeight: action.payload,
      };
    default:
      return state;
  }
};
