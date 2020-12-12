import { createSelector } from "reselect";

const selectAuth = (state) => state.auth;

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);
export const selectIsAdmin = createSelector(
  [selectAuth],
  (auth) => auth.isAdmin
);
export const selectIsShop = createSelector(
  [selectAuth],
  (auth) => auth.isRequestShop
);
export const selectUserDetails = createSelector(
  [selectAuth],
  (auth) => auth.user
);
