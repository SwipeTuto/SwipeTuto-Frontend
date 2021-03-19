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
  var data = { "text": comment }
  return client().post(`card/add/comment/${cardId}/`, data).then(rep => {
    return rep
  })
}


export const addReply = (commentId, comment) => {
  var data = { "text": comment }
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
  return axios.get(url, config).then(rep => {
    return rep
  })
}


export const getCardComments = cardId => {
  return client().get(`card/list/comment/${cardId}/`).then(rep => {
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
  return client().delete(`card/manage/comment/${commentId}/`).then(rep => {
    return rep
  })
}


export const modifyComment = (commentId, newComment) => {
  var data = { "text": newComment }
  return client().patch(`card/manage/comment/${commentId}/`, data).then(rep => {
    return rep
  })
}


// PAS MODIFIER AVEC LA NOUVELLE CONFIG DE AXIOS !!!!!!!
export const getCardCommentsOtherPage = (url) => {
  var config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return axios.get(`${url}`, config).then(rep => {
    return rep
  })
}


export const toggleFollowByUserID = (userIDtoFollow) => {
  var config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return client().get(`toggle/${userIDtoFollow}/`, config).then(rep => {
    return rep
  }).catch(err => err)
}

export const getUserFollowersList = (userID) => {
  var config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return client().get(`list-followers/${userID}/`, config).then(rep => {
    return rep
  }).catch(err => err)
}
export const getUserFollowingsList = (userID) => {
  console.log('call get followings list')
  var config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return client().get(`list-following/${userID}/`, config).then(rep => {
    return rep
  }).catch(err => err)
}