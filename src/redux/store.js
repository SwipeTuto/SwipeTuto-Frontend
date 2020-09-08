import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './root-reducer';
import thunk from 'redux-thunk';

// DEV :
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// ONLINE :
const composeEnhancers = compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

export default store;