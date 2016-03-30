import {
  combineReducers
}
from 'redux';
import {
  NAV_OPEN, AUTH_SUCCESS, AUTH_DENIED, LOGOUT, SNACKBAR_SHOWMSG,
  SENDEMAIL_CHANGE, DIALOG_ERROR_CHANGE
}
from '../constants/actionTypes';
import {
  DEFAULT_AUTH, DEFAULT_SNACKBAR, DEFAULT_SENDEMAIL, DEFAULT_CONTENT
}
from '../constants/defaultStates';
import dialogs from './dialogs';
import content from './content';

function navOpen(state = false, action) {
  switch (action.type) {
    case NAV_OPEN:
      return action.open;
    default:
      return state;
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

const view = combineReducers({
  navOpen,
  dialogs,
  auth,
  snackbar,
  sendEmail,
  content
});

export default view;
