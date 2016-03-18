import React, { PropTypes } from 'react';

import { setNavOpen } from '../actions';

//import your components
import MaterialDrawer from './MaterialDrawer';
import MaterialAppBar from './MaterialAppBar';
import RepositoriesExplorer from './RepositoriesExplorer';


//App Entry
class App extends React.Component {
  render () {

    return (
    	<div>
        <MaterialDrawer />
        <div className="content">
          <MaterialAppBar />

          <div className="mainContainer">
            <RepositoriesExplorer />
          </div>
        </div>
    	</div>
    );
  }
}


export default App;