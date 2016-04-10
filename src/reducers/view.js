import { combineReducers } from 'redux';
import {
  NAV_OPEN, AUTH_SUCCESS, AUTH_DENIED, LOGOUT, SNACKBAR_SHOWMSG,
  SENDEMAIL_CHANGE, WINDOW_MODE_CHANGE
}
from '../constants/actionTypes';
import {
  DEFAULT_AUTH, DEFAULT_SNACKBAR, DEFAULT_SENDEMAIL, DEFAULT_CONTENT
}
from '../constants/defaultStates';
import dialogs from './dialogs';
import content from './content';
import auth from './auth';
import componentStatus from './componentStatus';

function navOpen(state = false, action) {
  switch (action.type) {
    case NAV_OPEN:
      return action.open;
  }
  return state;
}

function windowMode(state = 'normal', action) {
  switch (action.type) {
    case WINDOW_MODE_CHANGE:
      return action.mode;
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
  windowMode,
  dialogs,
  auth,
  snackbar,
  sendEmail,
  content,
  componentStatus
});

export default view;
