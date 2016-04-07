import { combineReducers } from 'redux';
import { AUTH_SUCCESS } from "../constants/actionTypes";
import { AUTH_DENIED } from "../constants/actionTypes";
import { LOGOUT } from "../constants/actionTypes";
import { saveItem, removeItem } from '../helpers'

function user(state = -1, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const userId = action.auth.user.id;
      saveItem('userId', userId);
      return userId;
    case AUTH_DENIED:
    case LOGOUT:
      removeItem('userId');
      return -1;
  }

  return state;
}

function token(state = '', action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const token = action.auth.token;
      saveItem('token', token);
      return token;
    case AUTH_DENIED:
    case LOGOUT:
      removeItem('token');
      return '';
  }

  return state;
}

function expired_at(state = 0, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const expired_at = action.auth.expired_at;
      saveItem('expired_at', expired_at);
      return expired_at;
    case AUTH_DENIED:
    case LOGOUT:
      removeItem('expired_at');
      return 0;
  }

  return state;
}

const auth = combineReducers({
  user,
  token,
  expired_at
});

export default auth;
