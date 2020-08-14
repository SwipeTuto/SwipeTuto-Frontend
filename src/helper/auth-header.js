export function authHeader() {
  
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
      return  'Token ' + user.token ;
  } else {
      return {};
  }
}