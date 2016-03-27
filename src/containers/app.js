import React, { PropTypes } from 'react';

//import your components
import MaterialDrawer from './MaterialDrawer';
import MaterialAppBar from './MaterialAppBar';
import RepositoriesExplorer from './RepositoriesExplorer';
import RepositoryDetail from './RepositoryDetail';
import UserDetail from './UserDetail';

// from libs
import Dialog from 'material-ui/lib/dialog';
import Snackbar from 'material-ui/lib/snackbar';
import { connect } from 'react-redux';

// custom components
import AuthDialog from '../components/AuthDialog';

// actions
import { hideSnackbar } from '../actions';

//App Entry
class App extends React.Component {

  render() {
    const { dispatch, authDialog, snackbar } = this.props;

    return (
    	<div className="page">
        <MaterialDrawer />
        <div className="content">
          <MaterialAppBar />
          <div className="mainContainer">
            <RepositoryDetail />
          </div>
        </div>
        <AuthDialog
          type={authDialog.type}
          visible={authDialog.visible}
          loading={authDialog.loading}
          error={authDialog.error}
          dispatch={dispatch}
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
  }).isRequired
}

function select (state) {
  return {
    authDialog: state.view.dialogs.authDialog,
    snackbar: state.view.snackbar
  }
}

export default connect(select)(App);