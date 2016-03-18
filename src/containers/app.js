import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

//import your action creators
import { setNavOpen } from '../actions';

//import your components
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

//App Entry
class App extends React.Component {
  render () {
  	const { navOpen, dispatch } = this.props;

    return (
    	<div>
	    	<AppBar
          title="Title"
          onLeftIconButtonTouchTap={() => {dispatch(setNavOpen(!navOpen))}}
        />
        <LeftNav
          docked={false}
          width={280}
          open={navOpen}
          onRequestChange={open => dispatch(setNavOpen(open))}
        >
          
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </LeftNav>
    	</div>
    );
  }
}

App.propTypes = {
	navOpen: PropTypes.bool.isRequired
};

function select (state) {
	return {
		navOpen: state.navOpen
	};
}

export default connect(select)(App);