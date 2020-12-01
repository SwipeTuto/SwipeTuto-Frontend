import { database } from "faker";
import { client } from "../index";
// import history from "../helper/history"

export const sendEmailContact = data => {
  console.log('data', data)
  const bodyFormData = new FormData();
  bodyFormData.append('email', data.email);
  bodyFormData.append('categories', data.category);
  bodyFormData.append('message', data.description);

  var config = { headers: { 'Content-Type': 'multipart/form-data' } }

  // const data2 = {
  //   email:  data.email,
  //   categories: database.category,
  //   message: data.description,
  // }

  // return client().post(`backoffice/contact/`,  JSON.stringify(data2)).then(rep => {
  return client().post(`backoffice/contact/`, bodyFormData, config).then(rep => {
    return rep
    // history.push('/contact', history.location)
    // history.go()
  }).catch(err => { 
    console.log(err.message)
    return err 
  })
}
