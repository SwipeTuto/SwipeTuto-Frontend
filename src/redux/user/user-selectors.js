import { createSelector } from 'reselect'

export const selectUser = state => state.user;
export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);
export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  user => user && user.id
);
export const selectClickedUser = createSelector(
  [selectUser],
  user => user && user.clickedUser && user.clickedUser.user
);
export const selectUserErrors = createSelector(
  [selectUser],
  user => user.errors && user.errors
);
export const selectUserFavories = createSelector(
  [selectCurrentUser],
  currentUser => currentUser && currentUser.favories
);
export const selectCurrentUserSettings = createSelector(
  [selectCurrentUser],
  currentUser => currentUser && currentUser.settings
);
export const selectCurrentUserCategoriesPreferences = createSelector(
  [selectCurrentUser],
  currentUser => currentUser?.profile?.category_favorie?.map(item => item?.name)
);

export const selectCurrentUserFollowers = createSelector(
  [selectCurrentUser],
  currentUser => currentUser && currentUser.followings
);
export const selectCurrentUserFollowersCount = createSelector(
  [selectCurrentUser],
  currentUser => currentUser && currentUser.followers_count
);