import { NAV_OPEN, SNACKBAR_SHOWMSG } from '../constants/actionTypes';

/** action creator **/
export function setNavOpen (open) {
  return {
    type: NAV_OPEN,
    open: open
  };
}

export function showSnackbar (msg = '') {
  return {
    type: SNACKBAR_SHOWMSG,
    visible: true,
    message: msg
  };
}

export function hideSnackbar () {
  return {
    type: SNACKBAR_SHOWMSG,
    visible: false,
    message: ''
  }
}
