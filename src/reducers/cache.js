import { AUTH_SUCCESS, SHOW_USER_SET } from '../constants/actionTypes';

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
  }

  return state;
}

export default cache;
