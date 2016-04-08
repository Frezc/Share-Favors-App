import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { setDialogContent, setDialogVisible } from '../actions/dialog';
import { DIALOG } from '../constants';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    marginBottom: 30
  }
};

function NeedAuth(props) {
  const { dispatch } = props;

  return (
    <div
      style={styles.root}
    >
      <span
        style={styles.text}
      >You need to auth before.</span>
      <RaisedButton
        label="Login"
        primary
        onTouchTap={() => {
          dispatch(setDialogVisible(DIALOG.AUTH));
          dispatch(setDialogContent(DIALOG.AUTH, 'auth'));
        }}
      />
    </div>
  );
}


export default NeedAuth;
