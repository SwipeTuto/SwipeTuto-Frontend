import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/Homepage/HomePage'
import SearchPage from './pages/SearchPage/SearchPage'
import NavTop from "./components/NavTop/NavTop";
import NavLeft from "./components/NavLeft/NavLeft";

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
      </Switch>
    </div>
  );
}

export default App;
