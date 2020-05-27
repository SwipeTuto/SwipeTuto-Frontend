import axios from "axios";
import { auth, provider } from '../services/firebaseService';
import { baseURL } from '../services/configService'


export const loginGoogle = () => {
  return auth().signInWithPopup(provider)
    .then(result => {
      var user = result.user;
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
      sessionStorage.setItem('user', JSON.stringify(rep.data.user))
      sessionStorage.setItem('token', rep.data.token)
      console.log('1')
      return rep
     
    })
    .catch(function (err) {
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
      return err
    })
}
