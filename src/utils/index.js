export const splitURL = location => {
  const params = location.pathname.split('/')
console.log(params)
  var params1 = ''
  var params2 = ''


  if (  params[2] && !params[3] ) {
      params1 = params[2]
      } 
  if (params[3]) {
   
    params1 = params[2]
    params2 = params[3]
  }
  return [params1,params2]
}

