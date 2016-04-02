import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { setNavOpen } from '../actions';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import ActionSearch from 'material-ui/lib/svg-icons/action/search';
import ContentClear from 'material-ui/lib/svg-icons/content/clear';
import TextField from 'material-ui/lib/text-field';

class MaterialAppBar extends React.Component {

  static propTypes = {
    navOpen: PropTypes.bool.isRequired
  };

  state = {
    showSearch: false
  };

  getSearchClassName (showSearch) {
    if (showSearch) {
      return 'searchContainer card show';
    } else {
      return 'searchContainer card hidden';
    }
  }


  render () {
    const { navOpen, dispatch } = this.props;


    return (
      <AppBar
        style={{ position: 'fixed', top: 0 }}
        title="Title"
        iconElementRight={
          <IconButton onClick={() => { 
            this.setState({ showSearch: true });
          }}>
            <ActionSearch />
          </IconButton>
        }
        onLeftIconButtonTouchTap={() => {
          dispatch(setNavOpen(!navOpen))
        }}
      >
        <div 
          className={this.getSearchClassName(this.state.showSearch)}
          onBlur={() => { this.setState({ showSearch: false }) }}
        >
          <ActionSearch
            className="searchIcon" />
          <TextField
            hintText="Search"
            className="searchInput"
          />
          <ContentClear
            className="clearIcon"
            onClick={() => {
              this.setState({ showSearch: false })
            }}
          />
        </div>
      </AppBar>
    );
  }
}

function select (state) {
  return {
    navOpen: state.view.navOpen
  };
}


export default connect(select)(MaterialAppBar);