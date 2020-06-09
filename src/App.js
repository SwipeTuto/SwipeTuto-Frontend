import React, { useEffect } from "react";
import { Switch, Route, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import HomePage from './pages/Homepage/HomePage';
import Login from './pages/Login/Login';
import SearchPage from './pages/SearchPage/SearchPage'
import RessourcesPage from './pages/RessourcesPage/RessourcesPage'
import NavTop from "./components/LayoutComponents/NavTop/NavTop";
import Footer from "./components/LayoutComponents/Footer/Footer";
import PrivateRoute from "./PrivateRoute";
import { getCardsAction } from './redux/cards/cards-actions'

import { getCardAfterfilterAction } from "./redux/filter/filter-actions"


import './index.scss'

import './App.scss';




function App(props) {
  var langage = ''
  var category = '';

  const getURLParams = props => {
    var pathname = props.location.pathname;
    var params = pathname.split('/')
  
    if(params[3]) {
      langage = params[2]
      category = params[3]
    }
  console.log(params)
  }

  // const langage = pro
  // const category = useSelector(state => state.filter.categoryFilter)
  const dispatch = useDispatch();

  useEffect(() => {
    getURLParams(props)
    console.log('langage',langage)
    console.log('category', category)
    // if (langage && category) {
      dispatch(getCardAfterfilterAction(langage,category)); 
    // } else {
      // dispatch(getCardsAction())
    // }
    
  });

  return (
    <div className="App">
      <NavTop params={props.location.pathname}/>
      {/* <NavLeft /> */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/cards" component={SearchPage} />
        <Route  path="/cards/:langage" component={SearchPage} />
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
