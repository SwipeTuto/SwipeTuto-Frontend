export const urlParams = url => {
  var queryString = url.search ? url.search.split('?')[1] : window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var topic = urlParams.get('topic')
  var category = urlParams.get('category')
  var ordering = urlParams.get('order')
  var search = urlParams.get('search')
  var page = urlParams.get('page')
  var card_id = urlParams.get('card_id');
  var user_id = urlParams.get('user_id');
  return [topic, category, ordering, search, page, card_id, user_id]
}

export const getUrlId = (url, query) => {
  return url && parseInt(url.split(`${query}=`)[1]);
}