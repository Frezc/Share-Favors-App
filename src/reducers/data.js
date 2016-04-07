import { combineReducers } from 'redux';
import { AUTH_SUCCESS } from '../constants/actionTypes';
import { defaultUser, defaultRepo } from '../constants/defaultStates';
import { SHOW_USER_SET } from '../constants/actionTypes';

function generateUser(user) {
  let newUser = Object.assign({}, user);
  console.log(user)
  newUser.repositories = user.repositories.map(repoWithRecent => {
    return repoWithRecent.repository.id;
  });
  newUser.starlist = user.starlist.map(repoWithRecent => {
    return repoWithRecent.repository.id;
  });
  return newUser;
}

function generateReposFromUser(user) {
  let starRepos = decodeRepoWithRecent(user.starlist);
  let repos = decodeRepoWithRecent(user.repositories);
  return Object.assign({}, starRepos, repos);
}

// [{ repository: {}, recentItems: [] }] => { [repoId]: {} }
function decodeRepoWithRecent(repoWithRecentList) {
  let repoList = {};
  repoWithRecentList.map(repoWithRecent => {
    let newRepo = Object.assign({}, repoWithRecent.repository);
    
    newRepo.recentItems = repoWithRecent.recentItems.map(recentItem => {
      if (recentItem.type == 1) {
        return Object.assign({
          type: 'link',
          created_at: recentItem.created_at,
          updated_at: recentItem.updated_at
        }, recentItem.link);
      } else {
        repoList[recentItem.repository.id] = recentItem.repository;
        return {
          type: 'repo',
          created_at: recentItem.created_at,
          updated_at: recentItem.updated_at,
          id: recentItem.repository.id
        }
      }
    });

    repoList[newRepo.id] = newRepo;
  });
  return repoList;
}

function users(state = { '-1': defaultUser }, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        [action.auth.user.id]: generateUser(action.auth.user)
      });
    case SHOW_USER_SET:
      return Object.assign({}, state, {
        [action.user.id]: generateUser(action.user)
      });
  }
  return state;
}

function repositories(state = { '-1': defaultRepo }, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return Object.assign({}, state, generateReposFromUser(action.auth.user));
    case SHOW_USER_SET:
      return Object.assign({}, state, generateReposFromUser(action.user));
  }
  return state;
}

const data = combineReducers({
  users,
  repositories
});

export default data;
