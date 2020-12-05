// import { database } from "faker";
import { client } from "../index";
// import history from "../helper/history"

export const sendEmailContact = data => {
  // console.log('data', data)
  const bodyFormData = new FormData();
  bodyFormData.append('email', data.email);
  bodyFormData.append('categories', data.category);
  bodyFormData.append('message', data.description);

  var config = { headers: { 'Content-Type': 'multipart/form-data' } }

  return client().post(`backoffice/contact/`, bodyFormData, config).then(rep => {
    return rep

  }).catch(err => {
    console.log(err.message)
    return err
  })
}
