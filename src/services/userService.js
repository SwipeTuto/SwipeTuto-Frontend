import { auth, provider, providerGit } from '../services/firebaseService';
import { client } from "../index"


export const login = idToken => {
  var data = { 'token_id': idToken }

  return client().post(`google-login/`, JSON.stringify(data)).then(rep => {
      localStorage.setItem('user', JSON.stringify(rep.data))
      return rep
    }).catch(function (err) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return err
    })
}


export const loginGoogle = () => {
  return auth().signInWithPopup(provider).then(result => {
      var user = result.user;
      return user.getIdToken()
  })
}


export const Gitlogin = (idToken, profile) => {
  var data = {
    'token_id': idToken,
    'profile': profile,
  }

  return client().post(`github-login/`, JSON.stringify(data)).then(rep => {
      localStorage.setItem('user', JSON.stringify(rep.data))
      return rep
  }).catch(function (err) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return err
  })
}


export const loginGit = () => {
  auth().signInWithPopup(providerGit).then(result => {
      var user = result.user;
      const profile = result.additionalUserInfo.profile
      return user.getIdToken().then(idToken => {
          Gitlogin(idToken, profile).then(rep => {
              return rep
          })
      })
  })
}


export const loginManuel = (email, password) => {
  var data = { email, password }

  return client().post(`login/`, data).then(user => {
    localStorage.setItem('user', JSON.stringify(user.data))
    return user;
  }).catch(function (err) {
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

  return client().post(`create/`, JSON.stringify(data)).then(user => {
    localStorage.setItem('user', JSON.stringify(user.data));
    return user;
  });
}


// update des infos user qui vient du component SettingsPage, sous forme d'objet
export const updateUserInfos = newUserInfos => {
  const data = {
    username: newUserInfos.username,
    first_name: newUserInfos.first_name,
    last_name: newUserInfos.last_name,
    email: newUserInfos.email,
    profile: {
      description: newUserInfos.profile && newUserInfos.profile.description
    },
  }

  return client().patch(`me/`, JSON.stringify(data)).then(user => {
    localStorage.setItem('user', JSON.stringify(user.data))
    return user
  });
}


// Récupérer user par son id
export const getUserById = id => {

  return client().get(`user/${id}/`).then(rep => {
    return rep
  })
}

export const upDateAvatar = avatar => {

  return client().put(`avatar/`, avatar).then(rep => {
    return rep
  })
}


export const getUserFavoriesById = userId => {

  return client().get(`}get-favorie/${userId}/`).then(rep => {
    return rep
  })
}


export const signalContent = signal => {
  const data = {
    reason: signal.reason,
    message: signal.description,
    id_user: 1,
    id_card: signal.id_card ? signal.id_card : null,
    id_comment: signal.id_comment,
  }

  return client().post(`backoffice/signalement/`, JSON.stringify(data)).then(rep => {
    return rep
  }).catch(err => { return err })
}



// export const login = idToken => {
//   var data = { 'token_id': idToken }
//   var config = { headers: { 'Content-Type': 'application/json' }, }

//   return axios.post(`${baseURL}google-login/`, JSON.stringify(data), config)
//     .then(rep => {
//       localStorage.setItem('user', JSON.stringify(rep.data))
//       return rep
//     })
//     .catch(function (err) {
//       localStorage.removeItem('user')
//       localStorage.removeItem('token')
//       return err
//     })
// }


// export const loginGoogle = () => {
//   return auth().signInWithPopup(provider)
//     .then(result => {
//       var user = result.user;
//       return user.getIdToken()
//     })
// }

// export const Gitlogin = (idToken, profile) => {

//   var data = {
//     'token_id': idToken,
//     'profile': profile,
//   }
//   var config = { headers: { 'Content-Type': 'application/json' }, }

//   return axios.post(`${baseURL}github-login/`, JSON.stringify(data), config)
//     .then(rep => {
//       localStorage.setItem('user', JSON.stringify(rep.data))

//       return rep
//     })
//     .catch(function (err) {
//       localStorage.removeItem('user')
//       localStorage.removeItem('token')

//       return err
//     })

// }


// export const loginGit = () => {
//   auth().signInWithPopup(providerGit)
//     .then(result => {
//       var user = result.user;
//       const profile = result.additionalUserInfo.profile
//       return user.getIdToken()
//         .then(idToken => {

//           Gitlogin(idToken, profile)
//             .then(rep => {
//               return rep
//             })
//         })
//     })
// }







// export const loginManuel = (email, password) => {
//   var config = {
//     headers: { 'Content-Type': 'application/json' },
//   }
//   return axios.post(`${baseURL}login/`, { email, password }, config)
//     .then(user => {
//       localStorage.setItem('user', JSON.stringify(user.data))
//       return user;
//     })
//     .catch(function (err) {
//       localStorage.removeItem('user')
//       return err

//     })
// }

// export const logout = () => {
//   if (localStorage.getItem('user')) {
//     localStorage.removeItem('user')
//   }
//   if (localStorage.getItem('token')) {
//     localStorage.removeItem('token')
//   }
//   return true
// }

// export const register = users => {
//   const data = {
//     username: users.username,
//     first_name: users.firstname,
//     last_name: users.lastname,
//     password: users.password,
//     email: users.email,
//   }
//   var config = {
//     headers: { 'Content-Type': 'application/json' },
//   }
//   return axios.post(`${baseURL}create/`, JSON.stringify(data), config)
//     .then(user => {
//       localStorage.setItem('user', JSON.stringify(user.data))
//       return user;
//     });
// }



// // update des infos user qui vient du component SettingsPage, sous forme d'objet
// export const updateUserInfos = newUserInfos => {

//   const data = {
//     username: newUserInfos.username,
//     first_name: newUserInfos.first_name,
//     last_name: newUserInfos.last_name,
//     profile: {
//       description: newUserInfos.profile && newUserInfos.profile.description
//     },
//     email: newUserInfos.email,
//   }

//   return client().patch(`me/`, JSON.stringify(data))
//     .then(user => {
//       localStorage.setItem('user', JSON.stringify(user.data))
//       return user
//     });
// }


// // Récupérer user par son id
// export const getUserById = id => {
//   var config = {
//     headers: { 'Content-Type': 'application/json' },
//   }

//   return axios.get(`${baseURL}user/${id}/`, config).then(rep => {
//     return rep
//   })

// }

// export const upDateAvatar = avatar => {

//   const requestOptions = {
//     headers: {
//       'Content-Type': "multipart/form-data",
//       'Authorization': authHeader()
//     }
//   };

//   return axios.put(`${baseURL}avatar/`, avatar, requestOptions).then(rep => {
//     return rep
//   })
// }


// export const getUserFavoriesById = userId => {
//   var config = {
//     headers: { 'Content-Type': 'application/json' },
//     'Authorization': authHeader()
//   }

//   return axios.get(`${baseURL}get-favorie/${userId}/`, config).then(rep => {
//     return rep
//   })

// }

// export const signalContent = signal => {
//   console.log(signal)
//   var config = {
//     headers: { 'Content-Type': 'application/json' },
//   }
//   const data = {
//     reason: signal.reason,
//     message: signal.description,
//     id_user: 1,
//     id_card: signal.id_card ? signal.id_card : null,
//     id_comment: signal.id_comment,
//   }

//   return axios.post(`${baseURL}backoffice/signalement/`, JSON.stringify(data) , config).then(rep => {
//     console.log(rep)
//     // return rep
//   }).catch(err => {
//   console.log(err)
//   })

// }


