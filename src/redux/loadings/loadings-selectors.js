import { createSelector } from 'reselect'

export const selectLoadings = state => state.loadings;

export const selectUpdateAvatarLoading = createSelector(
  [selectLoadings],
  loadings => loadings.updateAvatarButton
);