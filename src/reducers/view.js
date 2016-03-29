import {
  combineReducers
}
from 'redux';
import {
  NAV_OPEN, AUTH_SUCCESS, AUTH_DENIED, LOGOUT, SNACKBAR_SHOWMSG,
  SENDEMAIL_CHANGE, DIALOG_ERROR_CHANGE, CONTENT_STATUS
}
from '../constants/actionTypes';
import dialogs from './dialogs';
import {
  DEFAULT_AUTH, DEFAULT_SNACKBAR, DEFAULT_SENDEMAIL, DEFAULT_CONTENT
}
from '../constants/defaultStates';
import { SHOW_USER_SET } from '../constants/actionTypes';

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
    case SHOW_USER_SET:
      return action.user.id;
  }
  
  return state;
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

function sendEmail(state = DEFAULT_SENDEMAIL, action) {
  switch (action.type) {
    case SENDEMAIL_CHANGE:
      return {
        canSendEmail: action.canSend,
        sendEmailCounting: action.counting
      };
  }

  return state;
}

function content(state = DEFAULT_CONTENT, action) {
  switch (action.type) {
    case CONTENT_STATUS:
      return {
        loading: action.loading,
        error: action.error
      }
  }

  return state;
}

const view = combineReducers({
  navOpen,
  dialogs,
  showUser,
  auth,
  snackbar,
  sendEmail,
  content
});

export default view;