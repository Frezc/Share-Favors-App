import { AUTH_URL } from '../constants/network';
import { AUTH_SUCCESS, AUTH_DENIED } from '../constants/actionTypes';

import { setDialogLoading } from './dialog';
import { DIALOG } from '../constants';

import fetch from 'isomorphic-fetch';


function successAuth(auth) {
  return {
    type: AUTH_SUCCESS,
    auth: auth
  }
}

function failAuth(error) {
  return {
    type: AUTH_DENIED,
    error: error
  }
}

export function auth(email, password) {
  return dispatch => {
    dispatch(setDialogLoading(DIALOG.AUTH, true));

    return fetch(AUTH_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `email=${email}&password=${password}`
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          dispatch(failAuth('Email or Password wrong'));
        }
      })
      .then(json => {
        if (json) {
          dispatch(successAuth(json));
        }
      })
      .catch(error => {
        dispatch(failAuth(error.message));
      });
  }
}
