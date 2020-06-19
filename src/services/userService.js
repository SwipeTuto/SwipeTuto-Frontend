import axios from "axios";

import { auth, provider, providerGit } from '../services/firebaseService';
import { baseURL } from '../services/configService'
import history from "../helper/history"



export const loginGoogle = () => {

  return auth().signInWithPopup(provider)
    .then(result => {
      var user = result.user;
      // getIdToken est une fonction de firebase qui renvoie le token pour identifier lae user dans les services firebase
      return user.getIdToken()
        .then(idToken => {
          login(idToken).then(rep => {
            history.push('/cards', history.location)
            history.go()
            return rep
          })
        })
        .catch(function (error) {
          console.log('errorGoogle', error)
        });
    })
}
export const loginGit = () => {

  auth().signInWithPopup(providerGit).then(function (result) {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}



export const login = idToken => {
  var data = { 'token_id': idToken }
  var config = { headers: { 'Content-Type': 'application/json' }, }

  return axios.post(`${baseURL}google-login/`, JSON.stringify(data), config)
    .then(rep => {
      localStorage.setItem('user', JSON.stringify(rep.data.user))
      localStorage.setItem('token', rep.data.token)
      return rep
    })
    .catch(function (err) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return err

    })
}



export const loginManuel = (username, password) => {
  var config = {
    headers: { 'Content-Type': 'application/json' },
  }
  return axios.post(`${baseURL}login/`, JSON.stringify({ username, password }), config)
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user.data.user))
      localStorage.setItem('token', JSON.stringify(user.data.token))
      return user;
    })
    .catch(function (err) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return err

    })
}

export const logout = () => {
  if (localStorage.getItem('user')) {
    localStorage.removeItem('user')
  }
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token')
  }
  return true
}

export const register = users => {
  const data = {
    username: users.username,
    first_name: users.firstname,
    last_name: users.lastname,
    password: users.password,
    email: users.email,

  }
  var config = {
    headers: { 'Content-Type': 'application/json' },
  }
  return axios.post(`${baseURL}create/`, JSON.stringify(data), config)
    .then(user => {
      console.log('user', user)
      localStorage.setItem('user', JSON.stringify(user.data))
      return user;
    });
}
