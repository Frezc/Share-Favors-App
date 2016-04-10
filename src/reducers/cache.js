import {
  AUTH_SUCCESS, SHOW_USER_SET, FETCH_USER_REPOS_SUCCESS
} from '../constants/actionTypes';

function cache(state = {}, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        [`/user/${action.auth.user.id}`]: action.auth.user
      });
    case SHOW_USER_SET:
      return Object.assign({}, state, {
        [`/user/${action.user.id}`]: action.user
      });
    case FETCH_USER_REPOS_SUCCESS:
      return Object.assign({}, state, {
        [`/user/${action.attr.userId}/repositories?filter=${action.attr.orderby}`]: {
          // todo
        }
      });
  }

  return state;
}

export default cache;
