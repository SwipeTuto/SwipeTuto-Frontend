import axios from "axios";
import { authHeader } from '../helper/auth-header';
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
            history.push('/', history.location)
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
    var token = result.credential.accessToken;
    var user = result.user;
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
}



export const login = idToken => {
  var data = { 'token_id': idToken }
  var config = { headers: { 'Content-Type': 'application/json' }, }

  return axios.post(`${baseURL}google-login/`, JSON.stringify(data), config)
    .then(rep => {
      console.log('rep', rep)
      localStorage.setItem('user', JSON.stringify(rep.data))

      return rep
    })
    .catch(function (err) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')

      return err
    })

}



export const loginManuel = (email, password) => {
  var config = {
    headers: { 'Content-Type': 'application/json' },
  }
  return axios.post(`${baseURL}login/`, { email, password }, config)
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user.data))

      return user;
    })
    .catch(function (err) {
      localStorage.removeItem('user')

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
      localStorage.setItem('user', JSON.stringify(user.data))
      return user;
    });
}



// update des infos user qui vient du component SettingsPage, sous forme d'objet
export const updateUserInfos = newUserInfos => {

  const data = {
    username: newUserInfos.username,
    first_name: newUserInfos.firstname,
    last_name: newUserInfos.lastname,
    profile: {
      description: newUserInfos.firstname
    },
    email: newUserInfos.email,
  }
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader()
    }
  };
  axios.patch(`${baseURL}me/`, JSON.stringify(data), requestOptions)
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user.data))
    });

}


// Récupérer user par son id
export const getUserById = id => {
  var config = {
    headers: { 'Content-Type': 'application/json' },
  }

  return new Promise((resolve, reject) => {
    axios.get(`${baseURL}user/${id}/`, config).then(rep => {
      resolve(rep)
      return rep
    }).catch((err) => { reject(err); return err })
  })
}
