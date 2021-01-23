import { client } from "../index";
import history from "../helper/history"

export const sendEmailContact = data => {
  const bodyFormData = new FormData();
  bodyFormData.append('email', data.email);
  bodyFormData.append('categories', data.category);
  bodyFormData.append('message', data.description);

  var config = { headers: {'Content-Type':'multipart/form-data'}}

  return client().post(`backoffice/contact/`, bodyFormData , config).then(rep => {
    history.push('/contact', history.location)
    history.go()
    console.log('document',document.cookie)
  }).catch(err => {return err})
}
