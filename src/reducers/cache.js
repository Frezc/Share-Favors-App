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
      const key = `/user/${action.attr.userId}/repositories?filter=${action.attr.orderby.toLowerCase()}`;
      let cache = state[key];
      let repoList;
      if (cache) {
        repoList = Object.assign({}, cache.repoList, {
          [action.attr.page]: action.data.repoList
        });
      } else {
        repoList = {
          [action.attr.page]: action.data.repoList
        };
      }
      return Object.assign({}, state, {
        [key]: Object.assign({}, cache, {
          repoNumAll: action.data.repoNumAll,
          showAll: action.data.showAll,
          repoList: repoList
        })
      });
  }

  return state;
}

export default cache;
