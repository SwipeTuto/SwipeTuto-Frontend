import axios from "axios";
import React, { useEffect } from "react";
import { auth, provider } from '../services/firebaseService';
import { baseURL } from '../services/configService'




export const loginGoogle = () => {
 
  return auth().signInWithPopup(provider)
    .then(result => {
      var user = result.user;
      // getIdToken est une fonction de firebase qui renvoie le token pour identifier le user dans les services firebase
      return user.getIdToken()
        .then(idToken => {
        
          login(idToken).then(rep => {
         
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
