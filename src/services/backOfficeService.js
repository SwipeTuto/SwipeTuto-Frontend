import axios from "axios"
import { baseURL } from '../services/configService'

export const sendEmailContact = data => {

  const bodyFormData = new FormData();
  bodyFormData.append('email', data.email);
  bodyFormData.append('categories', data.category);
  bodyFormData.append('message', data.description);

  var config = { headers: {'Content-Type':'multipart/form-data'}}
  return axios.post(`${baseURL}backoffice/contact/`, bodyFormData , config).then(
    rep => {
      console.log(rep)
      return rep
    }).catch(err => {
      console.log(err)
      return err
    })

}
