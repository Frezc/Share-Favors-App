import Api from '../api';
import { setContentStatus } from './index';
import { SHOW_USER_SET } from '../constants/actionTypes';

function fetchUserSuccess(user) {
  return {
    type: SHOW_USER_SET,
    user: user
  }
}

export function fetchUser(id) {
  return (dispatch, getState) => {
    dispatch(setContentStatus(true));

    const { data } = getState();

    if (data.users[id]) {
      dispatch(setContentStatus(false));
      dispatch(fetchUserSuccess(id));
    } else {
      return Api.userInfo(id)
        .then(response => {
          console.log(response)
          if (response.ok) {
            response.json().then(json => {
              dispatch(setContentStatus(false));
              dispatch(fetchUserSuccess(json));
            });
          } else if (response.status == 404) {
            dispatch(setContentStatus(false, 'User not found.'));
          } else if (response.status == 400) {
            dispatch(setContentStatus(false, 'Bad request.'));
          } else {
            dispatch(setContentStatus(false, 'Unknown error'));
          }
        })
        .catch(error => {
          dispatch(setContentStatus(false, error.message));
        });
    }
  }
}
