import { combineReducers } from 'redux'
import userReducer from './user/user-reducer'
import layoutReducer from './layout/layout-reducer'
import FilterReducer from './filter/filter-reducer'

export default combineReducers({
  user: userReducer,
  layout: layoutReducer,
  filter: FilterReducer,
})