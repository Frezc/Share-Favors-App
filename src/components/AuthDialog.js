import React, { PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import CircularProgress from 'material-ui/lib/circular-progress';

// actions
import { setDialogVisible, setDialogContent } from '../actions/dialog';
import { auth } from '../actions/fetchActions';

// constants
import { DIALOG } from '../constants';

class AuthDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      emailError: '',
      nicknameError: '',
      passwordError: '',
      comfirmPasswordError: '',
      codeError: ''
    };

    this.input = {
      auth: {
        email: '',
        password: ''
      },
      register: {
        email: '',
        nickname: '',
        password: '',
        comfirmPassword: '',
        code: ''
      }
    };
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
      case 'comfirmPassword':
        if (value === this.input.password) {
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

  validateAuth() {
    console.log(this.input)
    if (this.validate('email', this.input.auth.email) 
      && this.validate('password', this.input.auth.password)) {
      return true;
    }

    return false;
  }

  getDialogTitle () {
    const { type } = this.props;

    if (type === types[1]) {
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
          onTouchTap={() => this.onClose()}
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
            onTouchTap={() => this.onLoginPress()}
          />,
          <FlatButton
            label="To Resiger"
            secondary={true}
            onTouchTap={() => this.onChangeType(types[1])}
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
            label="To Login"
            secondary={true}
            onTouchTap={() => this.onChangeType(types[0])}
          />
        ];
    }

    return [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={onClose}
      />
    ];
  }

  onLoginPress() {
    const { dispatch } = this.props;

    // 验证输入是否合法
    if (this.validateAuth()) {
      dispatch(auth(this.input.auth.email, this.input.auth.password));
    }
  }

  onClose() {
    const { dispatch } = this.props;

    dispatch(setDialogVisible(DIALOG.AUTH, false));
  }

  onChangeType(type) {
    const { dispatch } = this.props;

    dispatch(setDialogContent(DIALOG.AUTH, type));
  }

  renderAuth() {
    return (
      <div className="authDialog centerContent">
        <TextField
          floatingLabelText="Email"
          errorText={this.state.emailError}
          fullWidth
          onChange={e => {
            this.input.auth.email = e.currentTarget.value;
            if (this.validate('email', this.input.auth.email)) {
              this.setState({ emailError: '' });
            } else {
              this.setState({ emailError: 'invalid email address' });
            }
          }}
          value={this.input.auth.email}
        />
        <TextField 
          floatingLabelText="Password"
          type="password"
          errorText={this.state.passwordError}
          fullWidth
          onChange={e => {
            this.input.auth.password = e.currentTarget.value;
            if (this.validate('password', this.input.auth.password)) {
              this.setState({ passwordError: '' });
            } else {
              this.setState({ passwordError: 'please input property password' });
            }
          }}
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
            this.input.register.email = e.currentTarget.value;
            if (this.validate('email', this.input.register.email)) {
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
            this.input.register.code = e.currentTarget.value.slice(0, 6);
            if (this.validate('code', this.input.register.code)) {
              this.setState({ codeError: '' });
            } else {
              this.setState({ codeError: 'length must be 6' });
            }
          }}
          value={this.input.register.code}
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
            this.input.register.nickname = e.currentTarget.value;
            if (this.validate('nickname', this.input.register.nickname)) {
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
            this.input.register.password = e.currentTarget.value;
            if (this.validate('password', this.input.register.password)) {
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
            this.input.register.comfirmPassword = e.currentTarget.value;
            if (this.validate('comfirmPassword', this.input.register.comfirmPassword)) {
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

    const { error, visible } = this.props;
      
    return (
      <Dialog
        title={this.getDialogTitle()}
        actions={this.getActions()}
        open={visible}
        modal={false}
        onRequestClose={() => this.onClose()}
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

const types = ['auth', 'register'];

AuthDialog.propTypes = {
  type: PropTypes.oneOf(types),
  loading: PropTypes.bool,
  visible: PropTypes.bool,
  error: PropTypes.string,
  dispatch: PropTypes.func
};

AuthDialog.defaultProps = {
  type: 'auth',
  loading: false,
  visible: false,
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
