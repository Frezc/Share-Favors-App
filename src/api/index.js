import fetch from 'isomorphic-fetch';
import { 
  AUTH_URL, sendEmailUrl,
  userInfoUrl, REGISTER_URL, refreshTokenUrl,
  userReposUrl, userStarlistUrl
} from './urls';

// some input need to be encode
export function auth(email, password) {
  let data = new FormData();
  data.append('email', email);
  data.append('password', password);

  return fetch(AUTH_URL, {
    method: 'POST',
    mode: 'cors',
    body: data
  });
}

export function sendEmail(email) {
  return fetch(sendEmailUrl(email));
}

export function register(email, password, nickname, code) {
  let data = new FormData();
  data.append('email', email);
  data.append('password', password);
  data.append('nickname', nickname);
  data.append('code', code);

  return fetch(REGISTER_URL, {
    method: 'POST',
    mode: 'cors',
    body: data
  });
}

export function refreshToken(token) {
  return fetch(refreshTokenUrl(token));
}

export function userInfo(id) {
  return fetch(userInfoUrl(id));
}

export function userRepository(id, orderby = 'recent updated', offset = 0, limit = 50, token) {
  return fetch(userReposUrl(id, offset, limit, orderby, token))
}

export function userStarlist(id, offset = 0, limit = 50, token) {
  return fetch(userStarlistUrl(id, offset, limit, token));  
}
