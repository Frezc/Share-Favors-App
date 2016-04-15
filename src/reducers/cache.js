import {
  AUTH_SUCCESS, SHOW_USER_SET, FETCH_USER_REPOS_SUCCESS,
  FETCH_USER_STARS_SUCCESS
} from '../constants/actionTypes';

function reduceRepos(state, key, page, data) {
  const cache = state[key];
  let repoList;
  if (cache) {
    repoList = Object.assign({}, cache.repoList, {
      [page]: data.repoList
    });
  } else {
    repoList = {
      [page]: data.repoList
    };
  }
  return Object.assign({}, state, {
    [key]: {
      repoNumAll: data.repoNumAll,
      showAll: data.showAll,
      repoList: repoList
    }
  });
}

function cache(state = {}, action) {
  let key;
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
      key = `/user/${action.attr.userId}/repositories?filter=${action.attr.orderby.toLowerCase()}`;
      return reduceRepos(state, key, action.attr.page, action.data);
    case FETCH_USER_STARS_SUCCESS:
      key = `/user/${action.attr.userId}/stars`;
      return reduceRepos(state, key, action.attr.page, action.data);
  }

  return state;
}

export default cache;
