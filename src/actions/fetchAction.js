import * as Api from '../api';
import { setContentStatus } from './index';
import { SHOW_USER_SET, SHOW_USER_ID_SET } from '../constants/actionTypes';
import { replace } from 'react-router-redux';

function fetchUserSuccess(user) {
  return {
    type: SHOW_USER_SET,
    user: user
  }
}

// desperate
function fetchUserLocal(id) {
  return {
    type: SHOW_USER_ID_SET,
    id: id
  };
}

export function fetchUserNetwork(id) {
  return (dispatch) => {
    dispatch(setContentStatus(true));
    return Api.userInfo(id)
      .then(response => {
        // console.log(response)
        if (response.ok) {
          // return new promise
          return response.json().then(json => {
            dispatch(setContentStatus(false));
            dispatch(fetchUserSuccess(json));

            // 让服务端能判断是否请求成功
            return response.status;
          });
        } else {
          if (response.status == 404) {
            dispatch(setContentStatus(false, 'User not found.'));
            dispatch(replace({
              pathname: '/error404',
              state: { type: 'user' }
            }));
          } else if (response.status == 400) {
            dispatch(setContentStatus(false, 'Bad request.'));
            dispatch(replace({
              pathname: '/error400',
              state: { type: 'user' }
            }))
          } else {
            dispatch(setContentStatus(false, 'Unknown error'));
            dispatch(replace({
              pathname: '/error500',
              state: { type: 'user' }
            }))
          }
          
          return response.status;
        }

      })
      .catch(error => {
        dispatch(setContentStatus(false, error.message));
        dispatch(replace({
          pathname: '/error500',
          state: { type: 'user' }
        }));
        return 500;
      });
  }
}

// desperate. Cache will be charge in component.
export function fetchUser(id) {
  return (dispatch, getState) => {

    const { cache } = getState();

    // server need not check state tree
    if (cache[`/user/${id}`]) {
      console.log('fetch local');
      // dispatch(fetchUserLocal(id));
    } else {
      return fetchUserNetwork(id)(dispatch);
    }
  }
}
