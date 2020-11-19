import { createSelector } from "reselect";

const selectAdmin = (state) => state.admin;

export const selectUsersList = createSelector(
  selectAdmin,
  (admin) => admin.users
);

export const selectShopsList = createSelector(
  selectAdmin,
  (admin) => admin.shops
);
