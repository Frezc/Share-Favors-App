import { NAV_OPEN, SNACKBAR_SHOWMSG, CONTENT_STATUS, WINDOW_MODE_CHANGE } from '../constants/actionTypes';

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

export function setContentStatus (loading = true, error = '') {
  return {
    type: CONTENT_STATUS,
    loading: loading,
    error: error
  }
}

export function changeWindowMode(mode = 'normal') {
  return {
    type: WINDOW_MODE_CHANGE,
    mode: mode
  }
}
