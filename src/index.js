import React from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './redux/store';
import { authHeader } from "./helper/auth-header"
import useGoogleAnalytics from "./hooks/useGoogleAnalytics "
import { BrowserRouter } from 'react-router-dom'
import './index.scss';
import ReactGA from 'react-ga';
import history from "./helper/history"
// AXIOS SETTINGS
const headersKeys = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'authorization': authHeader()
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

// Initialize google analytics page view tracking
// history.listen(location => {
//   ReactGA.set({ page: location.pathname }); // Update the user's current page
//   ReactGA.pageview(location.pathname); // Record a pageview for the given page
// });

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
