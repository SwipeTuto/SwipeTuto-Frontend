import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './redux/store';
import axios from "axios";
import { authHeader } from "./helper/auth-header"

import { BrowserRouter } from 'react-router-dom'

import './index.scss';

// AXIOS SETTINGS
const headersKeys = {
  'Content-Type': 'application/json',
  'Authorization': authHeader()
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


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
