import axios from "axios"
import {
  baseURL
} from '../services/configService'

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

export const getCardAfterfilter = (langage, category) => {
  var config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return axios
    .get(`${baseURL}card/filter/?langage=${langage}&category=${category}`,
      config)
    .then(rep => {
      return rep
    })
}
