import axios from "axios"
import { baseURL } from '../services/configService'



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

export const getCardAfterfilter = (topic, category) => {



  var config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return axios
    .get(`${baseURL}card/filter/?topic=${topic}&category=${category}&ordering=created`,
      config)
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