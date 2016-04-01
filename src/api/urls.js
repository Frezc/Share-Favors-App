
// const HOST = '//192.168.2.236';
const HOST = 'http://sharefavors.com'

export const AUTH_URL = HOST + '/auth';
export const REGISTER_URL = HOST + '/register';

export const SENDEMAIL_URL = HOST + '/sendVerifiedEmail';
export function sendEmailUrl(email) {
  return `${SENDEMAIL_URL}?email=${email}`
}

export const USERINFO_URL = HOST + '/user';
export function userInfoUrl(id, starListMax = 3, repositoriesMax = 3) {
  return `${USERINFO_URL}/${id}?starListMax=${starListMax}&repositoriesMax=${repositoriesMax}`;
}
