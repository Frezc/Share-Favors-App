import * as Api from '../api';
import { setContentStatus, setComponentStatus } from './index';
import { 
  SHOW_USER_SET, SHOW_USER_ID_SET, FETCH_USER_REPOS_SUCCESS,
  FETCH_USER_STARS_SUCCESS
} from '../constants/actionTypes';
import { COMPONENT } from '../constants';
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

/**
 * handle the error response
 * @param response
 * @return status
 */
function handleError(response, dispatch, state) {
  switch (response.status) {
    case 404:
      dispatch(replace({
        pathname: '/error404',
        state: state
      }));
      break;
    case 400:
      dispatch(replace({
        pathname: '/error400',
        state: state
      }));
      break;
    case 500:
      dispatch(replace({
        pathname: '/error500',
        state: state
      }));
      break;
    default:
      dispatch(replace({
        pathname: '/error',
        state: state
      }));
  }
  
  return response.status;
}

export function fetchUserNetwork(id) {
  return (dispatch) => {
    dispatch(setComponentStatus(COMPONENT.userDetail));
    return Api.userInfo(id)
      .then(response => {
        // console.log(response)
        if (response.ok) {
          // return new promise
          return response.json().then(json => {
            dispatch(setComponentStatus(COMPONENT.userDetail, ''));
            dispatch(fetchUserSuccess(json));

            // 让服务端能判断是否请求成功
            return response.status;
          });
        } else {
          // if (response.status == 404) {
          //   // dispatch(setContentStatus(false, 'User not found.'));
          //   dispatch(replace({
          //     pathname: '/error404',
          //     state: { type: 'user' }
          //   }));
          // } else if (response.status == 400) {
          //   // dispatch(setContentStatus(false, 'Bad request.'));
          //   dispatch(replace({
          //     pathname: '/error400',
          //     state: { type: 'user' }
          //   }))
          // } else {
          //   // dispatch(setContentStatus(false, 'Unknown error'));
          //   dispatch(replace({
          //     pathname: '/error500',
          //     state: { type: 'user' }
          //   }))
          // }

          dispatch(setComponentStatus(COMPONENT.userDetail, ''));
          return handleError(response, dispatch, { type: 'user' });
        }

      })
      .catch(error => {
        dispatch(setComponentStatus(COMPONENT.userDetail, ''));
        dispatch(replace({
          pathname: '/error',
          state: { type: 'user' }
        }));
        return 'error';
      });
  }
}

// deprecated. Cache will be charge in component.
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

export function fetchUserReposSuccess(attr, json) {
  return {
    type: FETCH_USER_REPOS_SUCCESS,
    attr: attr,
    data: json
  };
}

export function fetchUserRepos(id, orderby = 'recent updated', page = 0, token) {
  // console.log('fetchUserRepos: token', token)
  return (dispatch) => {
    const comp = !token ? COMPONENT.userRepos : COMPONENT.selfRepos;
    dispatch(setComponentStatus(comp, 'loading'));
    return Api.userRepository(id, orderby, page * 50, token)
      .then(response => {
        if (response.ok) {
          return response.json().then(json => {
            dispatch(fetchUserReposSuccess({
              userId: id,
              orderby: orderby,
              page: page
            }, json));
            dispatch(setComponentStatus(comp, ''));
            return response.status;
          });
        } else {
          dispatch(setComponentStatus(comp, ''));
          return handleError(response, dispatch, { type: 'repository' });
        }
      })
      .catch(error => {
        dispatch(setComponentStatus(comp, ''));
        dispatch(replace({
          pathname: '/error',
          state: { type: 'repository' }
        }));
        return 'error';
      })
  }
}

export function fetchUserStarsSuccess(attr, json) {
  return {
    type: FETCH_USER_STARS_SUCCESS,
    attr: attr,
    data: json
  }
}

export function fetchUserStars(id, page = 0, token) {
  return dispatch => {
    const comp = !token ? COMPONENT.userStars : COMPONENT.selfStars;
    dispatch(setComponentStatus(comp, 'loading'));
    return Api.userStarlist(id, page * 50, token)
      .then(response => {
        if (response.ok) {
          return response.json().then(json => {
            dispatch(fetchUserStarsSuccess({
              userId: id,
              page: page
            }, json));
            dispatch(setComponentStatus(comp, ''));
            return response.status;
          });
        } else {
          dispatch(setComponentStatus(comp, ''));
          return handleError(response, dispatch, { type: 'repository' });
        }
      })
      .catch(error => {
        dispatch(setComponentStatus(comp, ''));
        dispatch(replace({
          pathname: '/error',
          state: { type: 'repository' }
        }));
        return 'error';
      })
  }
}
