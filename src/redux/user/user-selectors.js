import { createSelector } from 'reselect'

export const selectUser = state => state.user;
export const selectFollows = createSelector(
  [selectUser],
  user => user.follows
);
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


export const selectCurrentUserReglement = createSelector(
  [selectCurrentUser],
  currentUser => currentUser && currentUser.reglement
);
export const selectTopUsers = createSelector(
  [selectUser],
  user => user && user.topUsers
);

// follows

// export const selectClickedUserFollowsObj = createSelector(
//   [selectClickedUser],
//   clickedUser => clickedUser && clickedUser.followers
// );
export const selectCurrentUserFollowers = createSelector(
  [selectFollows],
  follows => follows && follows.followers
);
export const selectCurrentUserFollowersCount = createSelector(
  [selectFollows],
  follows => follows && follows.followers_count
);
export const selectCurrentUserFollowings = createSelector(
  [selectFollows],
  follows => follows && follows.followings
);
export const selectCurrentUserFollowingsCount = createSelector(
  [selectFollows],
  follows => follows && follows.followings_count
);
export const selectCurrentUserFollowingsList = createSelector(
  [selectUser],
  user => user && user.followings_list
);
export const selectCurrentUserFollowersList = createSelector(
  [selectUser],
  user => user && user.followers_list
);