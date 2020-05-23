// Présent dans App.js dans une Route ("/")

import React, { Fragment } from "react";
import { auth } from '../../services/firebaseService';
import CustomButton from "../../components/CustomButton/CustomButton";



const LoginPage = () => {

  const provider = new auth.GoogleAuthProvider();

  const handleClick = e => {

    auth().signInWithPopup(provider).then(function (result) {
      // fireBase Token
      var token = result.credential.idToken;
      console.log('token', token)
      console.log('token', result.credential)
      var user = result.user;
      console.log('user', user)
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });

  }

  return (
    <Fragment>
      <h1>Login page</h1>
      <CustomButton
        onClick={e => handleClick(e)}
        color="dark">
        SingnUp with Google
          </CustomButton>

    </Fragment>
  )


}
export default LoginPage;
