import { NAV_OPEN, DIALOG_SHOW, DIALOG_SET_CONTENT } from '../constants/actionTypes';

/** action creator **/
export function setNavOpen (open) {
  return {
    type: NAV_OPEN,
    open: open
  }
}

export function showDialog (show, loading = false) {
  return {
    type: DIALOG_SHOW,
    show: show,
    loading: loading
  }
}

export function setDialogContent (contentType, data) {
  return {
    type: DIALOG_SET_CONTENT,
    contentType: contentType,
    data: data
  }
}
