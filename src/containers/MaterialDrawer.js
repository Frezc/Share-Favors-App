import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LeftNav from 'material-ui/lib/left-nav';
import NavHeader from '../components/NavHeader';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
let SelectableList = SelectableContainerEnhance(List);

import { setNavOpen, showDialog } from '../actions';

function MaterialDrawer(props) {
  const { navOpen, user, dispatch } = props;

  return (
    <LeftNav
      docked={false}
      width={280}
      open={navOpen}
      onRequestChange={open => dispatch(setNavOpen(open))}
      docked={false}
    >
      <NavHeader
        img={'../../design/avatar.gif'}
        name={user.nickname}
        onTouchTap={e => {
        }}
      />
      <Divider />
      <SelectableList
        valueLink={{ value: 0, requestChange: (e, index) => {console.log(index)} }}
      >
        <ListItem
          value={0}
          primaryText="Repositories"
        />
        <ListItem
          value={1}>Menu Item 2</ListItem>
      </SelectableList>
    </LeftNav>
  );
}

MaterialDrawer.propTypes = {
  navOpen: PropTypes.bool.isRequired
};

function select (state) {
  return {
    navOpen: state.view.navOpen,
    user: state.data.users[state.view.loginUser]
  };
}

export default connect(select)(MaterialDrawer);