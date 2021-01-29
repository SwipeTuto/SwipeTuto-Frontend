import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './root-reducer';
import thunk from 'redux-thunk';

// DEV :
// let composeEnhancers;
// if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
//   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// } else {
//   composeEnhancers = compose;
// }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// ONLINE :
// const composeEnhancers = compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

export default store;