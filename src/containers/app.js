import React, { PropTypes } from 'react';

//import your containers
import MaterialDrawer from './MaterialDrawer';
import MaterialAppBar from './MaterialAppBar';

// from libs
import Snackbar from 'material-ui/lib/snackbar';
import { connect } from 'react-redux';

// custom components
import AuthDialog from '../components/AuthDialog';
import ContentMask from '../components/ContentMask';

// actions
import { hideSnackbar, changeWindowMode } from '../actions';

import { WINDOW_BOUNDARY } from '../constants';

const authDialogType = ['auth', 'register'];
const windowModes = ['normal', 'widescreen'];

//App Entry
class App extends React.Component {
  
  static propTypes = {
    authDialog: PropTypes.shape({
      type: PropTypes.oneOf(authDialogType).isRequired,
      visible: PropTypes.bool.isRequired,
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired
    }).isRequired,
    snackbar: PropTypes.shape({
      visible: PropTypes.bool.isRequired,
      message: PropTypes.string.isRequired
    }).isRequired,
    sendEmail: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired
  };

  // 自适应浏览器宽度
  onResize = () => {
    const { windowMode, dispatch } = this.props;
    
    let width = document.documentElement.clientWidth;
    let mode;
    if (width < WINDOW_BOUNDARY) {
      mode = windowModes[0];
    } else {
      mode = windowModes[1];
    }

    if (mode != windowMode) {
      dispatch(changeWindowMode(mode));
    }
  };

  componentWillMount() {
    const { dispatch } = this.props;

    // dispatch(fetchUser(3));
    // console.log('app will mount')
  }

  componentDidMount() {
    // first resize. to fit server render
    this.onResize();
    window && window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window && window.addEventListener('resize', this.onResize);
  }

  render() {
    const { dispatch, authDialog, snackbar, sendEmail, content } = this.props;

    return (
    	<div className="page">
        <MaterialDrawer />
        <div className="content">
          <MaterialAppBar />
          <div className="mainContainer">
            <ContentMask
              content={content}
            />
            { this.props.children }
          </div>
        </div>
        <AuthDialog
          type={authDialog.type}
          visible={authDialog.visible}
          loading={authDialog.loading}
          error={authDialog.error}
          dispatch={dispatch}
          sendEmail={sendEmail}
        />
        <Snackbar
          message={snackbar.message}
          open={snackbar.visible}
          onRequestClose={() => {
            dispatch(hideSnackbar());
          }}
          autoHideDuration={4000}
          action="GOT IT"
          onActionTouchTap={() => {
            dispatch(hideSnackbar());
          }}
        />
    	</div>
    );
  }
}

function select (state) {
  return {
    authDialog: state.view.dialogs.authDialog,
    snackbar: state.view.snackbar,
    sendEmail: state.view.sendEmail,
    content: state.view.content,
    windowMode: state.view.windowMode
  }
}

export default connect(select)(App);
