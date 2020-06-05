import { UserActionTypes } from './user-types'
import { login } from '../../services/userService'

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

