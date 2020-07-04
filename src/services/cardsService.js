import axios from "axios"
import { baseURL } from '../services/configService'
import store from '../redux/store'


export const getCards = () => {
  var config = {
    headers: {
      'Content-Type': 'application/json'
    },
  }

  return axios.get(`${baseURL}card/`, config)
    .then(rep => {

      return rep
    })
    .catch(function (err) {
      return err
    })
}

export const getCardAfterfilter = (lan) => {
  console.log('langage', lan)
  
  // const state = store.getState();

  var config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return axios
    // .get(`${baseURL}card/filter/?langage=${langage}&category=${langage}`, config)
    .get(`${baseURL}card/filter/`, {params: lan}, config)
    .then(rep => {
      return rep
    })
}
export const getCardsByUser = username => {
  var config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return axios
    .get(`${baseURL}card/user/${username}/`, config)
    .then(rep => {
      return rep
    })
}

export const getOtherPageCard = (linkToFetch) => {
  var config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios
    .get(linkToFetch, config)
    .then((rep) => {
      console.log(rep);
      return rep;
    })
    .catch(function (err) {
      console.log(err);
      return err;
    });
};