import React, { PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import CircularProgress from 'material-ui/lib/circular-progress';

class AuthDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      emailError: '',
      nicknameError: '',
      passwordError: '',
      comfirmPasswordError: '',
      codeError: ''
    }

    this.input = {
      email: '',
      nickname: '',
      password: '',
      comfirmPassword: '',
      code: ''
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
      case 'code':
        if (value.length == 6) {
          return true;
        }
        break;
    }

    return false;
  }

  getDialogTitle () {
    const { type } = this.props;

    if (type == 'register') {
      return 'Create a new User';
    } else {
      return 'Login';
    }
  }

  getActions () {
    const { type, loading } = this.props;

    if (loading) {
      return [
        <FlatButton
          label="Cancel"
          secondary={true}
          onTouchTap={() => {}}
        />
      ];
    }

    switch(type) {
      case 'auth':
        return [
          <FlatButton
            label="Login"
            primary={true}
            keyboardFocused={true}
            onTouchTap={() => {}}
          />,
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={() => {}}
          />
        ];
      case 'register':
        return [
          <FlatButton
            label="Ok"
            primary={true}
            onTouchTap={() => {}}
          />,
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={() => {}}
          />
        ];
    }

    return [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={() => {}}
      />
    ];
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
          type="password"
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
          fullWidth
          onChange={e => {
            this.input.email = e.currentTarget.value;
            if (this.validate('email', this.input.email)) {
              this.setState({ emailError: '' });
            } else {
              this.setState({ emailError: 'invalid email address' });
            }
          }}
        />
        <TextField
          floatingLabelText="Code"
          errorText={this.state.codeError}
          fullWidth
          style={styles.codeTextField}
          onChange={e => {
            this.input.code = e.currentTarget.value.slice(0, 6);
            if (this.validate('code', this.input.code)) {
              this.setState({ codeError: '' });
            } else {
              this.setState({ codeError: 'length must be 6' })
            }
          }}
          value={this.input.code}
        />
        <RaisedButton 
          label="Get Code" 
          primary={true}
          style={styles.getcodeButton}
        />
        <TextField 
          floatingLabelText="Nick Name"
          errorText={this.state.nicknameError}
          fullWidth
          onChange={e => {
            this.input.nickname = e.currentTarget.value;
            if (this.validate('nickname', this.input.nickname)) {
              this.setState({ nicknameError: '' });
            } else {
              this.setState({ nicknameError: 'length of nickname should between 1 ~ 16' });
            }
          }}
        />
        <TextField 
          floatingLabelText="Password"
          errorText={this.state.passwordError}
          type="password"
          fullWidth
          onChange={e => {
            this.input.password = e.currentTarget.value;
            if (this.validate('password', this.input.password)) {
              this.setState({ passwordError: '' });
            } else {
              this.setState({ passwordError: 'length of password should between 6 ~ 60' });
            }
          }}
        />
        <TextField 
          floatingLabelText="Comfirm Password"
          errorText={this.state.comfirmPasswordError}
          type="password"
          fullWidth
          onChange={e => {
            this.input.comfirmPassword = e.currentTarget.value;
            if (this.input.password === this.input.comfirmPassword) {
              this.setState({ comfirmPasswordError: '' });
            } else {
              this.setState({ comfirmPasswordError: 'twice password should be same' });
            }
          }}
        />
      </div>
    );
  }

  renderContent () {
    const { type, loading } = this.props;

    if (loading) {
      return (
        <CircularProgress />
      );
    } else if (type === 'register') {
      return this.renderRegister();
    } else {
      return this.renderAuth();
    }
  }

  render() {

    const { error, show } = this.props;
      
    return (
      <Dialog
        title={"Login"}
        actions={this.getActions()}
        open={show}
        modal={false}
        onRequestClose={() => {}}
        contentStyle={styles.authDialog}
        bodyClassName="centerContent"
      >
        {this.renderContent()}
        {error != '' &&
          <div className="errorText">!! {error}</div>
        }
      </Dialog>
    );
  }
}

AuthDialog.propTypes = {
  type: PropTypes.oneOf(['auth', 'register']),
  loading: PropTypes.bool,
  show: PropTypes.bool,
  error: PropTypes.string
};

AuthDialog.defaultProps = {
  type: 'auth',
  loading: false,
  show: false,
  error: ''
};

const styles = {
  authDialog: {
    width: 342
  },
  codeTextField: {
    width: 180
  },
  getcodeButton: { 
    position: 'absolute',
    left: 220,
    top: 170
  }
}

export default AuthDialog;
