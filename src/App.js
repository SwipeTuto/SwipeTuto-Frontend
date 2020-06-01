import React, { Fragment, useState, useEffect } from "react";
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import HomePage from './pages/Homepage/HomePage';
import Login from './pages/Login/Login';
import SearchPage from './pages/SearchPage/SearchPage'
import RessourcesPage from './pages/RessourcesPage/RessourcesPage'
import NavTop from "./components/LayoutComponents/NavTop/NavTop";
import NavLeft from "./components/LayoutComponents/NavLeft/NavLeft";
import Footer from "./components/LayoutComponents/Footer/Footer";
import PrivateRoute from "./PrivateRoute";


import './index.scss'

import './App.scss';



function App() {



  return (
    <div className="App">
      <NavTop />
      {/* <NavLeft /> */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/cards" component={SearchPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/ressources" component={RessourcesPage} />
        {/* <PrivateRoute exact path="/login" component={Login} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
