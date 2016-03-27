import { combineReducers } from 'redux';
import { AUTH_SUCCESS } from '../constants/actionTypes';
import { defaultUser, defaultRepo, defaultLink, defaultTag } from '../constants/defaultStates';

function users(state = { '-1': defaultUser }, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        [action.auth.user.id]: action.auth.user
      });
  }
  return state;
}

function repositories(state = { '-1': defaultRepo }, action) {
  switch (action.type) {

    default:
      return state;
  }
}

function links(state = { '-1': defaultLink }, action) {
  switch (action.type) {

    default:
      return state;
  }
}

function tags(state = { '-1': defaultTag }, action) {
  switch (action.type) {

    default:
      return state;
  }
}

const data = combineReducers({
  users,
  repositories,
  links,
  tags
});

export default data;
