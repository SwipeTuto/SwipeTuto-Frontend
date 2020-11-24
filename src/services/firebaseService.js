import firebase from 'firebase/app';
import "firebase/auth";

// Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh5k4llmNOav5gvCidYYYi2yIdUdmb3Os",
  authDomain: "memo-53937.firebaseapp.com",
  databaseURL: "https://memo-53937.firebaseio.com",
  projectId: "memo-53937",
  storageBucket: "memo-53937.appspot.com",
  messagingSenderId: "755676020460",
  appId: "1:755676020460:web:9d51efa2dcf34976de2fc9"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const provider = new firebase.auth.GoogleAuthProvider();
export const providerFacebook  = new firebase.auth.FacebookAuthProvider();
// providerFacebook.addScope('email');
// providerFacebook.setCustomParameters({
//   // 'display': 'redirect'
//   'display': 'popup'
// })
export const auth = firebase.auth;

