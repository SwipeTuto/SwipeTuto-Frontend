import axios from "axios"
import { baseURL } from '../services/configService'
import { client } from "../index";

// export const getCards = () => {
//   var config = {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   }
//   console.log("call")

//   return axios.get(`${baseURL}card/list`, config)
//     .then(rep => {
//       return rep
//     })
//     .catch(function (err) {
//       return err
//     })
// }


export const getCardById = cardId => {
  return client().get(`card/list/${cardId}/`).then(rep => {
    return rep
  }).catch(err => {return err})
}


export const getCardAfterfilter = search => {
  var data = {
    params: {
      'topic': search.searchTopic,
      'category': search.searchCategory,
      'search': search.searchWords,
      'order': search.searchOrder,
      'page': 1
    }
  }
  
  return client().get(`card/filter/`, data).then(rep => {
    return rep
  }).catch(err => {return err})
}


export const getCardsByUser = userid => {
  return client().get(`card/user/${userid}/`).then(rep => {
    return rep
  }).catch(err => {return err})
}

// PAS MODIFIER AVEC LA NOUVELLE CONFIG DE AXIOS !!!!!!!
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