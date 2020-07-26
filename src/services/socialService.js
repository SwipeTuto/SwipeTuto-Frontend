import axios from "axios"
import { baseURL } from '../services/configService'
import { authHeader } from "../helper/auth-header";

export const toggleLike = (cardId) => {

  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader()
    }
  };

  return axios.get(`${baseURL}likes/toggle/${cardId}`, requestOptions)
    .then(rep => {
      return rep
    })
}

export const getLikers = (cardId) => {
  var config = { headers: { 'Content-Type': 'application/json' }, }

  return axios.get(`${baseURL}likes/get-likers/${cardId}`, config)
    .then(rep => {
      return rep
    })
}