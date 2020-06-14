import React, { useEffect } from "react";
import { Switch, Route, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HomePage from './pages/Homepage/HomePage';
import Login from './pages/Login/Login';
import SearchPage from './pages/SearchPage/SearchPage'
import RessourcesPage from './pages/RessourcesPage/RessourcesPage'

import NavTop from "./components/LayoutComponents/NavTop/NavTop";
import Footer from "./components/LayoutComponents/Footer/Footer";

import { getCardsAction } from './redux/cards/cards-actions'
import { getCardAfterfilterAction } from "./redux/filter/filter-actions"
 
import { urlParams } from "./utils/index"

import './index.scss'
import './App.scss';




function App(props) {


  const dispatch = useDispatch();

  const [langage, category] = urlParams(props.location)

  useEffect(() => {
    langage  || category ? 
      dispatch(getCardAfterfilterAction(langage,category)) 
      :
      dispatch(getCardsAction())
  }, [category,langage]);

  return (
    <div className="App">
      <NavTop />
      {/* <NavLeft /> */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/cards" component={SearchPage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/ressources" component={RessourcesPage} />
        {/* <PrivateRoute exact path="/login" component={Login} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
