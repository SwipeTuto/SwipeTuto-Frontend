import axios from "axios"
import { baseURL } from '../services/configService'





export const getCards = () => {
  var config = {
    headers: {
      'Content-Type': 'application/json'
    },
  }

  return axios.get(`${baseURL}card/list`, config)
    .then(rep => {
      return rep
    })
    .catch(function (err) {
      return err
    })
}


export const getCardById = cardId => {
  var config = {
    headers: {
      'Content-Type': 'application/json'
    },
  }

  return axios.get(`${baseURL}card/list/${cardId}`, config)
    .then(rep => {
      return rep
    })
    .catch(function (err) {
      return err
    })
}

export const getCardAfterfilter = (search) => {
  var config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return axios
    .get(`${baseURL}card/filter/`, {
      params: {
        'topic': search.searchTopic,
        'category': search.searchCategory,
        'search': search.searchWords,
        'order': search.searchOrder,
        'page': search.searchPage
      }
    },
      config)
    .then(rep => {
      return rep
    })
}

export const getCardsByUser = userid => {
  var config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return axios
    .get(`${baseURL}card/user/${userid}/`, config)
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
      return rep;
    })
    .catch(function (err) {
      return err;
    });
};