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
import { hideSnackbar } from '../actions';

//App Entry
class App extends React.Component {

  componentWillMount() {
    const { dispatch } = this.props;

    // dispatch(fetchUser(3));
    console.log('app will mount')
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

App.propTypes = {
  authDialog: PropTypes.shape({
    type: PropTypes.oneOf(['auth', 'register']).isRequired,
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
}

function select (state) {
  return {
    authDialog: state.view.dialogs.authDialog,
    snackbar: state.view.snackbar,
    sendEmail: state.view.sendEmail,
    content: state.view.content
  }
}

export default connect(select)(App);
