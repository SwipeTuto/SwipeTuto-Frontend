import { client } from "../index";


export const categorieList = () => {
  return client().get(`search/categorie/`).then(rep => {
    return rep
  }).catch(err => { return err })
}


export const tagList = () => {
  return client().get(`search/categorie/`).then(rep => {
    return rep
  }).catch(err => { return err })
}


export const topicList = () => {
  return client().get(`search/categorie/`).then(rep => {
    return rep
  }).catch(err => { return err })
}

