import axios from "axios"
import { client } from "../index";

export const getCardById = cardId => {
  return client().get(`card/list/${cardId}/`).then(rep => {
    return rep
  }).catch(err => { return err })
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

  return client().get("card/filter/", data).then(rep => {
    return rep
  }).catch(err => { return err })
}


export const getCardsByUser = (userid, cardState) => {
  return client().get(`card/user/${userid}${cardState === 0 ? "?state=0" : cardState === 2 ? "?state=2" : ''}`).then(rep => {
    return rep
  }).catch(err => { return err })
}


// PAS MODIFIER AVEC LA NOUVELLE CONFIG DE AXIOS !!!!!!!
export const getOtherPageCard = linkToFetch => {
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


export const createCardService = (cardObject) => {
  var formData = new FormData();
  formData.append("user", cardObject.user);
  formData.append("topic", cardObject.topic);
  formData.append("name", cardObject.name);
  formData.append("state", cardObject.state);
  cardObject.image.map(rep => {
    formData.append("image", rep.source);
    return rep
  })

  formData.append("description", cardObject.description);
  formData.append("categorie", cardObject.categorie);

  return client().post("card/create_card/", formData).then(rep => {

    return rep
  }).catch(err => {
    console.error(err)
    return err
  })
}

export const deleteCardService = (cardId) => {
  return client().delete(`card/list/${cardId}/`).then(rep => {
    return rep
  }).catch(err => {
    return err
  })
};

export const updateCardService = (cardId, updateObj) => {

  console.log(updateObj)

  var formData = new FormData();
  updateObj.user && formData.append("user", updateObj.user);
  updateObj.topic && formData.append("topic", updateObj.topic);
  updateObj.name && formData.append("name", updateObj.name);
  updateObj.state && formData.append("state", updateObj.state);
  updateObj.image && updateObj.image.map(rep => {
    formData.append("image", rep.source);
    return rep
  })

  updateObj.description && formData.append("description", updateObj.description);
  updateObj.categorie && formData.append("categorie", updateObj.categorie);

  console.log(formData)

  return client().patch(`card/update_card/${cardId}`, formData).then(rep => {
    console.log(rep)
    return rep
  }).catch(err => {
    console.log(err)
    return err
  })
};



