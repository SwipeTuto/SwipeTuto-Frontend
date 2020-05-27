import axios from "axios"
import { baseURL } from '../services/configService'

export const categorieList = () => {
  var config = { headers: { 'Content-Type': 'application/json' }, }

  return axios.get(`${baseURL}search/categorie/`, config)
  .then(rep => {
    return rep
  })
  .catch(function (err) {
    return err
  })
}

export const tagList = () => {
  var config = { headers: { 'Content-Type': 'application/json' }, }

  return axios.get(`${baseURL}search/categorie/`, config)
  .then(rep => {
    return rep
  })
  .catch(function (err) {
    return err
  })
}

export const langageList = () => {
  var config = { headers: { 'Content-Type': 'application/json' }, }

  return axios.get(`${baseURL}search/categorie/`, config)
    .then(rep => {
      return rep
    })
    .catch(function (err) {
      return err
    })
}