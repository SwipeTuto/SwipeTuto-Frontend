export const getURLParams = props => {
  var langage = ''
  var category = '';
  var pathname = props.location.pathname;
  var params = pathname.split('/')
  if (params[2]) {
    let filter = params[2].split('_')
    console.log(filter)
    if (filter[0] != '') {
      langage = filter[0]
    } else if (filter[1]) {
      category = filter[1]
    }
  }
  if (params[3]) {
    langage = params[2]
    category = params[3].split('_')[1]
  }
  return [langage,category]
}
