import Api from '../api';
import { setContentLoading } from './index';

export function fetchUser(id) {
  return (dispatch, getState) => {
    dispatch(setContentLoading());

    // return Api.userInfo(id)
    //   .then(response => {

    //   })
    //   .catch(error => {
        
    //   })
  }
}
