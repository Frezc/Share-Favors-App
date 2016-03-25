import React, { PropTypes } from 'react';

//import your components
import MaterialDrawer from './MaterialDrawer';
import MaterialAppBar from './MaterialAppBar';
import RepositoriesExplorer from './RepositoriesExplorer';
import RepositoryDetail from './RepositoryDetail';
import UserDetail from './UserDetail';

// from libs
import Dialog from 'material-ui/lib/dialog';
import { connect } from 'react-redux';

// custom components
import AuthDialog from '../components/AuthDialog';

// actions
import { TYPE_USER } from '../constants/actionTypes';
import { showDialog, setDialogContent } from '../actions';

//App Entry
class App extends React.Component {

  render() {
    const { dispatch, authDialog } = this.props;

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
          show={authDialog.show}
          loading={authDialog.loading}
          error={authDialog.error}
        />
    	</div>
    );
  }
}

App.propTypes = {
  authDialog: PropTypes.shape({
    type: PropTypes.oneOf(['auth', 'register']).isRequired,
    show: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired
  }).isRequired
}

function select (state) {
  return {
    authDialog: state.view.dialogs.authDialog,
  }
}

export default connect(select)(App);