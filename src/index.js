import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './redux/store';
import ReactGA from 'react-ga';
import history from "./helper/history"
import { BrowserRouter } from 'react-router-dom'
import './index.scss';

// AXIOS SETTINGS

const headersKeys = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  // 'X-CSRF-TOKEN': csrftoken,
}

export const client = () => {
  if (process.env.NODE_ENV === "development") {
  return axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    headers: headersKeys
  });
  } else if (process.env.NODE_ENV === "production") {
  return axios.create({
    baseURL: 'https://swipetuto-back-dev.herokuapp.com/api/v1/',
    headers: headersKeys
  });
  }
}

history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
