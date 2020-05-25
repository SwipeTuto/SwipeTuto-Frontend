import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/Homepage/HomePage';
import Login from './pages/Login/Login';
import SearchPage from './pages/SearchPage/SearchPage'
import CardPage from './pages/CardPage/CardPage'
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
      <NavLeft />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/card/:id" component={CardPage} />
        <Route exact path="/login" component={Login} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
