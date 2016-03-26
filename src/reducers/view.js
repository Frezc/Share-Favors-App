import { combineReducers } from 'redux';
import { NAV_OPEN, AUTH_SUCCESS, AUTH_DENIED } from '../constants/actionTypes';
import dialogs from './dialogs';

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

    default:
      return state;
  }
}

const DEFAULT_AUTH = {
  user: -1,
  token: '',
  expired_at: null
};

function auth(state = DEFAULT_AUTH, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return action.auth;
    case AUTH_DENIED:
      return DEFAULT_AUTH;
  }
  return state;
}

const view = combineReducers({
  navOpen,
  dialogs,
  showUser,
  auth
});

export default view;
