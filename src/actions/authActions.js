import Api from '../api';
import { AUTH_SUCCESS, AUTH_DENIED, LOGOUT, SENDEMAIL_COUNTING } from '../constants/actionTypes';

import { setDialogLoading } from './dialog';
import { showSnackbar } from './index';
import { DIALOG } from '../constants';

import fetch from 'isomorphic-fetch';


function successAuth(auth) {
  return dispatch => {
    dispatch({
      type: AUTH_SUCCESS,
      auth: auth
    });
    dispatch(showSnackbar(`Welcome ${auth.user.nickname}`));
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
    return Api.auth(email, password)
      .then(response => {
        if (response.ok) {
          response.json().then(json => dispatch(successAuth(json)));
        } else {
          response.json().then(json => dispatch(failAuth(json.error)));
        }
      })
      .catch(error => {
        dispatch(failAuth(error.message));
      });
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

export function setEmailCount(counting = true) {
  return {
    type: SENDEMAIL_COUNTING,
    counting: counting
  };
}

export function getCodeByEmail(email) {
  return dispatch => {
    return Api.sendEmail(email)
      .then(response => {
        if (response.ok) {
          dispatch(showSnackbar(`Email has been sent to ${email}.`));
          dispatch(setEmailCount());
        } else {
          response.json().then(json => dispatch(failAuth(json.error)));
        }
      })
      .catch(error => {
        dispatch(failAuth(error.message));
      })
  }
}
