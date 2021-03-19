import { combineReducers } from 'redux'
import userReducer from './user/user-reducer'
import layoutReducer from './layout/layout-reducer'
import filterReducer from './filter/filter-reducer'
import loadingsReducer from './loadings/loadings-reducer'

export default combineReducers({
  user: userReducer,
  layout: layoutReducer,
  filter: filterReducer,
  loadings: loadingsReducer
})