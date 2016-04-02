import React, { PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import CircularProgress from 'material-ui/lib/circular-progress';

// actions
import { setDialogVisible, setDialogContent } from '../actions/dialog';
import { auth, getCodeByEmail, setSendEmail, register } from '../actions/authActions';

// constants
import { DIALOG } from '../constants';

class AuthDialog extends React.Component {
  
  static propTypes = {
    type: PropTypes.oneOf(types),
    loading: PropTypes.bool,
    visible: PropTypes.bool,
    error: PropTypes.string,
    dispatch: PropTypes.func,
    sendEmail: PropTypes.shape({
      canSendEmail: PropTypes.bool.isRequired,
      sendEmailCounting: PropTypes.bool.isRequired
    }).isRequired
  };
  
  static defaultProps = {
    type: 'auth',
    loading: false,
    visible: false,
    error: ''
  };

  state = {

    authEmailError: '',
    authPasswordError: '',
    emailError: '',
    nicknameError: '',
    passwordError: '',
    comfirmPasswordError: '',
    codeError: '',

    count: 1
  };

  isCounting = false;

  input = {
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
        if (value === this.input.register.password) {
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
    if (this.validate('email', this.input.auth.email) 
      && this.validate('password', this.input.auth.password)) {
      return true;
    }

    return false;
  }

  validateRegister() {
    if (this.validate('email', this.input.register.email) 
      && this.validate('password', this.input.register.password)
      && this.validate('nickname', this.input.register.nickname)
      && this.validate('comfirmPassword', this.input.register.comfirmPassword)
      && this.validate('code', this.input.register.code)) {
      return true;
    }
    console.log('validateRegister fail')
    return false;
  }

  getDialogTitle () {
    const { type } = this.props;

    if (type === types[1]) {
      return 'Create User';
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
            onTouchTap={() => this.onRegisterPress()}
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

  startCounter() {
    const { dispatch } = this.props;
    console.log('startCounter')

    this.isCounting = true;

    this.setState({ count: 60 });
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setState({ count: this.state.count - 1 })
      if (this.state.count <= 1) {
        clearInterval(this.timer);
        dispatch(setSendEmail());
        this.isCounting = false;
      }
    }, 1000);
  }

  onLoginPress() {
    const { dispatch } = this.props;

    // 验证输入是否合法
    if (this.validateAuth()) {
      dispatch(auth(this.input.auth.email, this.input.auth.password));
    }
  }

  onRegisterPress() {
    const { dispatch } = this.props;

    if (this.validateRegister()) {
      dispatch(register(
        this.input.register.email, 
        this.input.register.password,
        this.input.register.nickname,
        this.input.register.code));
    }
  }

  onGetCodePress() {
    if (this.validate('email', this.input.register.email)) {
      const { dispatch } = this.props;
      dispatch(getCodeByEmail(this.input.register.email));
      dispatch(setSendEmail(false));
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

  componentWillReceiveProps(props) {
    if (!this.isCounting && props.sendEmail.sendEmailCounting) {
      this.startCounter();
    }
  }

  renderAuth() {
    return (
      <div className="authDialog centerContent">
        <TextField
          floatingLabelText="Email"
          errorText={this.state.authEmailError}
          fullWidth
          onChange={e => {
            this.input.auth.email = e.currentTarget.value;
            if (this.validate('email', this.input.auth.email)) {
              this.setState({ authEmailError: '' });
            } else {
              this.setState({ authEmailError: 'invalid email address' });
            }
          }}
          value={this.input.auth.email}
        />
        <TextField 
          floatingLabelText="Password"
          type="password"
          errorText={this.state.authPasswordError}
          fullWidth
          onChange={e => {
            this.input.auth.password = e.currentTarget.value;
            if (this.validate('password', this.input.auth.password)) {
              this.setState({ authPasswordError: '' });
            } else {
              this.setState({ authPasswordError: 'please input property password' });
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
          value={this.input.register.email}
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
          label={!this.props.sendEmail.sendEmailCounting ? "Get Code" : this.state.count}
          primary={true}
          disabled={!this.props.sendEmail.canSendEmail}
          style={Object.assign({}, styles.getcodeButton, {
            top: this.state.emailError == '' ? 170 : 190
          })}
          onTouchTap={e => this.onGetCodePress()}
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
