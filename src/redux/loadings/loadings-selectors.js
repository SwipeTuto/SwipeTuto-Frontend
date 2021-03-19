import { createSelector } from 'reselect'

export const selectLoadings = state => state.loadings;

// export const selectFollows = createSelector(
//   [selectUser],
//   user => user.follows
// );