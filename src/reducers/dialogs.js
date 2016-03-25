import { combineReducers } from 'redux';

const DEFAULT_AUTHDIALOG = {
  type: 'auth',
  loading: false,
  show: false,
  error: 'display error happened'
};

const DEFAULT_LINKDIALOG = {
  type: 'watch',
  show: false,
  loading: false,
  link: -1,
  error: 'display error happened'
};

function authDialog(state = DEFAULT_AUTHDIALOG, action) {
  switch (action.type) {

    default:
      return state;
  }
}

function linkDialog(state = DEFAULT_LINKDIALOG, action) {
  switch (action.type) {

    default:
      return state;
  }
}

const dialogs = combineReducers({
  authDialog,
  linkDialog
});

export default dialogs;
