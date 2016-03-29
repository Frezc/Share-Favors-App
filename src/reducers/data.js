import { combineReducers } from 'redux';
import { AUTH_SUCCESS } from '../constants/actionTypes';
import { defaultUser, defaultRepo } from '../constants/defaultStates';
import { SHOW_USER_SET } from '../constants/actionTypes';


// todo: 构建正确的reducer

function generateUser(user) {
  let newUser = Object.assign({}, user);
  newUser.repositories = user.repositories.map(repo => {
    return repo.id;
  });
  newUser.starlist = user.starlist.map(repo => {
    return repo.id;
  });
  return newUser;
}

function generateReposFromUser(user) {
  let newRepos = {};
  user.repositories.map(repo => {
    let newRepo = Object.assign({}, repo);
    newRepo.tags = repo.tags.map(tag => {
      return tag.id;
    });
    newRepo.recentItems = repo.recentItems.map(recentItem => {
      
    });
  });
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

    default:
      return state;
  }
}

const data = combineReducers({
  users,
  repositories
});

export default data;
