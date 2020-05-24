import axios from "axios";
import { auth, provider } from '../services/firebaseService';
import { baseURL } from '../services/configService'


export const loginGoogle = () => {
  auth().signInWithPopup(provider)
    .then(result => {
      var user = result.user;
      console.log('user', user)

      user.getIdToken()
        .then(idToken => {
          login(idToken)
        })
        .catch(function (error) {
          console.log('errorGoogle', error)
        });
    })
}

export const login = idToken => {
  var data = { 'token_id': idToken }
  var config = { headers: { 'Content-Type': 'application/json' }, }

  return axios.post(`${baseURL}google-login/`, JSON.stringify(data), config)
    .then(rep => {
      console.log('rep', rep)
    })
    .catch(function (err) {
      console.log('errLogin', err)
    })
}
