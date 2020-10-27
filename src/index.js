import React from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './redux/store';

import { BrowserRouter } from 'react-router-dom'
import './index.scss';

// AXIOS SETTINGS
const headersKeys = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
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
// ReactGA.initialize('G-7VHW5BHZYQ');
// ReactGA.pageview(window.location.pathname + window.location.search);
// console.log(window.location.pathname)
// history.listen(rep => {
//   console.log(rep)
// })
// history.listen(location => {
//   console.log(location.pathname)
//   ReactGA.set({ page: location.pathname }); // Update the user's current page
//   ReactGA.pageview(location.pathname); // Record a pageview for the given page
// });


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
