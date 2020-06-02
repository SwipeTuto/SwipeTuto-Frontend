import { combineReducers } from 'redux'
import userReducer from './user/user-reducer'
import cardsReducer from './cards/cards-reducer'
import layoutReducer from './layout/layout-reducer'

export default combineReducers({
  user: userReducer,
  cards: cardsReducer,
  layout: layoutReducer,
})