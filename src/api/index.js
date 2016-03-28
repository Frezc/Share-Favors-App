import fetch from 'isomorphic-fetch';
import { 
  AUTH_URL, SENDEMAIL_URL, sendEmailUrl,
  userInfoUrl
} from './urls';

export default {
  auth(email, password) {
    return fetch(AUTH_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `email=${email}&password=${password}`
    });
  },
  
  sendEmail(email) {
    return fetch(sendEmailUrl(email));
  },

  register(email, password, nickname, code) {
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('nickname', nickname);
    data.append('code', code);

    return fetch(REGISTER_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    });
  },

  userInfo(id) {
    return fetch(userInfoUrl(id));
  },

  userRepository(id) {
    
  }
};