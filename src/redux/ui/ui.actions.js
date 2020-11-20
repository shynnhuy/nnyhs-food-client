import { SET_NAVBAR_HEIGHT } from "./ui.types";

export const setNavbarHeight = (height) => ({
  type: SET_NAVBAR_HEIGHT,
  payload: height,
});
