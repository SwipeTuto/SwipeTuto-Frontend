import React, { useEffect } from "react";
import { Switch, Route, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import HomePage from './pages/Homepage/HomePage';
import Login from './pages/Login/Login';
import SearchPage from './pages/SearchPage/SearchPage'
import RessourcesPage from './pages/RessourcesPage/RessourcesPage'
import NavTop from "./components/LayoutComponents/NavTop/NavTop";
import NavTopMobile from "./components/LayoutComponents/NavTop/NavTopMobile";
import Footer from "./components/LayoutComponents/Footer/Footer";
import PrivateRoute from "./PrivateRoute";
import { getCardsAction } from './redux/cards/cards-actions'



import { getCardAfterfilterAction, setType } from "./redux/filter/filter-actions"

import { getURLParams } from "./utils/index"

import './index.scss'

import './App.scss';




function App(props) {
  const dispatch = useDispatch();
  const [langage, category] = getURLParams(props)
  const getType = useSelector(state => state.filter.searchType)


  useEffect(() => {

    if (langage || category) {
      dispatch(setType('search'))
    }
    console.log(getType)
    if (getType === 'all') {
      dispatch(getCardsAction())
    } else {

      dispatch(getCardAfterfilterAction(langage, category))
    }
    return () => {

    }
  }, [getType]);

  return (
    <div className="App">
      {/* <NavTop /> */}
      <NavTopMobile />
      {/* <NavLeft /> */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/cards" component={SearchPage} />
        <Route path="/cards/:langage" component={SearchPage} />
        <Route exact path="/cards/:langage/:categorie" component={SearchPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/ressources" component={RessourcesPage} />
        {/* <PrivateRoute exact path="/login" component={Login} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
