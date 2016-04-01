import * as Api from '../api';
import { setContentStatus } from './index';
import { SHOW_USER_SET } from '../constants/actionTypes';

function fetchUserSuccess(user) {
  return {
    type: SHOW_USER_SET,
    user: user
  }
}

export function fetchUserNetwork(id) {
  return (dispatch) => {
    return Api.userInfo(id)
      .then(response => {
        // console.log(response)
        if (response.ok) {
          // return new promise
          return response.json().then(json => {
            // setTimeout(() => {
              dispatch(setContentStatus(false));
              dispatch(fetchUserSuccess(json));
            // }, 4000)

          });
        } else {
          if (response.status == 404) {
            dispatch(setContentStatus(false, 'User not found.'));
          } else if (response.status == 400) {
            dispatch(setContentStatus(false, 'Bad request.'));
          } else {
            dispatch(setContentStatus(false, 'Unknown error'));
          }
        }

      })
      .catch(error => {
        dispatch(setContentStatus(false, error.message));
      });
  }
}

export function fetchUser(id) {
  return (dispatch, getState) => {

    const { data } = getState();

    // server need not check state tree
    if (data.users[id]) {
      console.log('fetch local')
      dispatch(fetchUserSuccess(data.users[id]));
    } else {
      dispatch(setContentStatus(true));
      return fetchUserNetwork(id)(dispatch);
    }
  }
}
