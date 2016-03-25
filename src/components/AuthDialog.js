import React, { PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

class AuthDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      emailError: '',
      nicknameError: '',
      passwordError: '',
      comfirmPasswordError: ''
    }
  }

  // 
  validate(type, value) {
    switch(type) {
      case 'email':
        const emailReg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailReg.test(value);
      case 'nickname':
        if (value.length >= 1 && value.length <= 16) {
          return true;
        }
        break;
      case 'password':
        if (value.length >= 6 && value.length <= 60) {
          return true;
        }
        break;
    }

    return false;
  }

  renderAuth() {
    return (
      <div className="authDialog centerContent">
        <TextField
          floatingLabelText="Email"
          errorText={this.state.emailError}
        />
        <TextField 
          floatingLabelText="Password"
          errorText={this.state.passwordError}
        />
      </div>
    );
  }

  renderRegister() {
    return (
      <div className="registerDialog">
        <TextField 
          floatingLabelText="Email"
          errorText={this.state.emailError}
          onChange={e => {
            if (this.validate('email', e.currentTarget.value)) {
              this.setState({ emailError: '' });
            } else {
              this.setState({ emailError: 'invalid email address' });
            }
          }}
        />

        <br />
        <TextField 
          floatingLabelText="Nick Name"
          errorText={this.state.nicknameError}
          onChange={e => {
            if (this.validate('nickname', e.currentTarget.value)) {
              this.setState({ nicknameError: '' });
            } else {
              this.setState({ nicknameError: 'length of nickname should between 1 ~ 16' });
            }
          }}
        />
        <br />
        <TextField 
          floatingLabelText="Password"
          errorText={this.state.passwordError}
          ref="passwordField"
          type="password"
          onChange={e => {
            if (this.validate('password', e.currentTarget.value)) {
              this.setState({ passwordError: '' });
            } else {
              this.setState({ passwordError: 'length of password should between 6 ~ 60' });
            }
          }}
        />
        <br />
        <TextField 
          floatingLabelText="Comfirm Password"
          errorText={this.state.comfirmPasswordError}
          type="password"
          onChange={e => {
            console.log('password', this.refs.passwordField)
            console.log('comfirm', e.currentTarget.value)
            if (this.passwordField.value === e.currentTarget.value) {
              this.setState({ comfirmPasswordError: '' });
            } else {
              this.setState({ comfirmPasswordError: 'twice password should be same' });
            }
          }}
        />
        <br />
      </div>
    );
  }

  render() {
    const dialogActions = [
      <FlatButton
        label="Login"
        primary={true}
        onTouchTap={() => {}}
      />,
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={() => {}}
      />
    ];
      
    return (
      <Dialog
        title="Login"
        actions={dialogActions}
        open={true}
        modal={false}
        onRequestClose={() => {}}
        contentStyle={styles.authDialog}
      >
        {this.renderAuth()}
      </Dialog>
    );
  }
}

const styles = {
  authDialog: {
    width: 342
  }
}

export default AuthDialog;
