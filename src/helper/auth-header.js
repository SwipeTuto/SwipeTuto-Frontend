
import axios from "axios";

export function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return axios.defaults.headers.common['Authorization'] = `Token ${user.token}`;
      // return  'Token ' + user.token ;
  } else {
    delete axios.defaults.headers.common['Authorization'];
      // return {};
  }
}