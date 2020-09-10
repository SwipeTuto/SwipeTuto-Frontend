import axios from "axios";
import { authHeader } from '../helper/auth-header';
import { auth, provider, providerGit } from '../services/firebaseService';
import { baseURL } from '../services/configService'
import history from "../helper/history"
import { updateUserInfosSuccess } from "../redux/user/user-actions";



export const loginGoogle = () => {

  return auth().signInWithPopup(provider)
    .then(result => {
      var user = result.user;
      console.log(resultit)
      return user.getIdToken()
        .then(idToken => {
          login(idToken)
            .then(rep => {
              // history.push('/', history.location)
              // history.go()
              return rep
            })
        })
    })
}


export const loginGit = () => {
  auth().signInWithPopup(providerGit)
  .then(result => {
    var user = result.user;
    const emailConst = result.additionalUserInfo
    console.log(emailConst)
    return user.getIdToken()
      .then(idToken => {
   
        Gitlogin(idToken,emailConst)
          .then(rep => {
            // history.push('/', history.location)
            // history.go()
            return rep
          })
      })
  })
}



export const login = idToken => {
  var data = { 'token_id': idToken }
  var config = { headers: { 'Content-Type': 'application/json' }, }

  return axios.post(`${baseURL}google-login/`, JSON.stringify(data), config)
    .then(rep => {
      localStorage.setItem('user', JSON.stringify(rep.data))

      return rep
    })
    .catch(function (err) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')

      return err
    })

}
export const Gitlogin = (idToken,emailConst) => {
  var data = { 
    'token_id': idToken,
    'emailConst': emailConst,
  }
  var config = { headers: { 'Content-Type': 'application/json' }, }

  return axios.post(`${baseURL}google-login/`, JSON.stringify(data), config)
    .then(rep => {
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
  // .catch(function (err) {
  //   localStorage.removeItem('user')

  //   return err

  // })
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
    first_name: newUserInfos.first_name,
    last_name: newUserInfos.last_name,
    profile: {
      description: newUserInfos.description
    },
    email: newUserInfos.email,
  }
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader()
    }
  };
  return axios.patch(`${baseURL}me/`, JSON.stringify(data), requestOptions)
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user.data))
      return user
    });
}


// Récupérer user par son id
export const getUserById = id => {
  var config = {
    headers: { 'Content-Type': 'application/json' },
  }

  return axios.get(`${baseURL}user/${id}/`, config).then(rep => {
    return rep
  })

}
