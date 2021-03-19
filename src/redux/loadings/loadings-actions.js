// export const rulesAcceptedAction = (history) => {
//   return dispatch => {
//     rulesAccepted()
//       .then(rep => {
//         dispatch(getCurrentUserAction());
//         history.push('/search')
//       })
//       .catch(err => {
//         dispatch(openNotificationPopup('Une erreur est survenue. Nous faisons le nécessaire pour résoudre le problème.'))
//       })
//   }
// }


// export const deleteUserErrors = () => ({
//   type: UserActionTypes.DELETE_USER_ERRORS,
// });

// export const setCurrentUser = (user) => ({
//   type: UserActionTypes.SET_CURRENT_USER,
//   payload: user,
// });