import axios from "axios";
import { auth, provider } from '../services/firebaseService';
import { baseURL } from '../services/configService'


export const loginGoogle = () => {
  return auth().signInWithPopup(provider)
    .then(result => {
      console.log(result)
      var user = result.user;
      // getIdToken est une fonction de firebase qui renvoie le token pour identifier le user dans les services firebase
      return user.getIdToken()
        .then(idToken => {
          var user = '';
          login(idToken).then(rep => {
            console.log('2')
            return rep
          })
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
      // aller dans devTools : Application : Session Storage pour voir user et token stockés ici
      sessionStorage.setItem('user', JSON.stringify(rep.data.user))
      sessionStorage.setItem('token', rep.data.token)
  
      return rep
     
    })
    .catch(function (err) {
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
      return err
    })
}
