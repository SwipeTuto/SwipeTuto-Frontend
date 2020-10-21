import { client } from "../index";
import axios from "axios";

export const toggleLike = cardId => {
  return client().get(`likes/toggle/${cardId}/`).then(rep => {
    return rep
  })
}


export const toggleCommentLike = commentId => {
  return client().get(`likes/toggle-comment/${commentId}/`).then(rep => {
    return rep
  })
}


export const toggleSave = cardId => {
  return client().get(`toggle-favorie/${cardId}/`).then(rep => {
    return rep
  })
}


export const getLikers = cardId => {
  return client().get(`likes/get-likers/${cardId}/`).then(rep => {
    return rep
  })
}


export const addComment = (cardId, comment) => {
  var data = {"text": comment }
  return client().post(`card/add_comment/${cardId}/`, data).then(rep => {
    return rep
  })
}


export const addReply = (commentId, comment) => {
  var data = {"text": comment }
  return client().post(`card/add_reply_comment/${commentId}/`, data).then(rep => {
    return rep
  })
}


export const getReplies = commentId => {
  return client().get(`card/list_reply_comment/${commentId}/`).then(rep => {
    return rep
  })
}


// PAS MODIFIER AVEC LA NOUVELLE CONFIG DE AXIOS !!!!!!!
export const getNextReplies = url => {
  var config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return axios.get( url, config).then(rep => {
    return rep
  })
}


export const getCardComments = cardId => {
  return client().get(`card/list_comment/${cardId}/`).then(rep => {
    return rep
  })
}


// PAS MODIFIER AVEC LA NOUVELLE CONFIG DE AXIOS !!!!!!!
export const getCardCommentsNext = url => {
  var config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return axios
    .get(url
      , config)
    .then(rep => {

      return rep
    })
}


export const deleteComment = commentId => {
  return client().delete(`card/manage_comment/${commentId}/`).then(rep => {
    return rep
  })
}


export const modifyComment = (commentId, newComment) => {
  var data = { "text": newComment }
  return client().patch(`card/manage_comment/${commentId}/`, data).then(rep => {
    return rep
  })
}


// PAS MODIFIER AVEC LA NOUVELLE CONFIG DE AXIOS !!!!!!!
export const getCardCommentsOtherPage = (url) => {
  console.log(url)
  var config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return axios.get(`${url}`, config).then(rep => {
      return rep
    })
}

