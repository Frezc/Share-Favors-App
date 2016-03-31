import * as Api from '../api';
import {
  AUTH_SUCCESS, AUTH_DENIED, LOGOUT, SENDEMAIL_CHANGE
}
from '../constants/actionTypes';

import {
  setDialogLoading, setDialogError, setDialogVisible
}
from './dialog';
import {
  showSnackbar
}
from './index';
import {
  DIALOG
}
from '../constants';

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
          response.json().then(json => {
            dispatch(successAuth(json));
            dispatch(setDialogVisible(DIALOG.AUTH, false));
          });
        } else {
          dispatch(setDialogError(DIALOG.AUTH, 'Email or password invalid.'));
        }
      })
      .catch(error => {
        dispatch(setDialogError(DIALOG.AUTH, error.message));
      });
  }
}

export function register(email, password, nickname, code) {
  return dispatch => {
    dispatch(setDialogLoading(DIALOG.AUTH, true));
    return Api.register(email, password, nickname, code)
      .then(response => {
        if (response.ok) {
          response.json().then(json => dispatch(successAuth(json)))
        } else {
          dispatch(setDialogError(DIALOG.AUTH, 'register failed.'));
        }
      })
      .catch(error => {
        dispatch(setDialogError(DIALOG.AUTH, error.message));
      });
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

export function setSendEmail(canSend = true, counting = false) {
  return {
    type: SENDEMAIL_CHANGE,
    canSend: canSend,
    counting: counting
  };
}

export function getCodeByEmail(email) {
  return dispatch => {
    return Api.sendEmail(email)
      .then(response => {
        if (response.ok) {
          dispatch(showSnackbar(`Email has been sent to ${email}.`));
          dispatch(setSendEmail(false, true));
        } else {
          dispatch(setDialogError(DIALOG.auth, 'bad request'));
          dispatch(setSendEmail());
        }
      })
      .catch(error => {
        dispatch(setDialogError(DIALOG.auth, error.message));
        dispatch(setSendEmail());
      })
  }
}