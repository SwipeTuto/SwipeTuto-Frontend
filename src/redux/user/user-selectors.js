import { createSelector } from 'reselect'

export const selectUser = state => state.user;
export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);
export const selectClickedUser = createSelector(
  [selectUser],
  user => user.clickedUser && user.clickedUser
);
export const selectUserErrors = createSelector(
  [selectUser],
  user => user.errors && user.errors
);