import React, { PropTypes } from 'react';

//import your components
import MaterialDrawer from './MaterialDrawer';
import MaterialAppBar from './MaterialAppBar';
import RepositoriesExplorer from './RepositoriesExplorer';
import RepositoryDetail from './RepositoryDetail';

//App Entry
class App extends React.Component {
  render () {

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


export default App;