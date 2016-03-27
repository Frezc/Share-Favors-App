import {
  combineReducers
}
from 'redux';
import {
  NAV_OPEN, AUTH_SUCCESS, AUTH_DENIED, LOGOUT, SNACKBAR_SHOWMSG,
  SENDEMAIL_COUNTING
}
from '../constants/actionTypes';
import dialogs from './dialogs';
import {
  DEFAULT_AUTH, DEFAULT_SNACKBAR
}
from '../constants/defaultStates';

function navOpen(state = false, action) {
  switch (action.type) {
    case NAV_OPEN:
      return action.open;
    default:
      return state;
  }
}

function showUser(state = -1, action) {
  switch (action.type) {

    default: return state;
  }
}

function auth(state = DEFAULT_AUTH, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        user: action.auth.user.id,
        token: action.auth.token,
        expired_at: action.auth.expired_at
      };
    case AUTH_DENIED:
    case LOGOUT:
      return DEFAULT_AUTH;
  }
  return state;
}

function snackbar(state = DEFAULT_SNACKBAR, action) {
  switch (action.type) {
    case SNACKBAR_SHOWMSG:
      return {
        visible: action.visible,
        message: action.message
      }
  }

  return state;
}

function sendEmailCounting(state = false, action) {
  switch (action.type) {
    case SENDEMAIL_COUNTING:
      return action.counting;
  }

  return state;
}

const view = combineReducers({
  navOpen,
  dialogs,
  showUser,
  auth,
  snackbar,
  sendEmailCounting
});

export default view;