import { combineReducers } from 'redux';
import { 
  DIALOG_VISIBLE_CHANGE, DIALOG_CONTENT_CHANGE, DIALOG_LOADING_CHANGE, 
  AUTH_DENIED, AUTH_SUCCESS 
} from '../constants/actionTypes';
import { DIALOG } from '../constants';

const DEFAULT_AUTHDIALOG = {
  type: 'auth',
  loading: false,
  visible: false,
  error: ''
};

const DEFAULT_LINKDIALOG = {
  type: 'watch',
  visible: false,
  loading: false,
  link: -1,
  error: ''
};

function authDialog(state = DEFAULT_AUTHDIALOG, action) {
  if (!action.dialog || action.dialog === DIALOG.AUTH) {
    switch (action.type) {
      case DIALOG_VISIBLE_CHANGE:
        return Object.assign({}, state, {
          visible: action.visible
        });
      case DIALOG_CONTENT_CHANGE:
        return Object.assign({}, state, {
          type: action.content,
          error: ''
        });
      case DIALOG_LOADING_CHANGE:
        return Object.assign({}, state, {
          loading: action.loading,
          error: ''
        });
      case AUTH_SUCCESS:
        return Object.assign({}, state, {
          visible: false,
          loading: false,
          error: ''
        });
      case AUTH_DENIED:
        return Object.assign({}, state, {
          loading: false,
          error: action.error
        });
    }
  }
  return state;
}

function linkDialog(state = DEFAULT_LINKDIALOG, action) {
  if (!action.dialog || action.dialog === DIALOG.LINK) {
    switch (action.type) {
      case DIALOG_VISIBLE_CHANGE:
        return Object.assign({}, state, {
          visible: action.visible
        });
      case DIALOG_CONTENT_CHANGE:
        return Object.assign({}, state, {
          type: action.content
        });
      case DIALOG_LOADING_CHANGE:
        return Object.assign({}, state, {
          loading: action.loading
        });
    }
  }
  return state;
}

const dialogs = combineReducers({
  authDialog,
  linkDialog
});

export default dialogs;
