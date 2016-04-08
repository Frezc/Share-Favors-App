import {
  combineReducers
}
from 'redux';
import { SHOW_USER_SET, SHOW_USER_ID_SET, CONTENT_STATUS } from '../constants/actionTypes';

function showUser(state = -1, action) {
  switch (action.type) {
    case SHOW_USER_SET:
      return action.user.id;
    case SHOW_USER_ID_SET:
      return action.id;
  }
  
  return state;
}

function loading(state = false, action) {
  switch (action.type) {
    case CONTENT_STATUS:
      return action.loading;
  }

  return state;
}

function error(state = '', action) {
  switch (action.type) {
    case CONTENT_STATUS:
      return action.error;
  }

  return state;
}

const content = combineReducers({
  loading,
  error,
  showUser
});

export default content;
