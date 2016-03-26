import { DIALOG_VISIBLE_CHANGE, DIALOG_CONTENT_CHANGE, DIALOG_LOADING_CHANGE } from '../constants/actionTypes';

export function setDialogVisible (dialog, visible = true) {
  return {
    type: DIALOG_VISIBLE_CHANGE,
    dialog: dialog,
    visible: visible
  }
}

export function setDialogContent (dialog, content) {
  return {
    type: DIALOG_CONTENT_CHANGE,
    dialog: dialog,
    content: content
  }
}

export function setDialogLoading (dialog, loading = true) {
  return {
    type: DIALOG_LOADING_CHANGE,
    dialog: dialog,
    loading: loading
  }
}
