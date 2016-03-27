import fetch from 'isomorphic-fetch';
import { AUTH_URL, SENDEMAIL_URL } from './constants';

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
    return fetch(`${SENDEMAIL_URL}?email=${email}`);
  }
};