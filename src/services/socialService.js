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

export const toggleCommentLike = (commentId) => {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader()
    }
  };

  // return axios.get(`${baseURL}likes/toggle/${cardId}`, requestOptions)
  //   .then(rep => {
  //     return rep
  //   })
}

export const getLikers = (cardId) => {
  var config = { headers: { 'Content-Type': 'application/json' }, }

  return axios.get(`${baseURL}likes/get-likers/${cardId}/`, config)
    .then(rep => {
      return rep
    })
}



export const addComment = (cardId, comment) => {
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader()
    }
  }
  return axios
    .post(`${baseURL}card/add_comment/${cardId}/`,
      { "text": comment }
      , config)
    .then(rep => {
      return rep
    })
}

export const getCardComments = (cardId) => {
  var config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return axios
    .get(`${baseURL}card/list_comment/${cardId}/`
      , config)
    .then(rep => {
      return rep
    })
}

export const deleteComment = (commentId) => {
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader()
    }
  }
  return axios
    .delete(`${baseURL}card/get_comment/${commentId}/`
      , config)
    .then(rep => {
      return rep
    })
}

export const modifyComment = (commentId, newComment) => {
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader()
    }
  }
  return axios
    .patch(`${baseURL}card/get_comment/${commentId}/`,
      { "text": newComment },
      config)
    .then(rep => {
      return rep
    })
}


export const getCardCommentsOtherPage = (url) => {
  var config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return axios
    .get(`${url}`
      , config)
    .then(rep => {
      return rep
    })
}

