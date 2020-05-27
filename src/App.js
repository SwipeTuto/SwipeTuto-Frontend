import React, { Fragment, useState, useEffect } from "react";
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/Homepage/HomePage';
import Login from './pages/Login/Login';
import SearchPage from './pages/SearchPage/SearchPage'
import CardPage from './pages/CardPage/CardPage'
import NavTop from "./components/NavTop/NavTop";
import NavLeft from "./components/NavLeft/NavLeft";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./PrivateRoute";

import './index.scss'

import './App.scss';


function App() {

  const [avatar, setAvatar] = useState('');
  const getAvatar = JSON.parse(sessionStorage.getItem('user'))

  useEffect(() => {
  
    getAvatar ? setAvatar(getAvatar.avatar) : setAvatar('')
    
  })


  const test2 = () => {
   
    console.log('getAvatar', getAvatar)
     setAvatar(getAvatar.avatar) 
     
  }

  console.log('avatarAPP', avatar)
  return (
    <div className="App">
      <NavTop
        avatar={avatar}
      />
      <NavLeft />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/card/:id" component={CardPage} />
        <Route exact path="/login" render={(props) => (<Login {...props} test2={test2} />)} />
        {/* <PrivateRoute exact path="/login" component={Login} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
