import axios from "axios"
import { baseURL } from '../services/configService'

export const getCards = () => {
  var config = { headers: { 'Content-Type': 'application/json' }, }

  return axios.get(`${baseURL}card/`, config)
  .then(rep => {
    return rep
  })
  .catch(function (err) {
    return err
  })
}
