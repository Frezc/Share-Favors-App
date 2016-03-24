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

// actions
import { TYPE_USER } from '../constants/actionTypes';
import { showDialog, setDialogContent } from '../actions';

//App Entry
class App extends React.Component {

  renderUserDetailDialog() {
    const { dispatch, dialog, showUserData } = this.props;

    const dialogActions = [
      <FlatButton
        label="Repositories"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => {}}
      />,
      <FlatButton
        label="Star List"
        secondary={true}
        onTouchTap={() => {}}
      />,
    ];

    return (
      <Dialog
        title={showUserData.nickname}
        actions={dialogActions}
        open={dialog.show}
        modal={false}
        onRequestClose={() => dispatch(showDialog(false))}
      >
        This is User profile
      </Dialog>
    );
  }

  render() {
    const { dispatch, dialog, showUserData } = this.props;

    return (
    	<div className="page">
        <MaterialDrawer />
        <div className="content">
          <MaterialAppBar />

          <div className="mainContainer">
            
            <RepositoryDetail />
          </div>
        </div>

        
    	</div>
    );
  }
}

App.propTypes = {
  dialog: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    contentType: PropTypes.oneOf([TYPE_USER]).isRequired
  }).isRequired,
  showUserData: PropTypes.object.isRequired
}

function select (state) {
  return {
    dialog: state.dialog,
    showUserData: state.showUserData
  }
}

export default connect(select)(App);