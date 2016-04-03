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

  onSearchIconPress = () => {
    this.setState({ showSearch: true });

    // 在searchField未显示时focus函数是无效的，所以这里设置了一个延时等待其出现
    setTimeout(() => {
      this.searchField.focus();
    }, 350);
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
        className="appBar"
        iconElementRight={
          <IconButton onClick={this.onSearchIconPress}>
            <ActionSearch />
          </IconButton>
        }
        onLeftIconButtonTouchTap={() => {
          dispatch(setNavOpen(!navOpen))
        }}
      >
        <div 
          className={this.getSearchClassName(this.state.showSearch)}
        >
          <ActionSearch
            className="searchIcon"
          />
          <TextField
            hintText="Search"
            className="searchInput"
            onBlur={() => { this.setState({ showSearch: false }) }}
            ref={r => this.searchField = r}
            value="123"
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