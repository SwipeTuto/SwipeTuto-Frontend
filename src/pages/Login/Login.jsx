// Présent dans App.js dans une Route ("/")

import React, { Fragment } from "react";
import { auth } from '../../services/firebaseService';
import CustomButton from "../../components/CustomButton/CustomButton";
import axios from 'axios'



const LoginPage = () => {

  const provider = new auth.GoogleAuthProvider();

  const handleClick = async (e) => {

    await auth().signInWithPopup(provider).then(function (result) {
      // fireBase Token
      var token = result.credential.idToken;
      var user = result.user;
      user.getIdToken()
        .then(
          function (idToken) {
            var data = { 'token_id': idToken }
            var config = {
              headers: { 'Content-Type': 'application/json' },
            }
        
            return axios.post("http://localhost:8000/api/v1/google-login/", JSON.stringify(data), config)
              .then(rep => {
                console.log('rep', rep)
                return rep;
              });


          }).catch(function (err) {
            console.log('err', err.message)
            console.log('err', err.response)
            console.log('err', err.data)


          })
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });

  }
  const handleClick2 = (e) => {
    console.log("ok")
    auth().signOut();
  }

  return (
    <Fragment>
      <h1>Login page</h1>
      <CustomButton
        onClick={e => handleClick(e)}
        color="dark">
        SingnUp with Google
          </CustomButton>
      <CustomButton
        onClick={e => handleClick2(e)}
        color="dark">
        logout
          </CustomButton>

    </Fragment>
  )


}
export default LoginPage;
