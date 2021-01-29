import { auth, provider, providerFacebook } from '../services/firebaseService';
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


export const FacebookLogin = (res) => {
  return res.user.getIdToken().then(rep => {
    var data2 = {
      'token_id': rep,
      'email': res.additionalUserInfo.profile.email,
    }
    return client().post(`facebook-login/`, JSON.stringify(data2)).then(rep => {

      localStorage.setItem('user', JSON.stringify(rep.data))
      return rep
    }).catch(function (err) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return err
    })

  })
}

export const LoginProviderFacebook = () => {
  return auth().signInWithPopup(providerFacebook).then(result => {
    return result
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
    settings: newUserInfos?.settings
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

  return client().get(`get-favorie/${userId}/`).then(rep => {
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

export const updatePrefService = (topicName, queryName) => {
  const data = {
    "category_preference": [
    {
    "name": topicName,
    "topic": queryName
  }
    ]
  }
  console.log(data)

  return client().patch(`update/preference/`, JSON.stringify(data)).then(rep => {
    return rep
  }).catch(err => { return err })
}
