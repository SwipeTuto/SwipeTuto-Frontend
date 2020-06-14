export const urlParams = url => {
  
  var queryString = url.search ? url.search.split('?')[1] : window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  var langage = urlParams.get('langage')
  var category = urlParams.get('category')


  return [langage,category]
}

