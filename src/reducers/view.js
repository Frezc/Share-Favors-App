import { combineReducers } from 'redux';
import { NAV_OPEN } from '../constants/actionTypes';
import dialogs from './dialogs';

function navOpen(state = false, action) {
  switch (action.type) {
    case NAV_OPEN:
      return action.open;
    default:
      return state;
  }
}

function showUser(state = 'default', action) {
  switch (action.type) {

    default:
      return state;
  }
}

function loginUser(state = 'default', action) {
  switch (action.type) {

    default:
      return state;
  }
}

const view = combineReducers({
  navOpen,
  dialogs,
  showUser,
  loginUser
});

export default view;
