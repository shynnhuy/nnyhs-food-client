import { createSelector } from "reselect";

const selectUi = (state) => state.ui;

export const selectNavbarHeight = createSelector(
  [selectUi],
  (ui) => ui.navbarHeight
);
