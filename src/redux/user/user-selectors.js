import { createSelector } from 'reselect'

export const selectUser = state => state.user;
export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);
export const selectOtherUser = createSelector(
  [selectUser],
  user => user.otherUser && user.otherUser
);